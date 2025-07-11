import Image from "next/image";
import styles from "./page.module.css";
import { MyComponent } from "@/lib/MyComponent";
import "../lib/main.css"
export default function Home() {
  return (
    <div>
      <p>
        While most of your work should be done in Storybook, it can still be useful to use the Next app as a sandbox.
      </p>
      <p>
        <strong>Links:</strong>
        <ul>
          <li><a href="/storybook-static" target="_blank" rel="noopener noreferrer">Component Stories (Storybook)</a></li>
          <li><a href="/docs">Documentation Site</a></li>
          <li><a href="/docs/index.html" target="_blank" rel="noopener noreferrer">Full API Documentation (TypeDoc)</a></li>
        </ul>
      </p>
      <MyComponent foo="foo" />
    </div>

  );
}
