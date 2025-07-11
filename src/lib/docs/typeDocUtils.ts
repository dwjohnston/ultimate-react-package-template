import fs from 'fs';
import path from 'path';

export interface TypeDocData {
  name: string;
  children?: TypeDocChild[];
}

export interface TypeDocChild {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  comment?: {
    summary?: Array<{ kind: string; text: string }>;
    blockTags?: Array<{
      tag: string;
      content: Array<{ kind: string; text: string }>;
    }>;
  };
  type?: {
    type: string;
    name?: string;
    typeArguments?: any[];
  };
  signatures?: Array<{
    name: string;
    comment?: {
      summary?: Array<{ kind: string; text: string }>;
      blockTags?: Array<{
        tag: string;
        content: Array<{ kind: string; text: string }>;
      }>;
    };
    parameters?: Array<{
      name: string;
      type: any;
      comment?: {
        summary?: Array<{ kind: string; text: string }>;
      };
    }>;
    type?: any;
  }>;
  children?: TypeDocChild[];
}

export function getTypeDocData(): TypeDocData | null {
  try {
    const docsPath = path.join(process.cwd(), 'docs', 'api-data.json');
    if (!fs.existsSync(docsPath)) {
      console.warn('TypeDoc JSON data not found at:', docsPath);
      return null;
    }
    
    const jsonData = fs.readFileSync(docsPath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading TypeDoc data:', error);
    return null;
  }
}

export function getComponentData(componentName: string): TypeDocChild | null {
  const data = getTypeDocData();
  if (!data || !data.children) return null;
  
  // Find the component in the TypeDoc data
  function findComponent(children: TypeDocChild[]): TypeDocChild | null {
    for (const child of children) {
      if (child.name === componentName) {
        return child;
      }
      if (child.children) {
        const found = findComponent(child.children);
        if (found) return found;
      }
    }
    return null;
  }
  
  return findComponent(data.children);
}

export function getAllComponents(): TypeDocChild[] {
  const data = getTypeDocData();
  if (!data || !data.children) return [];
  
  const components: TypeDocChild[] = [];
  
  function collectComponents(children: TypeDocChild[]) {
    for (const child of children) {
      // Look for React components (functions that return JSX)
      if (child.kindString === 'Function' && child.signatures) {
        const signature = child.signatures[0];
        if (signature?.type?.name === 'Element' || 
            signature?.type?.type === 'reference' && 
            signature?.type?.name === 'Element') {
          components.push(child);
        }
      }
      if (child.children) {
        collectComponents(child.children);
      }
    }
  }
  
  collectComponents(data.children);
  return components;
}