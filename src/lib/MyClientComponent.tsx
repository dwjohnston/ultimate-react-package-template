"use client"
import React, { useEffect } from "react";

/**
 * A client-side React component that demonstrates useEffect hook usage
 * 
 * This component must be rendered on the client side (uses "use client" directive)
 * and logs a message when it mounts.
 * 
 * @returns A div element with static text
 * 
 * @example
 * ```tsx
 * <MyClientComponent />
 * ```
 * 
 * @public
 */
export function MyClientComponent() {

    useEffect(() => {
        console.log('hello!')
    }, [])
    return <div>This is the component</div>
}