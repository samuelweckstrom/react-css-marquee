import React from 'react';
import ReactDOM from 'react-dom';
import Marquee from 'react-css-marquee';
import './styles.css';

const App = (): JSX.Element => {
  return (
    <div>
      <div className="disable-default-wrapper">
        <Marquee
          text="REACT CSS MARQUEE"
          namespace="horizontal-marquee-disable-default"
          speed={4}
          direction="right"
          orientation="horizontal"
          disableDefaultStyles
        />
      </div>

      <div className="vertical-wrapper">
        <div className="vertical-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="vertical-marquee"
            speed={5}
            size={5}
            direction="right"
            orientation="vertical"
          />
        </div>
        <div className="vertical-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="vertical-marquee"
            speed={2}
            size={10}
            direction="right"
            orientation="vertical"
          />
        </div>
        <div className="vertical-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="vertical-marquee"
            speed={1}
            size={1}
            direction="right"
            orientation="vertical"
          />
        </div>
      </div>
      <div className="horizontal-wrapper">
        <div className="horizontal-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="horizontal-marquee"
            speed={2}
            size={12}
            direction="right"
            orientation="horizontal"
          />
        </div>
        <div className="horizontal-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="horizontal-marquee"
            speed={7}
            size={2}
            direction="right"
            orientation="horizontal"
          />
        </div>
        <div className="horizontal-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="horizontal-marquee"
            speed={10}
            size={10}
            direction="right"
            orientation="horizontal"
          />
        </div>
        <div className="horizontal-marquee">
          <Marquee
            text="REACT CSS MARQUEE"
            namespace="horizontal-marquee"
            speed={5}
            size={5}
            direction="right"
            orientation="horizontal"
          />
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
