import React from 'react'
import ReactDOM from 'react-dom'
import Marquee from 'react-css-marquee'
import './styles.css'

const App: React.SFC = (): React.ReactElement => {
  return (
    <div>
      <div className="wrapper-vertical">
        <div className="vertical-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="vertical" />
        </div>
        <div className="vertical-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="vertical" />
        </div>
        <div className="vertical-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="vertical" />
        </div>
        <div className="vertical-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="vertical" />
        </div>
      </div>
      <div className="wrapper-horizontal">
        <div className="horizontal-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="horizontal" />
        </div>
        <div className="horizontal-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="horizontal" />
        </div>
        <div className="horizontal-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="horizontal" />
        </div>
        <div className="horizontal-marquee">
          <Marquee text="REACT CSS MARQUEE" speed={5} size={5} direction="right" orientation="horizontal" />
        </div>
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
