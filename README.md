# react-text-highlight

Storybook here: https://dwjohnston.github.io/react-text-highlight

This is a lightweight component that will allow display highlighted spans in your main content, with linked comments/footnotes in the page margin. 

The component includes for having multiple components in close proximity stack nicely. 

For mobile view, the comments are not displayed until they highlight is clicked.

## How to use 

At the top level of your application include the provider. 

```jsx

export function App() {
    <TextHighlightProvider>
        {/* rest of the application here*/}
    </TextHighlightProvider>
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
```


## SSR/RSC support 

The highlighted span itself will be included in the server side rendering. The comment will not appear until rendering client side. 

The reason for this is because this solution uses portals, which don't have particularly good support for server side rendering (well, actually the problem is that refs don't work very well in SSR). Essentially the issue is that we need access to the element that holds the comments, but with regular use of a ref, the element won't be attached to the ref until second render. (This is the best discussion I could find of this topic: https://stackoverflow.com/a/68659960)



