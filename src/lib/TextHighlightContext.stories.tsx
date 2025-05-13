import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { CommentProps, HighlightProps, TextHighlight, TextHighlightProvider, TextHighlightProviderProps } from "./TextHighlightContext";
import React, { PropsWithChildren, ReactNode, useRef, useState } from "react";

function Demo(props: PropsWithChildren<{
	Highlight?: TextHighlightProviderProps["Highlight"];
	Comment?: TextHighlightProviderProps["Comment"];

}>) {
	const ref = useRef<HTMLDivElement>(null);
	const toastContainerRef = useRef<HTMLDivElement>(null);
	return (

		<div style={{
			display: "flex",
			flexFlow: "row nowrap",
		}}>
			<main
				ref={toastContainerRef}
				style={{
					flex: "1 1 auto",
				}}>
				<TextHighlightProvider gutterRef={ref} toastContainerRef={toastContainerRef} Highlight={props.Highlight} Comment={props.Comment}>

					{props.children}
				</TextHighlightProvider >

			</main>

			{/* 👇 This is the important part
				The container for the comments to sit in, needs to be a column flex box.
			*/}
			<div ref={ref}
				className="right-gutter"
				style={{
					display: "flex",
					flexDirection: "column",
					flexWrap: "nowrap",
					gap: 4,
					flex: "0 0 200px",
				}}></div>
		</div>
	);

}




const meta = {
	title: "TextHighlight",
	component: Demo,


	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: "fullscreen",
	},
} satisfies Meta<typeof Demo>;

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
		if (canvasElement.clientWidth < 600) {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(5); // but they're not visible
			commentEls.forEach((v) => {
				expect(v).not.toBeVisible();
			})

			await userEvent.click(highlightEls[0]);


			await waitFor(() => {
				const commentEls = canvas.getAllByTestId("rth-comment");
				expect(commentEls).toHaveLength(6); // but they're not visible
				expect(commentEls[0]).toBeVisible();
			});

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
	const ref = useRef<HTMLDivElement>(null);
	const toastContainerRef = useRef<HTMLDivElement>(null);

	return <div style={{
		display: "flex",
		flexFlow: "row nowrap",
	}}>
		<main
			ref={toastContainerRef}
			style={{
				flex: "1 1 auto",
			}}>
			<p>
				The purpose of this story is to demonstrate that when content is added and removed the comments still behave nicely
			</p>
			<TextHighlightProvider gutterRef={ref} toastContainerRef={toastContainerRef}>

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
			</TextHighlightProvider >

		</main>

		<div ref={ref} style={{
			display: "flex",
			flexFlow: "column nowrap",
			gap: 4,
			flex: "0 0 200px",
		}}></div>
	</div>

}

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
		if (window.innerWidth < 600) {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(2); // but they're not visible
			commentEls.forEach((v) => {
				expect(v).not.toBeVisible();
			})

			await userEvent.click(highlightEls[0]);


			await waitFor(() => {
				const commentEls = canvas.getAllByTestId("rth-comment");
				expect(commentEls).toHaveLength(3); // but they're not visible
				expect(commentEls[0]).toBeVisible();
			});
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

export const SingleHighlight: Story = {
	args: {
		children: <div>
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

			<p>	Hello I am some <TextHighlight commentContent={<p>
				I am the comment.
			</p>}>text</TextHighlight>. Here is some more text.
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
		</div>
	}
}


function CustomHighlight(props: HighlightProps) {
	const {
		commentId,
		children,
		isSelected,
		hasHover,
		setSelectedStatus,
		setHoverStatus,
		ref } = props;
	return <span
		data-testid="custom-highlight"
		id={commentId}
		onClick={() => setSelectedStatus(true)}
		onMouseEnter={() => setHoverStatus(true)}
		onMouseLeave={() => setHoverStatus(false)}
		style={{
			border: isSelected ? "solid 1px lime" : "solid 1px red",
			backgroundColor: hasHover ? "#333" : "transparent",
			fontWeight: isSelected ? "bold" : "normal",


		}}
		ref={ref}>
		{children}
	</span>
}

function CustomComment(props: CommentProps) {
	const {
		id,
		children,
		isSelected,
		hasHover,
		setSelectedStatus,
		setHoverStatus,
		ref } = props;
	return <span
		data-testid="custom-comment"
		id={id}
		onClick={() => setSelectedStatus(true)}
		onMouseEnter={() => setHoverStatus(true)}
		onMouseLeave={() => setHoverStatus(false)}
		style={{
			border: "solid 1px red",
			backgroundColor: hasHover ? "#857230" : "transparent",
			fontWeight: isSelected ? "bold" : "normal",


		}}
		ref={ref}>
		{children}
	</span>
}


export const WithCustomComponents: Story = {
	args: {
		Highlight: CustomHighlight,
		Comment: CustomComment,
		children: <p>
			Hello I am some <TextHighlight commentContent={<p>
				I am the comment.
			</p>}>text</TextHighlight>. Here is some more text, and here is the <TextHighlight commentContent={<p>I am the second comment.</p>}>highlight.</TextHighlight>
		</p>
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);


		const highlightEls = canvas.getAllByTestId("custom-highlight");
		expect(highlightEls).toHaveLength(2);
		await waitFor(() => {
			expect(canvas.getAllByTestId("custom-comment")).toHaveLength(2);
		});

		console.log(canvasElement, canvasElement.clientWidth);
		// This has been a good play around with storybook testing. 
		// Really quite enjoying it 
		if (canvasElement.clientWidth < 600) {
			const commentEls = canvas.getAllByTestId("custom-comment");
			expect(commentEls).toHaveLength(2); // but they're not visible

			commentEls.forEach((v) => {
				console.log(v)
				expect(v).not.toBeVisible();
			})

			await userEvent.click(highlightEls[0]);


			/**
			 * Note the behaviour of the comments for mobile
			 * Actually the comments be duplicated into the toast container for mobile experience
			 */
			await waitFor(() => {
				const commentEls2 = canvas.getAllByTestId("custom-comment");
				expect(commentEls2).toHaveLength(3); // but they're not visible
				expect(commentEls2[0]).toBeVisible();

			});


		}
		else {
			const commentEls = canvas.getAllByTestId("custom-comment");
			expect(commentEls).toHaveLength(2);

		}
	}
}