# React CSS Marquee

[Demo](https://codesandbox.io/s/react-css-marquee-demo-577f1)


[![Build Status](https://travis-ci.org/samuelweckstrom/react-css-marquee.svg?branch=master)](https://travis-ci.org/samuelweckstrom/react-css-marquee)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Bringing back that sweet scrolling [HTML Marquee element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee). In React with CSS @keyframes for animations. Uses hooks to detect window size so React >16.8.

<div align="center">
  <img style="width: 40%" src="https://s3.eu-central-1.amazonaws.com/samuel.weckstrom.xyz/github/marquee.gif">
</div>


## How to

### Install

```
yarn add react-css-marquee
```

### Use

```
import Marquee from 'react-css-marquee'

...

<Marquee text="Your scrolling text here..." />
```

### Styling

Pass inline styles with the `styles` prop or use the CSS default classes `react-marquee__container` and `react-marquee__text`. You can also pass your own CSS namespace.

### Props

| Prop  | Example |
| ------------- | ------------- |
| `text: string`  | Your marquee text |
|`direction: string` |  left \| right |
| `size: number`  | 200  |
| `styles: object`  | Inline CSS  |
| `speed: number`  | 5  |
|`namespace: string`| Pass own CSS namespace|
|`disableDefaultStyles: boolean`| Disable default styling
