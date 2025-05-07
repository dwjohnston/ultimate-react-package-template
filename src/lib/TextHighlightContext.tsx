"use client"
import React, { PropsWithChildren, ReactNode, RefObject, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { createPortal } from "react-dom";

export type TextHighlightProviderProps = {

}


type CommentProps = PropsWithChildren<{
    id: string;
    hasHover: boolean;
    setSelectedStatus: (isSelected: boolean) => void;
    setHoverStatus: (hasHover: boolean) => void;
    ref: RefObject<HTMLDivElement | null>;
}>

type HighlightProps = PropsWithChildren<{
    commentId: string;
    isSelected: boolean;
    hasHover: boolean;
    setSelectedStatus: (isSelected: boolean) => void;
    setHoverStatus: (hasHover: boolean) => void;
    ref: RefObject<HTMLSpanElement | null>;
}>

type TextHighlightContext = {
    registerHighlight: (element: HTMLSpanElement, comment: HTMLDivElement) => void;
    gutterRef: RefObject<HTMLElement | null>;
    requestRecalculatePositions: () => void;

    Comment: (props: CommentProps) => React.ReactNode;
    Highlight: (props: HighlightProps) => React.ReactNode;
}
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
    Highlight: DefaultHighlight
});


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
            setTimeout(() => {

                setSelectedStatus(true);
            }, 10)
        }}

    >
        {props.children}
    </span>
}

function DefaultComment(props: CommentProps) {



    return <div
        data-testid="rth-comment"
        className={`text-highlight-comment${props.hasHover ? ' text-highlight-hover' : ''}`}
        ref={props.ref}
        onMouseEnter={(() => props.setHoverStatus(true))}
        onMouseLeave={(() => props.setHoverStatus(false))}
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
            recalculatePositions(highlightedElementsRef.current);
        }

        const resizeObserver = new ResizeObserver(onResize);
        ([containerRef.current, gutterRef.current]).forEach((v) => {
            console.log('attach ')
            resizeObserver.observe(v);
        })


        return () => {
            resizeObserver.disconnect();
        }

    }, [])

    const gutterRef = useRef<HTMLDivElement>(null);

    const registerHighlight = (element: HTMLSpanElement, commentEl: HTMLDivElement) => {
        highlightedElementsRef.current.set(element, commentEl);
        recalculatePositions(highlightedElementsRef.current);
    }


    return <div className="text-highlight-provider-outer">

        <div className="text-highlight-left-gutter"></div>

        <div className="text-highlight-content-container" ref={containerRef}>
            <TextHighlightContext.Provider value={{ registerHighlight, gutterRef, Comment: DefaultComment, Highlight: DefaultHighlight, requestRecalculatePositions: recalculatePositionsRef.current }}>
                {props.children}
            </TextHighlightContext.Provider>

        </div>
        <div className="text-highlight-right-gutter" ref={gutterRef}>

        </div>

    </div>
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



    return <>


        <Highlight
            isSelected={isSelected}
            hasHover={hasHover}
            ref={spanRef}
            commentId={id}
            setHoverStatus={setHasHover}
            setSelectedStatus={setIsSelected}
        >{props.children}</Highlight>


        {highlightContext.gutterRef.current &&
            createPortal(
                <ClickAwayListener onClickAway={() => {
                    if (isSelected) {
                        setIsSelected(false)
                    }
                }}>

                    <div className={`text-highlight-comment-outer${isSelected ? ' text-highlight-selected' : ''}${isReady ? '' : 'not-ready'}`}>
                        <button onClick={() => setIsSelected(false)}>Close </button>


                        <Comment id={id} setHoverStatus={setHasHover} hasHover={hasHover} ref={commentRef} setSelectedStatus={setIsSelected}>
                            {props.commentContent}
                        </Comment>

                    </div>
                </ClickAwayListener>
                ,
                highlightContext.gutterRef.current
            )}
    </>
}