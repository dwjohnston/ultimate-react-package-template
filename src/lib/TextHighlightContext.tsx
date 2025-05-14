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
    Comment: (props: CommentProps) => React.ReactNode;
    Highlight: (props: HighlightProps) => React.ReactNode;
}

export type TextHighlightProviderProps = PropsWithChildren<{
    Comment?: TextHighlightContext['Comment'];
    Highlight?: TextHighlightContext['Highlight'];
    gutterRef: RefObject<HTMLElement | null>;
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

    Comment: DefaultComment,
    Highlight: DefaultHighlight,
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
        className={`text-highlight-comment${props.hasHover ? ' text-highlight-hover' : ''}${props.isSelected ? ' text-highlight-selected' : ''}`}
        ref={props.ref}
        onMouseEnter={(() => props.setHoverStatus(true))}
        onMouseLeave={(() => props.setHoverStatus(false))}
        onClick={() => props.setSelectedStatus(true)}
        id={props.id}>
        <button
            className="rth-close-button"
            onClick={() => {
                props.setSelectedStatus(false);
            }}>
            Close
        </button>
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


    // Accumulated offset is how far down the page we already are
    // ie. if you were to position the element without any padding on top, the top of it would be here
    let accumulatedOffset = 0;
    entriesArray.forEach(([span, comment]) => {

        const spanOffset = span.offsetTop;
        const spanHeight = span.offsetHeight;
        const commentHeight = comment.offsetHeight;



        if (comment.parentElement) {
            // The required basis sets the flex-basis of the containing element. 
            // Remember the the flex-basis already accounts for the height of the content
            // And that the content sits at the _bottom_ of the container

            // Where the top of the comment should be
            const requiredYPosition = spanOffset + (spanHeight / 2) - (commentHeight / 2);
            // How much offset is needed to get the comment to right position, accounting for the accumulated offset
            const requiredOffset = requiredYPosition - accumulatedOffset;
            // Basis should never be negative
            const requiredBasis = Math.max(requiredOffset + commentHeight, 0);

            comment.parentElement.style.flexBasis = `${requiredBasis}px`;
            accumulatedOffset += (Math.max(requiredBasis, commentHeight));

        }

    });
}

export function TextHighlightProvider(props: PropsWithChildren<TextHighlightProviderProps>) {

    const { gutterRef, Comment = DefaultComment, Highlight = DefaultHighlight } = props;


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
        <TextHighlightContext.Provider value={{ registerHighlight, gutterRef, Comment, Highlight, requestRecalculatePositions: recalculatePositionsRef.current }}>
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

    const { Comment, Highlight } = highlightContext;

    useEffect(() => {
        setIsReady(true);

        if (spanRef.current && commentRef.current) {
            highlightContext.registerHighlight(spanRef.current, commentRef.current)
        }
    }, [isReady]);


    const comment = <Comment
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
                            // visibility: isMobile ? 'hidden' : 'visible',
                        }}>
                            {comment}


                        </div>



                    </ClickAwayListener >
                </>

                ,
                highlightContext.gutterRef.current
            )
        }
    </>
}