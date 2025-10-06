import { getComponentData, TypeDocChild } from '@/lib/docs/typeDocUtils';
import styles from './ComponentDocumentation.module.css';

interface ComponentDocumentationProps {
  componentName: string;
}

function formatText(content: Array<{ kind: string; text: string }> | undefined): string {
  if (!content) return '';
  return content.map(item => item.text).join('');
}

function TypeDisplay({ type }: { type: any }) {
  if (!type) return <span>unknown</span>;
  
  if (type.type === 'reference') {
    return <span className={styles.type}>{type.name}</span>;
  }
  
  if (type.type === 'intrinsic') {
    return <span className={styles.type}>{type.name}</span>;
  }
  
  if (type.type === 'literal') {
    return <span className={styles.literal}>"{type.value}"</span>;
  }
  
  if (type.type === 'union') {
    return (
      <span>
        {type.types.map((t: any, i: number) => (
          <span key={i}>
            {i > 0 && ' | '}
            <TypeDisplay type={t} />
          </span>
        ))}
      </span>
    );
  }
  
  return <span className={styles.type}>{type.type}</span>;
}

export function ComponentDocumentation({ componentName }: ComponentDocumentationProps) {
  const componentData = getComponentData(componentName);
  
  if (!componentData) {
    return (
      <div className={styles.content}>
        <h1 className={styles.title}>{componentName}</h1>
        <div className={styles.notFound}>
          <p>Component documentation not found. Make sure to run <code>npm run build:docs</code> to generate API documentation.</p>
        </div>
      </div>
    );
  }
  
  const signature = componentData.signatures?.[0];
  const description = formatText(signature?.comment?.summary) || formatText(componentData.comment?.summary) || 'No description available';
  const parameters = signature?.parameters || [];
  
  // Find examples in block tags
  const examples = signature?.comment?.blockTags?.filter(tag => tag.tag === '@example') || [];
  
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{componentName}</h1>
      <p className={styles.description}>{description}</p>
      
      {parameters.length > 0 && (
        <div className={styles.section}>
          <h2>Props</h2>
          <div className={styles.propsTable}>
            {parameters.map((param) => {
              const paramDescription = formatText(param.comment?.summary) || 'No description available';
              
              return (
                <div key={param.name} className={styles.propRow}>
                  <div className={styles.propHeader}>
                    <span className={styles.propName}>{param.name}</span>
                    <span className={styles.propType}>
                      <TypeDisplay type={param.type} />
                    </span>
                  </div>
                  <div className={styles.propDescription}>{paramDescription}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {examples.length > 0 && (
        <div className={styles.section}>
          <h2>Examples</h2>
          {examples.map((example, index) => (
            <div key={index} className={styles.example}>
              <div className={styles.codeBlock}>
                <pre>
                  <code>{formatText(example.content)}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.section}>
        <h2>Source</h2>
        <p>
          For the complete TypeDoc-generated documentation, visit the{' '}
          <a href="/docs/index.html" target="_blank" rel="noopener noreferrer" className={styles.link}>
            full API documentation
          </a>.
        </p>
      </div>
    </div>
  );
}