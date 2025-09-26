import styles from "./page.module.css";
import { MyComponent } from "@/lib/MyComponent";
import "../lib/main.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.title}>Ultimate React Package Template</h1>
          <p className={styles.description}>
            A comprehensive template for creating and publishing open source React packages with Next.js tooling, Storybook, and automated release management.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Installation</h2>
            <p>Install the package via npm:</p>
            <code className={styles.code}>npm install an-example-react-package-built-with-nextjs-tooling</code>
            <p>Then import and use the components:</p>
            <code className={styles.code}>
              import {"{ MyComponent }"} from &apos;an-example-react-package-built-with-nextjs-tooling&apos;;
            </code>
          </div>

          <div className={styles.card}>
            <h2>Example Usage</h2>
            <p>Here&apos;s how to use the main component:</p>
            <div className={styles.example}>
              <MyComponent foo="example" bar="value" />
            </div>
          </div>

          <div className={styles.card}>
            <h2>Features</h2>
            <ul>
              <li>TypeScript support</li>
              <li>Storybook integration</li>
              <li>Automated testing</li>
              <li>Release management with changesets</li>
              <li>Branch deploys to Netlify</li>
            </ul>
          </div>
        </div>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://github.com/dwjohnston/ultimate-react-package-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          <a
            className={styles.secondary}
            href="/storybook-static/index.html"
          >
            Explore Storybook
          </a>
        </div>
      </main>
    </div>
  );
}
