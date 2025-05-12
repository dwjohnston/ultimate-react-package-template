import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { TextHighlight, TextHighlightProvider } from "./TextHighlightContext";
import React, { ReactNode, useState } from "react";

const meta = {
	title: "Example/TextHighlightContext",
	component: TextHighlightProvider,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: "fullscreen",
	},
} satisfies Meta<typeof TextHighlightProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
	args: {
		children: (
			<main>
				{" "}
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem{" "}
					<TextHighlight commentContent={<div>This is the comment</div>}>
						ipsum dolor sit amet consectetur adipiscing elit.
					</TextHighlight>{" "}
					Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
					cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
					urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
					egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					<TextHighlight commentContent={<div>Comment A</div>}>
						Lorem ipsum dolor
					</TextHighlight>{" "}
					sit amet{" "}
					<TextHighlight commentContent={<div>Comment B</div>}>
						consectetur adipiscing
					</TextHighlight>{" "}
					elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In
					id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
					diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
					egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					<TextHighlight
						commentContent={
							<div>
								<p>This is a large comment</p>
								<p>Line 2</p>
								<p>Line 3</p>
							</div>
						}
					>
						Lorem ipsum dolor sit amet consectetur adipiscing elit.
					</TextHighlight>{" "}
					Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
					cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
					urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
					egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit.{" "}
					<TextHighlight commentContent={<div>This is the final comment</div>}>
						Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
						cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
						diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
						bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc
						posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
						litora torquent per conubia nostra inceptos himenaeos.
					</TextHighlight>
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
			</main>
		),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);


		const highlightEls = canvas.getAllByTestId("rth-highlight");
		expect(highlightEls).toHaveLength(5);



		// Weird bug here. 
		// For some reason on local dev this doesn't matter, but 
		// For production it does? I don't know
		await waitFor(() => {
			expect(canvas.getAllByTestId("rth-comment")).toHaveLength(5);
		});

		// This has been a good play around with storybook testing. 
		// Really quite enjoying it 
		if (window.innerWidth < 800) {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(5); // but they're not visible
			commentEls.forEach((v) => {
				expect(v).not.toBeVisible();
			})

			await userEvent.click(highlightEls[0]);


			await waitFor(() => {
				expect(commentEls[0]).toBeVisible();
			});



			expect(commentEls[0]).toBeVisible();
			expect(commentEls[1]).not.toBeVisible();


		}
		else {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(5);

			const firstComment = commentEls[0];
			expect(firstComment).not.toHaveClass("text-highlight-hover");


			await userEvent.hover(highlightEls[0])

			expect(firstComment).toHaveClass("text-highlight-hover");
		}
	}
};

function RandomParagraph() {
	const [randomNumber] = useState(Math.floor(Math.random() * 5));

	switch (randomNumber) {
		case 0: {
			return (
				<p>
					<TextHighlight
						commentContent={
							<div>
								<p>This is a large comment</p>
								<p>Line 2</p>
								<p>Line 3</p>
							</div>
						}
					>
						Lorem ipsum dolor sit amet consectetur adipiscing elit.
					</TextHighlight>{" "}
					Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
					cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
					urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
					egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
			);
		}
		case 1: {
			return (
				<p>
					<TextHighlight commentContent={<div>Comment A</div>}>
						Lorem ipsum dolor
					</TextHighlight>{" "}
					sit amet{" "}
					<TextHighlight commentContent={<div>Comment B</div>}>
						consectetur adipiscing
					</TextHighlight>{" "}
					elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In
					id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
					diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
					egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
			);
		}
		case 2: {
			return (
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit.{" "}
					<TextHighlight commentContent={<div>This is the comment</div>}>
						Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
						cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed
						diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
						bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc
						posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
						litora torquent per conubia nostra inceptos himenaeos.
					</TextHighlight>
				</p>
			);
		}
		default: {
			return (
				<p>
					Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
			);
		}
	}
}

function Block() {
	const [isOpen, setIsOpen] = useState(true);

	if (!isOpen) {
		return null;
	}

	return (
		<div>
			<button onClick={() => setIsOpen(false)}>Remove paragraph</button>
			<RandomParagraph />
		</div>
	);
}

export const Interactive = () => {
	const [paragraphs, setParagraphs] = React.useState<number>(0);
	return (
		<TextHighlightProvider>
			<div>
				<button
					onClick={() => {
						setParagraphs((prev) => prev + 1);
					}}
				>
					Add paragraph
				</button>
			</div>
			{new Array(paragraphs).fill(true).map((v, i) => {
				return <Block key={i} />;
			})}
		</TextHighlightProvider>
	);
};


export const SmallerExample: Story = {
	args: {
		children: <p>
			Hello I am some <TextHighlight commentContent={<p>
				I am the comment.
			</p>}>text</TextHighlight>. Here is some more text, and here is the <TextHighlight commentContent={<p>I am the second comment.</p>}>highlight.</TextHighlight>
		</p>
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);


		const highlightEls = canvas.getAllByTestId("rth-highlight");
		expect(highlightEls).toHaveLength(2);
		await waitFor(() => {
			expect(canvas.getAllByTestId("rth-comment")).toHaveLength(2);
		});

		// This has been a good play around with storybook testing. 
		// Really quite enjoying it 
		if (window.innerWidth < 800) {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(2); // but they're not visible
			commentEls.forEach((v) => {
				expect(v).not.toBeVisible();
			})

			await userEvent.click(highlightEls[0]);


			await waitFor(() => {
				expect(commentEls[0]).toBeVisible();
			});



			expect(commentEls[0]).toBeVisible();
			expect(commentEls[1]).not.toBeVisible();


		}
		else {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(2);

			const firstComment = commentEls[0];
			expect(firstComment).not.toHaveClass("text-highlight-hover");


			await userEvent.hover(highlightEls[0])

			expect(firstComment).toHaveClass("text-highlight-hover");
		}
	}
}