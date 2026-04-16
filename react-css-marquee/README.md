# React CSS Marquee

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![npm](https://img.shields.io/npm/v/react-css-marquee)](https://www.npmjs.com/package/react-css-marquee)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-css-marquee)](https://bundlephobia.com/package/react-css-marquee)

A lightweight React marquee component powered by CSS animations. Supports horizontal and vertical scrolling, gradient fade edges, pause controls, auto-fill, loop count, and more -- with zero dependencies.

## Install

```
npm install react-css-marquee
```

## Quick start

```tsx
import { Marquee } from 'react-css-marquee'

<Marquee>
  <img src="logo1.png" />
  <img src="logo2.png" />
  <img src="logo3.png" />
</Marquee>
```

## Examples

### Gradient fade edges

Uses CSS `mask-image` so it works over any background without specifying a color.

```tsx
<Marquee gradient gradientWidth={200}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Marquee>
```

### Vertical scrolling

```tsx
<Marquee direction="vertical" style={{ height: 400 }}>
  <p>Line one</p>
  <p>Line two</p>
  <p>Line three</p>
</Marquee>
```

### Sparse scrolling (no repeat)

Items scroll across individually without duplicating to fill the viewport.

```tsx
<Marquee repeat={false} speed={8}>
  <h2>Breaking news headline</h2>
</Marquee>
```

### Pause on hover

```tsx
<Marquee isPausedOnHover>
  <Card />
  <Card />
  <Card />
</Marquee>
```

### Drag to scroll

Let users grab and scrub through the marquee content. The animation resumes from where the user left off.

```tsx
<Marquee draggable>
  <img src="photo1.jpg" />
  <img src="photo2.jpg" />
  <img src="photo3.jpg" />
</Marquee>
```

### Click to toggle pause

```tsx
<Marquee isPausedOnClick>
  <span>Click anywhere on the marquee to pause / resume</span>
</Marquee>
```

### Finite loop with callback

```tsx
<Marquee loop={3} onFinish={() => console.log('done')}>
  <span>This plays 3 times</span>
</Marquee>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | -- | Content to scroll |
| `className` | `string` | -- | CSS class for the container element |
| `delay` | `number` | `0` | Delay before animation starts, in seconds |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction |
| `draggable` | `boolean` | `false` | Let users grab and drag to scrub through the marquee. Animation resumes on release |
| `repeat` | `boolean` | `true` | Duplicate children to fill the viewport for a seamless loop. Set `false` for spaced-out items that scroll across individually |
| `gap` | `number` | `40` | Gap between items in pixels |
| `gradient` | `boolean` | `false` | Fade out edges with a gradient overlay |
| `gradientWidth` | `number \| string` | `200` | Width of the gradient fade zone (number for px, string for any CSS unit) |
| `isPaused` | `boolean` | `false` | Pause the animation |
| `isPausedOnClick` | `boolean` | `false` | Click the marquee to toggle between paused and running |
| `isPausedOnHover` | `boolean` | `false` | Pause when hovering over the marquee |
| `isPausedOnMouseDown` | `boolean` | `false` | Pause while the mouse button is held down on the marquee |
| `loop` | `number` | `0` | Number of times to play the animation. `0` means infinite |
| `onCycleComplete` | `() => void` | -- | Called each time the animation completes one cycle |
| `onFinish` | `() => void` | -- | Called when a finite loop animation ends |
| `reverse` | `boolean` | `false` | Reverse the scroll direction |
| `speed` | `number` | `10` | Animation duration in seconds (higher = slower) |
| `style` | `CSSProperties` | -- | Inline styles for the container element |

## Accessibility

The component automatically pauses animation when the user has `prefers-reduced-motion: reduce` enabled. Duplicate items rendered for the seamless loop are marked with `aria-hidden` to prevent screen readers from reading them multiple times.

## License

MIT
