import React from "react";

export type MyComponentProps = {
    foo: string;
}
export function MyComponent(props: MyComponentProps) {
    return <div data-testid="my-component">This is the component: {props.foo}</div>
}