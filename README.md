# React CSS Marquee

[![Build Status](https://travis-ci.org/samuelweckstrom/react-css-marquee.svg?branch=master)](https://travis-ci.org/samuelweckstrom/react-css-marquee) [![Greenkeeper badge](https://badges.greenkeeper.io/samuelweckstrom/react-css-marquee.svg)](https://greenkeeper.io/)

Bringing back that sweet scrolling [HTML Marquee element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee). In React and uses CSS @keyframes for animations. Uses hooks to detect window size so React > 16.8. Includes type definitions for TypeScript.

<div align="center">
  <img src="https://s3.eu-central-1.amazonaws.com/samuel.weckstrom.xyz/github/marquee.gif">
</div>


## How to

### Install

```
yarn add react-css-marquee
```

### Use

```
import Marquee from 'react-css-marquee

...

<Marquee text="Your scrolling text here..." />
```

### Styling

You can add your own styles by either passing them with the `styles` prop for inline styles, or you can use the CSS classes `react-marquee__container` 
and `react-marquee__text`.

### Props
  * `text`: {string}
  * `direction`: {string} left | right
  * `spacing`: {number} how much space between `text` strings
  * `size`: {number} text size
  * `styles`: {object} will be applied as inline styles to the text
  * `speed`: {number} control speed of scrolling
