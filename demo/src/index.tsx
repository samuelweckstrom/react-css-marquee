import React from 'react';
import ReactDOM from 'react-dom';
import Marquee from 'react-css-marquee';
import './styles.css';

const App = (): JSX.Element => (
  <main>
    <div className="container">
      <Marquee vertical cssNamespace="vertical" text="Vertical" size={4} />
      <Marquee
        flip
        reverse
        vertical
        cssNamespace="vertical-reverse"
        text="Vertical reverse flip text"
        size={4}
      />
      <Marquee cssNamespace="horizontal" text="Horizontal" />
      <Marquee cssNamespace="reverse" text="Reverse" reverse />
      <Marquee cssNamespace="hover-stop" text="Hover to stop" hoverStop />
      <Marquee cssNamespace="faster" text="Faster" speed={6} />
      <Marquee cssNamespace="very-fast" text="Very fast" speed={12} />
      <Marquee cssNamespace="spaced" text="Spaced" spacing={40} />
      <Marquee cssNamespace="slow" text="Slow" speed={2} />
    </div>
  </main>
);

ReactDOM.render(<App />, document.getElementById('root'));
