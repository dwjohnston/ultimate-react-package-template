import { ReactNode } from 'react';
import { DocsNavigation } from './DocsNavigation';
import styles from './DocsLayout.module.css';

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <DocsNavigation />
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}