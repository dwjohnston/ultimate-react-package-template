"use client"
import React, { PropsWithChildren, ReactNode, RefObject, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";



export type CommentProps = PropsWithChildren<{
    /**
     * Attach this to the `id` attribute of your main element. 
     * 
     * This for a11y purposes so the highlight can be linked with the comment.
     */
    id: string;
    hasHover: boolean;

    isSelected: boolean;
    /**
     * Attach this to click handlers for your component
     * @param hasHover 
     * @returns 
     */
    setSelectedStatus: (isSelected: boolean) => void;
    /**
     * Attach this to onMouseEnter and onMouseLeave event handlers
     * @param hasHover 
     * @returns 
     */
    setHoverStatus: (hasHover: boolean) => void;

    /**
     * This ref needs to be attached to the main element 
     * 
     */
    ref: RefObject<HTMLDivElement | null>;

    /**
     * You might want to display you content differently when the content is in a mobile toast
     * If need be, this prop can be used to determine that
     */
    isInMobileToast: boolean;
}>

export type HighlightProps = PropsWithChildren<{
    /**
     * Attach this to the `id` attribute of your main element. 
     * 
     * This for a11y purposes so the highlight can be linked with the comment.
     */
    commentId: string;
    isSelected: boolean;
    hasHover: boolean;
    setSelectedStatus: (isSelected: boolean) => void;
    /**
     * Attach this to onMouseEnter and onMouseLeave event handlers
     * @param hasHover 
     * @returns 
     */
    setHoverStatus: (hasHover: boolean) => void;

    /**
     * This ref needs to be attached to the main element 
     * 
     */
    ref: RefObject<HTMLSpanElement | null>;
}>


export type MobileToastProps = PropsWithChildren<{
    onClose: () => void;
}>;

type TextHighlightContext = {
    registerHighlight: (element: HTMLSpanElement, comment: HTMLDivElement) => void;
    requestRecalculatePositions: () => void;

    gutterRef: RefObject<HTMLElement | null>;
    toastContainerRef: RefObject<HTMLElement | null>;
    Comment: (props: CommentProps) => React.ReactNode;
    Highlight: (props: HighlightProps) => React.ReactNode;
    MobileToast: (props: MobileToastProps) => React.ReactNode;
    mediaQuery: Parameters<typeof useMediaQuery>[0]['query'];
}

export type TextHighlightProviderProps = PropsWithChildren<{
    Comment?: TextHighlightContext['Comment'];
    Highlight?: TextHighlightContext['Highlight'];
    MobileToast?: TextHighlightContext['MobileToast'];
    gutterRef: RefObject<HTMLElement | null>;
    toastContainerRef: RefObject<HTMLElement | null>;
    mediaQuery?: TextHighlightContext['mediaQuery'];
}>;


const DEFAULT_MEDIA_QUERY = '(max-width: 600px)';
const TextHighlightContext = React.createContext<TextHighlightContext>({
    registerHighlight: () => {
        throw new Error("registerHighlight not implemented");
    },
    requestRecalculatePositions: () => {
        throw new Error("requestRecalculatePositions not implemented")
    },


    gutterRef: {
        current: null
    },
    toastContainerRef: {
        current: null
    },
    Comment: DefaultComment,
    Highlight: DefaultHighlight,
    MobileToast: DefaultMobileToast,
    mediaQuery: DEFAULT_MEDIA_QUERY
});


function DefaultMobileToast(props: MobileToastProps) {
    return <div className="text-highlight-mobile-toast">
        <button onClick={props.onClose}>
            Close
        </button>
        <div className="text-highlight-mobile-toast-content">
            {props.children}
        </div>
    </div>
}

function DefaultHighlight(props: HighlightProps) {

    const { hasHover, isSelected, ref, setHoverStatus, setSelectedStatus, commentId } = props;


    return <span
        data-testid="rth-highlight"
        className={`text-highlight${hasHover ? ' text-highlight-hover' : ''}${isSelected ? ' text-highlight-selected' : ''}`}
        ref={ref}
        aria-describedby={commentId}
        onMouseEnter={(() => setHoverStatus(true))}
        onMouseLeave={(() => setHoverStatus(false))}
        onClick={() => {
            setSelectedStatus(true);

        }}

    >
        {props.children}
    </span>
}

function DefaultComment(props: CommentProps) {



    return <div
        data-testid="rth-comment"
        className={`text-highlight-comment${props.hasHover ? ' text-highlight-hover' : ''}${props.isSelected ? ' text-highlight-selected' : ''}${props.isInMobileToast ? ' is-in-mobile-toast' : ''}`}
        ref={props.ref}
        onMouseEnter={(() => props.setHoverStatus(true))}
        onMouseLeave={(() => props.setHoverStatus(false))}
        onClick={() => props.setSelectedStatus(true)}
        id={props.id}>
        {props.children}
    </div>
}

function recalculatePositions(mapOfSpansAndComments: Map<HTMLSpanElement, HTMLDivElement>) {
    const entries = mapOfSpansAndComments.entries();



    // Sort the highlights so they go top to bottom, left to right
    // Possibly not needed?
    const entriesArray = Array.from(entries).toSorted((a, b) => {
        const [spanA,] = a;
        const [spanB,] = b;

        if (spanA.offsetTop < spanB.offsetTop) {
            return -1;
        }
        if (spanA.offsetTop > spanB.offsetTop) {
            return 1;
        }
        if (spanA.offsetLeft < spanB.offsetLeft) {
            return -1;
        }

        return 1;

    });

    let accumulatedOffset = 0;
    entriesArray.forEach(([span, comment]) => {

        const spanOffset = span.offsetTop;
        const commentHeight = comment.clientHeight;

        if (comment.parentElement) {
            const actualOffset = spanOffset + (commentHeight / 2) - accumulatedOffset;
            comment.parentElement.style.flexBasis = `${actualOffset}px`;


            accumulatedOffset += actualOffset;

        }

    });
}

export function TextHighlightProvider(props: PropsWithChildren<TextHighlightProviderProps>) {

    const { gutterRef, toastContainerRef, Comment = DefaultComment, Highlight = DefaultHighlight, MobileToast = DefaultMobileToast, mediaQuery = DEFAULT_MEDIA_QUERY } = props;


    const highlightedElementsRef = useRef<Map<HTMLSpanElement, HTMLDivElement>>(new Map());

    const containerRef = useRef<HTMLDivElement>(null);


    // I hate this
    // But I need some way of triggering a rerender 
    // So I can do a conditional render based on the gutterRef being available
    const [isReady, setIsReady] = useState(false);


    const recalculatePositionsRef = useRef(() => {
        recalculatePositions(highlightedElementsRef.current);
    })


    useEffect(() => {
        setIsReady(true);

        if (!containerRef.current || !gutterRef.current) {
            return;
        }




        const onResize = () => {
            console.log("Resizing");
            recalculatePositions(highlightedElementsRef.current);
        }

        const resizeObserver = new ResizeObserver(onResize);
        ([containerRef.current, gutterRef.current]).forEach((v) => {
            resizeObserver.observe(v);
        })


        return () => {
            resizeObserver.disconnect();
        }

    }, [])

    const registerHighlight = (element: HTMLSpanElement, commentEl: HTMLDivElement) => {
        highlightedElementsRef.current.set(element, commentEl);
        recalculatePositions(highlightedElementsRef.current);
    }


    return <div className="text-highlight-content-container" ref={containerRef}>
        <TextHighlightContext.Provider value={{ toastContainerRef, registerHighlight, gutterRef, Comment, Highlight, MobileToast, requestRecalculatePositions: recalculatePositionsRef.current, mediaQuery }}>
            {props.children}
        </TextHighlightContext.Provider>

    </div>


}


export function useTextHighlight() {
    const highlightContext = useContext(TextHighlightContext);
    return highlightContext;
}


export type TextHighlightProps = {
    commentContent?: React.ReactNode;
}
export function TextHighlight(props: PropsWithChildren<TextHighlightProps>) {

    const spanRef = useRef<HTMLSpanElement>(null);
    const commentRef = useRef<HTMLDivElement>(null);

    const highlightContext = useContext(TextHighlightContext);

    const [hasHover, setHasHover] = React.useState(false);
    const [isSelected, setIsSelected] = React.useState(false);
    const id = useId();

    const [isReady, setIsReady] = useState(false);

    const { Comment, Highlight, MobileToast } = highlightContext;

    const isMobile = useMediaQuery({
        query: highlightContext.mediaQuery
    })



    useEffect(() => {
        setIsReady(true);

        if (spanRef.current && commentRef.current) {
            highlightContext.registerHighlight(spanRef.current, commentRef.current)
        }
    }, [isReady]);


    const comment = <Comment
        isInMobileToast={isMobile}
        isSelected={isSelected}
        id={id}
        setHoverStatus={setHasHover}
        hasHover={hasHover}
        ref={commentRef}
        setSelectedStatus={(value) => {
            setTimeout(() => {
                setIsSelected(value)
            }, 10)
        }}>
        {props.commentContent}
    </Comment>;


    return <>


        <Highlight
            isSelected={isSelected}
            hasHover={hasHover}
            ref={spanRef}
            commentId={id}
            setHoverStatus={setHasHover}
            setSelectedStatus={(value) => {
                setTimeout(() => {
                    setIsSelected(value)
                }, 10)
            }}

        >{props.children}</Highlight >


        {
            highlightContext.gutterRef.current &&
            createPortal(

                <>
                    <ClickAwayListener onClickAway={() => {
                        if (isSelected) {
                            setIsSelected(false)
                        }
                    }}>
                        <div data-testid="rth-flexing-child" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "flex-end",
                            visibility: isMobile ? 'hidden' : 'visible',
                        }}>
                            {comment}


                        </div>



                    </ClickAwayListener >
                </>

                ,
                highlightContext.gutterRef.current
            )
        }
        {
            isMobile && isSelected && highlightContext.toastContainerRef.current &&
            createPortal(
                <ClickAwayListener onClickAway={() => {
                    if (isSelected) {
                        setIsSelected(false)
                    }
                }}>
                    < MobileToast onClose={() => {
                        setIsSelected(false);
                    }
                    }>
                        {comment}
                    </MobileToast >
                </ClickAwayListener>
                ,
                highlightContext.toastContainerRef.current
            )
        }
    </>
}