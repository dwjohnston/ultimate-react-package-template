import { DocsLayout } from '@/components/docs/DocsLayout';
import { ComponentDocumentation } from '@/components/docs/ComponentDocumentation';

export default function MyClientComponentPage() {
  return (
    <DocsLayout>
      <ComponentDocumentation componentName="MyClientComponent" />
    </DocsLayout>
  );
}