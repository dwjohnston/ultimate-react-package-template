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

Currently this is styled with regular class names and vanilla CSS. 

This is working fine for my purposes, which is [my blog](https://blacksheepcode.com). 

Take a look at css file and modify as needed. 

I've thought about full support for providing your own custom components. If this is something you need, then feel free to get in touch and I can take a look at it. 

## SSR/RSC support 

The highlighted span itself will be included in the server side rendering. The comment will not appear until rendering client side. 

The reason for this is because this solution uses portals, which don't have particularly good support for server side rendering (well, actually the problem is that refs don't work very well in SSR). Essentially the issue is that we need access to the element that holds the comments, but with regular use of a ref, the element won't be attached to the ref until second render. (This is the best discussion I could find of this topic: https://stackoverflow.com/a/68659960/1068446)



