import React from "react";
import styles from "./MyComponent.module.css";

export type MyComponentProps = {
    foo: string;
    bar?: string;
    chaz?: number;
    delta?: number;
    /** Optional className to customize the container styling */
    className?: string;
}
export function MyComponent(props: MyComponentProps) {
    const containerClass = props.className 
        ? `${styles.container} ${props.className}`
        : styles.container;
    
    return (
        <div data-testid="my-component" className={containerClass}>
            <p className={styles.text}>
                This is the component: {props.foo} {props.bar ?? "bar"} {props.chaz ?? "chaz"} {props.delta ?? "delta"}
            </p>
        </div>
    );
}