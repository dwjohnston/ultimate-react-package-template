import Image from "next/image";
import styles from "./page.module.css";
import { TextHighlight, TextHighlightProvider } from "@/lib/TextHighlightContext";
import "../lib/main.css"
export default function Home() {
  return (

      <div>
      <TextHighlightProvider>
        <p>
          I am some <TextHighlight commentContent={<>I am the comment</>}>
            text
          </TextHighlight>
        </p>
      </TextHighlightProvider>
      </div>

  );
}
