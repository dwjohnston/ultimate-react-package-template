import React from "react";

export type MyComponentProps = {
    foo: string;
    bar?: string;
    chaz?: number;
    delta?: number;
}
export function MyComponent(props: MyComponentProps) {
    return <div data-testid="my-component">This is the component: {props.foo} {props.bar ?? "bar"} {props.chaz ?? "chaz"} {props.delta ?? "delta"}</div>
}