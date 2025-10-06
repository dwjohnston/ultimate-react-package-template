import Link from 'next/link';
import styles from './DocsNavigation.module.css';

const generalTopics = [
  { title: 'Getting Started', path: '/docs/getting-started' },
  { title: 'Installation', path: '/docs/installation' },
  { title: 'Basic Usage', path: '/docs/basic-usage' },
  { title: 'Advanced Patterns', path: '/docs/advanced-patterns' },
  { title: 'Styling Guide', path: '/docs/styling' },
  { title: 'Best Practices', path: '/docs/best-practices' },
];

const apiItems = [
  { title: 'Components Overview', path: '/docs/api/components' },
  { title: 'MyComponent', path: '/docs/api/my-component' },
  { title: 'MyClientComponent', path: '/docs/api/my-client-component' },
];

export function DocsNavigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Documentation</h3>
        <ul className={styles.list}>
          {generalTopics.map((topic) => (
            <li key={topic.path}>
              <Link href={topic.path} className={styles.link}>
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>API Reference</h3>
        <ul className={styles.list}>
          {apiItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className={styles.link}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}