# React CSS Marquee

[Demo](https://codesandbox.io/s/react-css-marquee-demo-577f1)


[![Build Status](https://travis-ci.org/samuelweckstrom/react-css-marquee.svg?branch=master)](https://travis-ci.org/samuelweckstrom/react-css-marquee)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

React marquee component for horizontal and vertical scrolling text (see demo link above for example use cases).

<div align="center">
  <img style="width: 200px" src="https://s3.eu-central-1.amazonaws.com/samuel.weckstrom.xyz/github/marquee.gif">
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

|Default CSS-classes|
| ------------- |
|`react-css-marquee__container`|
|`react-css-marquee__text`|

<br>
You can style the components using the default CSS-classes. If you prefer you can also pass your own namespace for CSS classes via props ie. `my-marquee-namespace__container`.
<br>


### Props

||
| ------------- |
|`text: string`|
|`cssNamespace?: string`|
|`flip?: boolean`|
|`hoverStop?: boolean`|
|`reverse?: boolean`|
|`size?: number`|
|`spacing?: number`|
|`speed?: number`|
|`vertical?: boolean`|


  
  
  
  
  
  
  
  