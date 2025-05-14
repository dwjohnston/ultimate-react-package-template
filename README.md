# react-text-highlight

Storybook here: https://dwjohnston.github.io/react-text-highlight

This is a lightweight component that will allow display highlighted spans in your main content, with linked comments/footnotes in the page margin. 

The component includes for having multiple components in close proximity stack nicely. 

For mobile view, the comments are not displayed until they highlight is clicked.

## How to use 

Near the top of your application you will need: 

- A gutter container, with a ref attached, where the comments will be inserted.
   - This container needs to be a column flexbox for desktop views
   - Do not use the `gap` property as the position calculations will not detect them. If you need spacing, add margin to your comment components
   - For mobile, if you want the comments to display on click as a toast, implementation is up to you, in my implementation it is a position:fixed set at the bottom of the screen.

- The TextHighlightProvider - pass the ref to the comments container to it.


```jsx

function App() {
	const ref = useRef<HTMLDivElement>(null);
	const toastContainerRef = useRef<HTMLDivElement>(null);
	return (

		<div style={{
			display: "flex",
			flexFlow: "row nowrap",
		}}>
			<main
				style={{
					flex: "1 1 auto",
				}}>

				<TextHighlightProvider gutterRef={ref}>
					{props.children}
				</TextHighlightProvider >
				<div
					ref={toastContainerRef}
				>

				</div>

			</main>

			{/* 👇 This is the important part
				The container for the comments to sit in, needs to be a column flex box.
			*/}
			<div ref={ref} style={{
				display: "flex",
				flexFlow: "column nowrap",
				flex: "0 0 200px",
			}}></div>
		</div>
	);

}


```

Now use the highlights anywhere you need: 
```jsx

function MyComponent() {
    <p>I am some text. <TextHighlight comment={
        <p>I am the associated comment.</p>}>
            This text is highlighted
        </TextHighlight>
    </p>
}

```



## Styling 

### Approach 1 - Use the default components and style with vanilla CSS.

You can use the default components, and style them with the [existing stylesheet](./src/lib/main.css) or copy it and modify it for your tastes.


Include the stylesheet with

```
import "react-text-highlight/dist/main.css";
```


### Approach 2 - Provide your own components 

You can provide your own components by passing them into the context provider: 

```jsx
<TextHighlightProvider
    Highlight={MyHighlightComponent}
    Comment={MyCommentComponent}
>
    
</TextHighlightProvider>
```

These are the requisite typings: 

```typescript
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
```

## Requesting repositioning 

By default the comments are repositioned when:

- A highlight is added or removed
- The highlights container is resized
- The comments container is resized

It's possible that your application will contain scenarios where additional repositioning is required. 

You can imperatively request repositioning via the hook: 

```
const highlightContext = useTextHighlight(); 
highlightContext.requestRecalculatePositions();
```




## SSR/RSC support 

The highlighted span itself will be included in the server side rendering. The comment will not appear until rendering client side. 

The reason for this is because this solution uses portals, which don't have particularly good support for server side rendering. Well, actually the problem is more with the ref. Essentially the issue is that we need access to the element that holds the comments, but with regular use of a ref, the element won't be attached to the ref until second render. This is the best discussion I could find of this topic: https://stackoverflow.com/a/68659960



