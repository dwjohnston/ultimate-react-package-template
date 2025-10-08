import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { MyComponent } from './MyComponent';

const meta = {
    title: 'Components/MyComponent',
    component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        foo: "Hello world!"
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const myComponent = await canvas.findByTestId("my-component");
        expect(myComponent).toBeInTheDocument();
        expect(myComponent).toHaveTextContent("This is the component: Hello world!");
    }
}

export const WithCustomStyling: Story = {
    args: {
        foo: "Custom styled!",
        className: "custom-override"
    },
    decorators: [
        (Story) => (
            <>
                <style>{`
                    .custom-override {
                        border-color: #ff0000 !important;
                        background-color: #ffe6e6 !important;
                    }
                    .custom-override:hover {
                        background-color: #ffcccc !important;
                    }
                `}</style>
                <Story />
            </>
        )
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const myComponent = await canvas.findByTestId("my-component");
        expect(myComponent).toBeInTheDocument();
        expect(myComponent.className).toContain("custom-override");
    }
}

export const WithCSSVariables: Story = {
    args: {
        foo: "Themed with CSS variables!",
        className: "css-var-theme"
    },
    decorators: [
        (Story) => (
            <>
                <style>{`
                    .css-var-theme {
                        --my-component-border-color: #28a745;
                        --my-component-bg-color: #e6f9e6;
                        --my-component-bg-hover: #ccf2cc;
                        --my-component-text-color: #155724;
                    }
                `}</style>
                <Story />
            </>
        )
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const myComponent = await canvas.findByTestId("my-component");
        expect(myComponent).toBeInTheDocument();
        expect(myComponent).toHaveTextContent("Themed with CSS variables!");
    }
}
