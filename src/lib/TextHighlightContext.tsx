"use client"
import React, { PropsWithChildren, RefObject, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { createPortal } from "react-dom";

export type TextHighlightProviderProps = {
    /**
     * A list of elements to observe for purposes of recalculating the the comment positioning. 
     * 
     * If not provided, this will be main div that all the content sits in.
     */
    resizeObserverEls?: Array<HTMLElement>;
}


type TextHighlightContext = {
    registerHighlight: (element: HTMLSpanElement, comment: HTMLDivElement) => void;
    gutterRef: RefObject<HTMLElement |null>;
}
const TextHighlightContext = React.createContext<TextHighlightContext>({
    registerHighlight: () => {
        throw new Error("registerHighlight not implemented");
    },
    gutterRef: {
        current:null
    }
});

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


    useEffect(() => {
        setIsReady(true);

        if (!containerRef.current) {
            return;
        }




        const onResize = () => {
            recalculatePositions(highlightedElementsRef.current);
        }

        const resizeObserver = new ResizeObserver(onResize);
        (props.resizeObserverEls ?? [containerRef.current]).forEach((v) => {
            resizeObserver.observe(v);
        })


        return () => {
            resizeObserver.disconnect();
        }

    }, [])

    const gutterRef = useRef<HTMLDivElement>(null);

    const registerHighlight = (element: HTMLSpanElement, commentEl: HTMLDivElement) => {
        highlightedElementsRef.current.set(element, commentEl);
    }


    return <div className="text-highlight-provider-outer">

        <div className="text-highlight-left-gutter"></div>

        <div className="text-highlight-content-container" ref={containerRef}>
            <TextHighlightContext.Provider value={{ registerHighlight, gutterRef }}>
                {props.children}
            </TextHighlightContext.Provider>
            
        </div>        <div className="text-highlight-right-gutter" ref={gutterRef}>

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

    useEffect(() => {
        setIsReady(true);

        if (spanRef.current && commentRef.current) {

            highlightContext.registerHighlight(spanRef.current, commentRef.current)
        }



    }, []);



    return <><span className={`text-highlight${hasHover ? ' text-highlight-hover' : ''}`} ref={spanRef}
        aria-describedby={id}
        onMouseEnter={(() => setHasHover(true))}
        onMouseLeave={(() => setHasHover(false))}
        onClick={() => {
            setTimeout(() => {

                setIsSelected(true);
            }, 10)
        }}

    >
        {props.children}
    </span>


{highlightContext.gutterRef.current &&
        createPortal(
            <ClickAwayListener onClickAway={() => {
                if (isSelected) {
                    setIsSelected(false)
                }
            }}>

                <div className={`text-highlight-comment-outer${isSelected ? ' text-highlight-selected' : ''}`}>
                    <button onClick={() => setIsSelected(false)}>close </button>

                    <div className={`text-highlight-comment${hasHover ? ' text-highlight-hover' : ''}`} ref={commentRef}
                        onMouseEnter={(() => setHasHover(true))}
                        onMouseLeave={(() => setHasHover(false))}
                        id={id}>
                        {props.commentContent}
                    </div>
                </div>
            </ClickAwayListener>
            ,
            highlightContext.gutterRef.current
        )}
    </>
}