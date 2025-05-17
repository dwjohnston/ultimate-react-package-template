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
