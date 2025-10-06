import { DocsLayout } from '@/components/docs/DocsLayout';
import { ComponentDocumentation } from '@/components/docs/ComponentDocumentation';

export default function MyComponentPage() {
  return (
    <DocsLayout>
      <ComponentDocumentation componentName="MyComponent" />
    </DocsLayout>
  );
}