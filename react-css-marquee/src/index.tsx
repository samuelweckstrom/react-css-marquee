import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number;
  styles?: object;
  direction?: string;
  spacing?: number;
  size?: number;
  flip?: boolean;
  orientation?: string;
  namespace?: string;
}

const createHash = () =>
  Math.random()
    .toString(36)
    .substring(7);

const useWindowSize = (): { [T: string]: number } => {
  const getSize = (): { [T: string]: number } => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [windowSize, setWindowSize] = React.useState(getSize);
  React.useEffect(() => {
    const onResize = () => setWindowSize(getSize);
    window.addEventListener('resize', onResize);
    return (): void => window.removeEventListener('resize', onResize);
  }, []);
  return windowSize;
};

const Marquee: React.SFC<MarqueeProps> = ({
  text = 'REACT MARQUEE',
  direction = 'left',
  spacing = 4,
  size = 3,
  styles,
  speed = 5,
  namespace = 'react-marquee',
  orientation = 'horizontal',
}): React.ReactElement => {
  console.log('<Marquee />', { namespace });
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const windowSize = useWindowSize();
  const reactRef = React.useCallback(
    node => {
      if (node !== null) {
        setHeight(node.parentNode.getBoundingClientRect().height);
        setWidth(node.parentNode.getBoundingClientRect().width);
      }
    },
    [windowSize]
  );

  const repeatText: number =
    (orientation === 'vertical' ? height : width) /
    (spacing + text.length) /
    (size * 2);
  const textWithSpaces: string = `${text}${' '.repeat(spacing)}`.repeat(
    repeatText
  );
  const setDirection: string = direction === 'right' ? 'reverse' : 'left';
  const setRotation: string =
    orientation === 'vertical' ? 'rotate(-90deg)' : 'rotate(0)';
  const maxSpeed: number = 10;
  const setSpeed: number =
    (orientation === 'vertical' ? height : width) / speed / maxSpeed;
  const setWrapperTransform: string =
    orientation === 'vertical' ? 'translateX(-100%)' : 'translateX(0)';
  const setTransformOrigin: string =
    orientation === 'vertical' ? 'right top' : 'top left';
  const setItemWidth = orientation === 'vertical' ? height : width;
  const setItemHeight = orientation === 'vertical' ? width : height;
  const hash: string = React.useMemo(createHash, []);
  return (
    <div ref={reactRef}>
      <style>
        {`
          @keyframes ${namespace}__animation-${hash} {
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }
        `}
      </style>
      <div
        className={`${namespace}__wrapper-${hash}`}
        style={{
          fontSize: '16px',
          width: setItemWidth + 'px',
          height: setItemHeight + 'px',
          transform: setWrapperTransform,
        }}
      >
        <div
          className={`react-marquee__container ${namespace}__container-${hash}`}
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            WebkitBackfaceVisibility: 'hidden',
            WebkitPerspective: '1000',
            overflow: 'hidden',
            transformOrigin: setTransformOrigin,
            transform: setRotation,
          }}
        >
          <div
            className={`react-marquee__text ${namespace}__text-${hash}`}
            style={{
              alignSelf: 'center',
              textRendering: 'optimizeLegibility',
              transform: 'translateZ(0)',
              whiteSpace: 'pre',
              fontSize: size + 'em',
              animation:
                namespace + '__animation-' + hash + ' linear' + ' infinite',
              animationDirection: setDirection,
              animationDuration: setSpeed + 's',
              ...styles,
            }}
          >
            {textWithSpaces}
          </div>
          <div
            className={`react-marquee__text ${namespace}__text-${hash}`}
            style={{
              alignSelf: 'center',
              textRendering: 'optimizeLegibility',
              transform: 'translateZ(0)',
              whiteSpace: 'pre',
              fontSize: size + 'em',
              animation:
                namespace + '__animation-' + hash + ' linear' + ' infinite',
              animationDirection: setDirection,
              animationDuration: setSpeed + 's',
              ...styles,
            }}
          >
            {textWithSpaces}
          </div>
        </div>
      </div>
    </div>
  );
};

export { useWindowSize };
export default Marquee;
