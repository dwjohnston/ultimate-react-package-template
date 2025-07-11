import Image from "next/image";
import styles from "./page.module.css";
import { MyComponent } from "@/lib/MyComponent";
import "../lib/main.css"
export default function Home() {
  return (
    <div>
      <p>
        This is your site documentation page.
      </p>

      <p>
        The component:
      </p>
      <MyComponent foo="foo" />

      See also, the Storybook at <a href="/storybook-static/index.html">/storybook-static/index.html</a>.
    </div>

  );
}
