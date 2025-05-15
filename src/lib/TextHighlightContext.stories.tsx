import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import { CommentProps, HighlightProps, TextHighlight, TextHighlightProvider, TextHighlightProviderProps } from "./TextHighlightContext";
import React, { PropsWithChildren, ReactNode, useRef, useState } from "react";

function Demo(props: PropsWithChildren<{
	Highlight?: TextHighlightProviderProps["Highlight"];
	Comment?: TextHighlightProviderProps["Comment"];

}>) {
	const ref = useRef<HTMLDivElement>(null);
	return (

		<div>
			<div style={{
				height: 100,
				border: "dotted 1px grey",
				fontSize: 20
			}}>I am a header</div>
			<div style={{
				display: "flex",
				flexFlow: "row nowrap",
			}}>


				<main
					style={{
						flex: "1 1 auto",
					}}>
					<TextHighlightProvider gutterRef={ref} Highlight={props.Highlight} Comment={props.Comment}>

						{props.children}
					</TextHighlightProvider >

				</main>

				{/* 👇 This is the important part
				The container for the comments to sit in. 

				For regular desktop view, this needs to a be a flex container with a column direction. 

				If you want to use a mobile toast, then it's upto you you would implement it, 
				but you could make a position: fixed element at the bottom of the screen 
				And use media queries on the individual comments to to only show them if they are selected.

			*/}
				<div ref={ref}
					className="right-gutter"
				></div>
			</div>
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
				<h1>React Text Highlight</h1>
				<p>
					React Text Highlight allows your to <TextHighlight comment={<div>I am the corresponding text.</div>}>
						highlight portions of some next
					</TextHighlight> and have a corresponding comment appear in the page margin.
				</p>
				<p>
					This is a large block of text. 	Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis.<TextHighlight comment={<div>Comments will appear in their corresponding vertical position in the margin.</div>}>
						Tempus leo eu aenean sed diam urna
					</TextHighlight>
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>
				<p>
					If <TextHighlight comment={<div>Comment A</div>}>
						multiple highlights
					</TextHighlight> appear in the <TextHighlight comment={<div>Comment B</div>}>
						same line
					</TextHighlight>then the <TextHighlight comment={<div>Comment C</div>}>
						comments
					</TextHighlight>
					will be <TextHighlight comment={<div>Comment D.</div>}>
						nicely stacked.
					</TextHighlight>
				</p>

				<p>
					This is a large block of text. 	Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis.
					tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
					Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
					hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
					per conubia nostra inceptos himenaeos.
				</p>

				<p>
					This is a large block of text. 	Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
					faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
					pretium tellus duis convallis.<TextHighlight comment={<div style={{ border: "1px solid lime", backgroundColor: "#444", height: 100 }}>Comments can contain any kind of content</div>}>
						Tempus leo eu aenean sed diam urna
					</TextHighlight>
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
		expect(highlightEls).toHaveLength(7);



		// Weird bug here. 
		// For some reason on local dev this doesn't matter, but 
		// For production it does? I don't know
		await waitFor(() => {
			expect(canvas.getAllByTestId("rth-comment")).toHaveLength(7);
		});

		// This has been a good play around with storybook testing. 
		// Really quite enjoying it 
		if (canvasElement.clientWidth < 600) {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(7); // but they're not visible
			commentEls.forEach((v) => {
				expect(v).not.toBeVisible();
			})

			await userEvent.click(highlightEls[0]);


			await waitFor(() => {
				expect(commentEls).toHaveLength(7); // but they're not visible
				expect(commentEls[0]).toBeVisible();
			});

			const closeButton = within(commentEls[0]).getByRole("button");
			await userEvent.click(closeButton);

			await waitFor(() => {
				expect(commentEls).toHaveLength(7);
				expect(commentEls[0]).not.toBeVisible();
			});

		}
		else {
			const commentEls = canvas.getAllByTestId("rth-comment");
			expect(commentEls).toHaveLength(7);

			const firstComment = commentEls[0];
			expect(firstComment).not.toHaveClass("text-highlight-hover");


			await userEvent.hover(highlightEls[0])

			expect(firstComment).toHaveClass("text-highlight-hover");
		}
	}
};

function RandomParagraph() {
	const [randomNumber] = useState(Math.floor(Math.random() * 5));

	const style = {
		border: "1px dashed grey",
	}
	switch (randomNumber) {
		case 0: {
			return (
				<p style={style}>
					<TextHighlight
						comment={
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
				<p style={style}>
					<TextHighlight comment={<div>Comment A</div>}>
						Lorem ipsum dolor
					</TextHighlight>{" "}
					sit amet{" "}
					<TextHighlight comment={<div>Comment B</div>}>
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
				<p style={style}>
					Lorem ipsum dolor sit amet consectetur adipiscing elit.{" "}
					<TextHighlight comment={<div>This is the comment</div>}>
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
				<p style={style}>
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
			<p >
				The purpose of this story is to demonstrate that when content is added and removed the comments still behave nicely
			</p>
			<TextHighlightProvider gutterRef={ref} >

				<div style={{ marginBottom: 30 }}>
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
	</div >

}

export const SmallerExample: Story = {
	args: {
		children: <p>
			Hello I am some <TextHighlight comment={<p>
				I am the comment.
			</p>}>text</TextHighlight>. Here is some more text, and here is the <TextHighlight comment={<p>I am the second comment.</p>}>highlight.</TextHighlight>
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
				expect(commentEls).toHaveLength(2); // but they're not visible
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

			<p>	Hello I am some <TextHighlight comment={<p>
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
		highlightRef } = props;
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
		ref={highlightRef}>
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
		commentRef } = props;
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
		ref={commentRef}>
		{children}
	</span>
}


export const WithCustomComponents: Story = {
	args: {
		Highlight: CustomHighlight,
		Comment: CustomComment,
		children: <p>
			Hello I am some <TextHighlight comment={<p>
				I am the comment.
			</p>}>text</TextHighlight>. Here is some more text, and here is the <TextHighlight comment={<p>I am the second comment.</p>}>highlight.</TextHighlight>
		</p>
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);


		const highlightEls = canvas.getAllByTestId("custom-highlight");
		expect(highlightEls).toHaveLength(2);
		await waitFor(() => {
			expect(canvas.getAllByTestId("custom-comment")).toHaveLength(2);
		});

		// I'm not testing repsonsiveness for custom components here. 
		// It's a bit fiddly doing media queries, you're basically forced into using a css file. 

	}
}