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
      <MyComponent foo="foo" />
    </div>

  );
}
