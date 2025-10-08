# How to Use and Customize CSS Modules in Your App

This guide shows how consumers of this package can use and customize components with CSS modules.

## Installation

```bash
npm install an-example-react-package-built-with-nextjs-tooling
```

## Basic Usage

### 1. Using the Component with Default Styles

```tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';

function App() {
  return <MyComponent foo="Hello World!" />;
}
```

The component will automatically have its default styling (blue border, light blue background).

## Customization Methods

### Method 1: Using the className Prop

The simplest way to customize is to pass a `className` prop:

```tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import './my-custom-styles.css';

function App() {
  return <MyComponent foo="Customized" className="my-custom-style" />;
}
```

```css
/* my-custom-styles.css */
.my-custom-style {
  border-color: #ff0000 !important;
  background-color: #ffe6e6 !important;
}

.my-custom-style:hover {
  background-color: #ffcccc !important;
}
```

### Method 2: Using CSS Variables (Recommended)

The component exposes CSS variables that can be overridden without `!important`:

```tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import './theme.css';

function App() {
  return (
    <div className="green-theme">
      <MyComponent foo="Themed!" />
    </div>
  );
}
```

```css
/* theme.css */
.green-theme {
  --my-component-border-color: #28a745;
  --my-component-bg-color: #e6f9e6;
  --my-component-bg-hover: #ccf2cc;
  --my-component-text-color: #155724;
}
```

**Available CSS Variables:**
- `--my-component-border-color`: Border color (default: `#007bff`)
- `--my-component-bg-color`: Background color (default: `#f0f8ff`)
- `--my-component-bg-hover`: Hover background color (default: `#e6f2ff`)
- `--my-component-text-color`: Text color (default: `#333`)
- `--my-component-shadow`: Box shadow color (default: `rgba(0, 123, 255, 0.2)`)

### Method 3: Global Theme with CSS Variables

For app-wide theming, set CSS variables at the root level:

```tsx
// App.tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import './global-theme.css';

function App() {
  return (
    <div>
      <MyComponent foo="Component 1" />
      <MyComponent foo="Component 2" />
    </div>
  );
}
```

```css
/* global-theme.css */
:root {
  --my-component-border-color: #6f42c1;
  --my-component-bg-color: #f3e5ff;
  --my-component-bg-hover: #e6ccff;
  --my-component-text-color: #4a2c6b;
}
```

### Method 4: Inline Styles with CSS Variables

For dynamic theming based on props or state:

```tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';

function ThemableComponent({ theme }: { theme: 'primary' | 'success' | 'danger' }) {
  const themeColors = {
    primary: {
      '--my-component-border-color': '#007bff',
      '--my-component-bg-color': '#e6f2ff',
    },
    success: {
      '--my-component-border-color': '#28a745',
      '--my-component-bg-color': '#e6f9e6',
    },
    danger: {
      '--my-component-border-color': '#dc3545',
      '--my-component-bg-color': '#ffe6e6',
    },
  };

  return (
    <div style={themeColors[theme] as React.CSSProperties}>
      <MyComponent foo={`${theme} themed!`} />
    </div>
  );
}
```

## Framework-Specific Examples

### Next.js

Next.js has built-in support for CSS modules:

```tsx
// app/page.tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import styles from './page.module.css';

export default function Home() {
  return <MyComponent foo="Hello" className={styles.customComponent} />;
}
```

```css
/* app/page.module.css */
.customComponent {
  --my-component-border-color: #0070f3;
  --my-component-bg-color: #e6f4ff;
}
```

### Vite + React

Vite also supports CSS modules natively:

```tsx
// src/App.tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import styles from './App.module.css';

function App() {
  return <MyComponent foo="Hello" className={styles.myCustom} />;
}
```

### Create React App

CRA supports CSS modules with the `.module.css` naming convention:

```tsx
// src/App.tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import styles from './App.module.css';

function App() {
  return <MyComponent foo="Hello" className={styles.customized} />;
}
```

## Advanced: Combining Multiple Customization Methods

You can combine `className` prop with CSS variables for maximum flexibility:

```tsx
import { MyComponent } from 'an-example-react-package-built-with-nextjs-tooling';
import './advanced-styles.css';

function AdvancedExample() {
  return (
    <div className="theme-wrapper">
      <MyComponent 
        foo="Fully customized!" 
        className="additional-styles"
      />
    </div>
  );
}
```

```css
/* advanced-styles.css */
.theme-wrapper {
  /* Set CSS variables for theming */
  --my-component-border-color: #17a2b8;
  --my-component-bg-color: #e6f9fc;
}

.additional-styles {
  /* Add extra styling */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem;
}
```

## Important Notes

### CSS Specificity

- CSS modules generate scoped class names like `.MyComponent_container__abc123`
- Use `!important` sparingly, prefer CSS variables when possible
- The `className` prop adds to existing classes, it doesn't replace them

### Dark Mode Support

The component includes built-in dark mode support using `prefers-color-scheme`:

```css
/* This is already built into the component */
@media (prefers-color-scheme: dark) {
  .container {
    --my-component-border-color: #4a90e2;
    --my-component-bg-color: #1a2332;
    /* ... other dark mode values */
  }
}
```

You can override dark mode colors the same way:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --my-component-border-color: #your-dark-color;
  }
}
```

### TypeScript Support

The package includes TypeScript definitions. The `className` prop is properly typed:

```tsx
import { MyComponent, MyComponentProps } from 'an-example-react-package-built-with-nextjs-tooling';

const props: MyComponentProps = {
  foo: "Hello",
  className: "my-class", // ✅ TypeScript knows this is valid
};
```

## Troubleshooting

### Styles not applying?

1. **Check CSS import order**: Component CSS should be imported before your custom CSS
2. **Use browser DevTools**: Inspect the element to see generated class names
3. **Try `!important`**: For quick testing (not recommended for production)
4. **Use CSS variables**: They work better with CSS modules than direct property overrides

### CSS modules not working in your bundler?

Most modern bundlers support CSS modules out of the box:
- **Webpack 5**: Built-in support for `.module.css`
- **Vite**: Built-in support
- **Next.js**: Built-in support
- **Create React App**: Built-in support

If using a custom setup, ensure your bundler is configured for CSS modules.

## Summary

**Best Practices:**
1. ✅ Use CSS variables for theming (cleanest, most maintainable)
2. ✅ Use `className` prop for structural changes
3. ✅ Combine both methods for complex customization
4. ⚠️ Avoid `!important` unless absolutely necessary
5. ⚠️ Don't try to target internal class names directly (they may change)

The CSS modules approach gives you:
- 🎨 Default opinionated styling out of the box
- 🔧 Easy customization through props and CSS variables
- 🚀 No JavaScript bundle inflation (CSS is separate)
- 💾 Cacheable CSS files
- 🛡️ No CSS class name collisions
