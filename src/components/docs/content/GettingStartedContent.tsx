import { MyComponent } from '@/lib/MyComponent';
import styles from '../DocsContent.module.css';

export function GettingStartedContent() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Getting Started</h1>
      <p className={styles.subtitle}>
        Learn how to install and use the Ultimate React Package Template
      </p>
      
      <div className={styles.section}>
        <h2>Installation</h2>
        <p>
          Install the package using your preferred package manager:
        </p>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`npm install your-package-name
# or
yarn add your-package-name
# or
pnpm add your-package-name`}</code>
          </pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Basic Usage</h2>
        <p>
          Import the components you need and use them in your React application:
        </p>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`import { MyComponent } from 'your-package-name';

function App() {
  return (
    <div>
      <MyComponent foo="Hello World" />
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Live Example</h2>
        <p>
          Here's a live example of the MyComponent in action:
        </p>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          marginTop: '16px',
          backgroundColor: '#f9fafb'
        }}>
          <MyComponent foo="Interactive Example" bar="This is rendered live!" />
        </div>
      </div>

      <div className={styles.section}>
        <h2>TypeScript Support</h2>
        <p>
          This package is built with TypeScript and includes full type definitions. 
          Your IDE will provide complete autocomplete and type checking support.
        </p>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`import type { MyComponentProps } from 'your-package-name';

const props: MyComponentProps = {
  foo: "Type-safe development",
  bar: "Full IntelliSense support",
  chaz: 42,
  delta: 3.14
};`}</code>
          </pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Next Steps</h2>
        <ul>
          <li>Explore the <a href="/docs/api/components" className={styles.link}>API Reference</a> for detailed component documentation</li>
          <li>Check out advanced usage patterns in the <a href="/docs/advanced-patterns" className={styles.link}>Advanced Patterns</a> guide</li>
          <li>Learn about styling options in the <a href="/docs/styling" className={styles.link}>Styling Guide</a></li>
          <li>View interactive examples in <a href="/storybook-static" className={styles.link}>Storybook</a></li>
        </ul>
      </div>
    </div>
  );
}