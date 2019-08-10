import React from 'react'

interface MarqueeProps {
  text: string,
  speed?: number,
  styles?: object,
  direction?: string,
  spacing?: number
  size?: number,
}

const useWindowSize = (): { [T: string]: number } => {
  const getSize = (): { [T: string]: number } => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [size, setSize] = React.useState(getSize)
  React.useEffect(() => {
    const onResize = () => setSize(getSize)
    window.addEventListener('resize', onResize)
    return (): void => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

const Marquee: React.SFC<MarqueeProps> = ({
  text = 'REACT MARQUEE',
  direction = 'left',
  spacing = 4,
  size = 3,
  styles,
  speed = 5,
}): React.ReactElement => {
  const { width } = useWindowSize()
  const repeatText: number = width / (spacing + text.length) / (size * 2)
  const textWithSpaces: string = `${text}${' '.repeat(spacing)}`.repeat(repeatText);
  const setDirection: string = direction === 'right' ? 'reverse' : 'left'
  const maxSpeed: number = 10
  const setSpeed: number = width / speed / maxSpeed
  const scopedClassName: string = Math.random().toString(36).substring(7);

  return (
    <div className={`react-marquee__wrapper rm-wrapper__${scopedClassName}`}>
      <style>
        {`
          @keyframes rm-animation__${scopedClassName} {
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }
          .rm-wrapper__${scopedClassName} {
            display: flex;
            flex-flow: row nowrap;
            transform: translateZ(0);
            width: 100%;
            height: auto;
            overflow: hidden;
          }
          .rm-text__${scopedClassName} {
            align-self: center;
            animation: rm-animation-${scopedClassName};
            animation-direction: ${setDirection};
            animation-duration: ${setSpeed}s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            font-size: ${size}rem;
            text-rendering: optimizeLegibility;
            transform: translateZ(0);
          }
          .rm-text-${scopedClassName}::before {
            white-space: pre;
            content: '${textWithSpaces}';
          }
        `}
      </style>
      <div className={`react-marquee__text rm-text__${scopedClassName}`} style={{ ...styles }} />
      <div className={`react-marquee__text rm-text__${scopedClassName}`} style={{ ...styles }} />
    </div>
  )
}

export { useWindowSize }
export default Marquee
