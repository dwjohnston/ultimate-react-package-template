import React from "react";

/**
 * Props for the MyComponent component
 * @public
 * @category Components
 */
export type MyComponentProps = {
    /** The primary text content to display */
    foo: string;
    /** Optional secondary text content */
    bar?: string;
    /** Optional numeric value for customization */
    chaz?: number;
    /** Optional delta value for calculations */
    delta?: number;
}

/**
 * A demonstration React component that displays text and numeric values
 * 
 * @param props - The component props
 * @returns A div element displaying the provided values
 * 
 * @example
 * ```tsx
 * <MyComponent 
 *   foo="Hello"
 *   bar="World"
 *   chaz={42}
 *   delta={3.14}
 * />
 * ```
 * 
 * @public
 * @category Components
 */
export function MyComponent(props: MyComponentProps) {
    return <div data-testid="my-component">This is the component: {props.foo} {props.bar ?? "bar"} {props.chaz ?? "chaz"} {props.delta ?? "delta"}</div>
}