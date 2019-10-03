import React from 'react'

interface MarqueeProps {
  text: string,
  speed?: number,
  styles?: object,
  direction?: string,
  spacing?: number
  size?: number,
  flip?: boolean,
  orientation?: string,
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
  flip,
  orientation = 'horizontal',
}): React.ReactElement => {

  const [height, setHeight] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const windowSize = useWindowSize()
  const reactRef = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.parentNode.getBoundingClientRect().height);
      setWidth(node.parentNode.getBoundingClientRect().width);
    }
  }, [windowSize]);

  const repeatText: number = (orientation === 'vertical' ? height : width) / (spacing + text.length) / (size * 2)
  const textWithSpaces: string = `${text}${' '.repeat(spacing)}`.repeat(repeatText);
  const setDirection: string = direction === 'right'
    ? 'reverse'
    : 'left'
  const setRotation: string = orientation === 'vertical'
    ? 'rotate(-90deg)'
    : 'rotate(0deg)'
  const maxSpeed: number = 10
  const setSpeed: number = (orientation === 'vertical' ? height : width) / speed / maxSpeed
  const setWrapperTransform: string = orientation === 'vertical' ? 'translateX(-100%)' : 'translateX(-0)'
  const setTransformOrigin: string = orientation === 'vertical'
    ? 'right top'
    : 'top left'
  const setItemWidth = orientation === 'vertical' ? height : width
  const setItemHeight = orientation === 'vertical' ? width : height
  const scopedClassName: string = React.useMemo(() => Math.random().toString(36).substring(7), []);
  return (
    <div ref={reactRef}>
      <style>
        {`
          @keyframes rm-animation__${scopedClassName} {
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }
          .rm-wrapper__${scopedClassName} {
            display: flex;
            width: ${setItemWidth}px;
            height: ${setItemHeight}px;
            transform: ${setWrapperTransform};
          }
          .rm-container__${scopedClassName} {
            display: flex;
            flex-flow: row nowrap;
            overflow: hidden;
            transform-origin: ${setTransformOrigin};
            transform: ${setRotation};
          }
          .rm-text__${scopedClassName} {
            color: #000;
            align-self: center;
            animation: rm-animation__${scopedClassName};
            animation-direction: ${setDirection};
            animation-duration: ${setSpeed}s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            font-size: ${size}rem;
            text-rendering: optimizeLegibility;
            transform: translateZ(0);
            white-space: pre;
          }
        `}
      </style>
      <div className={`react-marquee__wrapper rm-wrapper__${scopedClassName}`}>
        <div className={`react-marquee__container rm-container__${scopedClassName}`}>
          <div className={`react-marquee__text rm-text__${scopedClassName}`} style={{ ...styles }}>{textWithSpaces}</div>
          <div className={`react-marquee__text rm-text__${scopedClassName}`} style={{ ...styles }}>{textWithSpaces}</div>
        </div>
      </div>
    </div>
  )
}

export { useWindowSize }
export default Marquee
