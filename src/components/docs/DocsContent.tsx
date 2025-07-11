import styles from './DocsContent.module.css';

export function DocsContent() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Ultimate React Package Template</h1>
      <p className={styles.subtitle}>
        A comprehensive template for building and publishing React component libraries
      </p>
      
      <div className={styles.section}>
        <h2>Overview</h2>
        <p>
          This template provides a complete setup for developing, testing, and publishing React component libraries. 
          It includes TypeScript support, Storybook integration, automated testing, and comprehensive documentation generation.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Key Features</h2>
        <ul>
          <li><strong>TypeScript</strong> - Full type safety and IntelliSense support</li>
          <li><strong>Storybook</strong> - Interactive component development and testing</li>
          <li><strong>Documentation</strong> - Automated API docs with TypeDoc and TSDoc</li>
          <li><strong>Testing</strong> - Vitest and Storybook test runner</li>
          <li><strong>Build Tools</strong> - Next.js tooling for modern development</li>
          <li><strong>Publishing</strong> - Changesets for versioning and NPM publishing</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Quick Start</h2>
        <div className={styles.codeBlock}>
          <pre>
            <code>{`npm install your-package-name

import { MyComponent } from 'your-package-name';

function App() {
  return <MyComponent foo="Hello World" />;
}`}</code>
          </pre>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Documentation Sections</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Getting Started</h3>
            <p>Learn the basics of installation and setup</p>
          </div>
          <div className={styles.card}>
            <h3>API Reference</h3>
            <p>Complete API documentation for all components</p>
          </div>
          <div className={styles.card}>
            <h3>Examples</h3>
            <p>Real-world usage examples and patterns</p>
          </div>
          <div className={styles.card}>
            <h3>Best Practices</h3>
            <p>Recommended patterns and conventions</p>
          </div>
        </div>
      </div>
    </div>
  );
}