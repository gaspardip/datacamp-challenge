# Markdown Editor

A responsive Markdown editor built with React and TypeScript. The focus was on delivering a polished, production-ready app that balances performance, user experience, and clean, maintainable code—all while meeting the exercise's requirements.

A live version of the app is hosted on Vercel: [https://datacamp-challenge.vercel.app/](https://datacamp-challenge.vercel.app/)

## Features

- **Split-Pane Layout:** Resizable panels for editing and previewing side by side.
- **Live Preview:** Real-time Markdown rendering with syntax highlighting.
- **Word & Character Count:** Keep track of your writing stats as you go.
- **Copy & Download:** Easily copy your work to the clipboard or download it as a file.
- **Dark Mode:** Built-in dark theme for a comfortable writing experience.
- **Mobile Responsive:** Works great on desktops, tablets, and phones.
- **Local Storage Persistence:** Your Markdown content stays saved in the browser, even after refreshing.

## 🛠 Technical Decisions

### Framework & Build Tools

I went with **Vite + React + TypeScript** for their fast development experience and optimized builds. While **Next.js** crossed my mind, it felt like overkill since this is a purely client-side app with no SEO needs.

### UI & Styling

For the UI, I used **TailwindCSS** paired with **shadcn/ui** components because:

1. It offers a solid design system while allowing full customization.
2. The utility-first approach keeps styles colocated with components for better maintainability.
3. CSS variables make theming effortless without adding runtime overhead.

### Performance Optimizations

```typescript
const deferredMarkdown = useDeferredValue(markdown)!;
```

To ensure smooth performance, I implemented:

1. **`useDeferredValue`** for the live preview to avoid UI lag.
2. Debounced local storage updates to reduce unnecessary write operations.
3. Memoized components to minimize re-renders.

### State Management

I opted to keep things simple by sticking with React’s built-in hooks, avoiding external libraries like Redux/Zustand/Jotai/etc. The app’s data flow is straightforward enough that this approach keeps the codebase clean and easy to manage.

### Storage Strategy

```typescript
const [markdown, setMarkdown] = useLocalStorage(MARKDOWN_KEY, defaultMarkdown);
```

A custom `useLocalStorage` hook with debouncing handles data persistence. Why this approach?

1. It simplifies data storage without the need for a backend.
2. Debouncing ensures performance stays snappy during rapid edits.
3. It's flexible and can easily be swapped for a backend solution if needed in the future.

### Trade-offs & Considerations

A few conscious decisions I made along the way:

1. **Local Storage vs Backend**

   I chose local storage for simplicity and offline functionality. While it has limitations, it's more than sufficient for an MVP.

2. **Markdown Processing**

   All processing happens client-side for instant feedback. If performance becomes a bottleneck, shifting to Web Workers is an option.

3. **Component Library**

   I used **shadcn/ui** for fast, reliable UI development, even if it means a slightly larger bundle size.

4. **Performance**

   - Syntax Highlighting: I used react-syntax-highlighter, which isn’t the most performant. If necessary, I’ll explore lighter alternatives.

   - Re-renders: The entire app re-renders when Markdown changes. For now, this trade-off balances simplicity and performance.

   - Large Documents: Performance might degrade with very long Markdown files.

## Future Improvements

The current version is solid, but here are some ideas for future improvements:

### Technical Enhancements

- Add comprehensive test coverage.
- Implement robust error boundaries.
- Introduce keyboard shortcuts for faster editing.
- Support file import/export features.

### New Features

- Collaborative editing in real-time.
- Version history for tracking changes.
- Image upload support for richer content.

## Getting Started

To run the project locally:

```bash
pnpm install
pnpm dev
```
