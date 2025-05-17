"use client"
import React, { useEffect } from "react";


export function MyClientComponent() {

    useEffect(() => {
        console.log('hello!')
    }, [])
    return <div>This is the component</div>
}