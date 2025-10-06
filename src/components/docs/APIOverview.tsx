import { getAllComponents } from '@/lib/docs/typeDocUtils';
import Link from 'next/link';
import styles from './APIOverview.module.css';

export function APIOverview() {
  const components = getAllComponents();
  
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>API Reference</h1>
      <p className={styles.subtitle}>
        Complete reference for all components and their properties
      </p>
      
      <div className={styles.section}>
        <h2>Components</h2>
        <p>
          The following React components are available in this package. Click on any component 
          to view detailed documentation including props, usage examples, and type information.
        </p>
        
        <div className={styles.componentGrid}>
          {components.map((component) => {
            const summary = component.signatures?.[0]?.comment?.summary?.[0]?.text || 
                           component.comment?.summary?.[0]?.text || 
                           'No description available';
            
            return (
              <Link 
                key={component.name}
                href={`/docs/api/${component.name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`}
                className={styles.componentCard}
              >
                <div className={styles.componentHeader}>
                  <h3 className={styles.componentName}>{component.name}</h3>
                  <span className={styles.componentKind}>{component.kindString}</span>
                </div>
                <p className={styles.componentDescription}>
                  {summary}
                </p>
              </Link>
            );
          })}
        </div>
        
        {components.length === 0 && (
          <div className={styles.noComponents}>
            <p>No components found. Make sure to run <code>npm run build:docs</code> to generate API documentation.</p>
          </div>
        )}
      </div>
      
      <div className={styles.section}>
        <h2>Generated Documentation</h2>
        <p>
          This API documentation is automatically generated from TypeScript definitions and TSDoc comments in the source code. 
          For the complete TypeDoc-generated documentation, visit the{' '}
          <a href="/docs/index.html" target="_blank" rel="noopener noreferrer" className={styles.link}>
            full API documentation
          </a>.
        </p>
      </div>
    </div>
  );
}