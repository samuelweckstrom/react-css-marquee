import React from 'react';

type MarqueeProps = {
  text: string;
  speed?: number;
  styles?: object;
  direction?: string;
  spacing?: number;
  size?: number;
  flip?: boolean;
  orientation?: string;
  namespace?: string;
  disableDefaultStyles?: boolean;
};

const createHash = () => Math.random().toString(36).substring(7);

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

const Marquee = ({
  text = 'REACT MARQUEE',
  direction = 'left',
  spacing = 4,
  size = 3,
  styles,
  speed = 5,
  disableDefaultStyles = false,
  namespace = 'react-marquee',
  orientation = 'horizontal',
}: MarqueeProps): JSX.Element => {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const windowSize = useWindowSize();
  const ref = React.useCallback(
    (node) => {
      if (node) {
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
    <div ref={ref}>
      <style>
        {`
          @keyframes ${namespace}__animation {
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }
          .${namespace}__wrapper-${hash} {
            font-size: 16px;
            transform: ${setWrapperTransform};
          }
          .${namespace}__text-${hash} {
              align-self: center;
              text-rendering: optimizeLegibility;
              transform: translateZ(0);
              animation: ${namespace}__animation linear infinite;
              animation-direction: ${setDirection};
              animation-duration: ${setSpeed}s;
          }
        `}
      </style>
      {!disableDefaultStyles && (
        <style>
          {`
            .${namespace}__wrapper {
              width: ${setItemWidth}px;
              height: ${setItemHeight}px;
            }
            .${namespace}__text-${hash} {
              font-size: ${size}em;
            }
          `}
        </style>
      )}
      <div className={`${namespace}__wrapper ${namespace}__wrapper-${hash}`}>
        <div
          className={`${namespace}__container`}
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
            className={`${namespace}__text ${namespace}__text-${hash}`}
            style={{
              whiteSpace: 'pre',
              ...styles,
            }}
          >
            {textWithSpaces}
          </div>
          <div
            className={`${namespace}__text ${namespace}__text-${hash}`}
            style={{
              whiteSpace: 'pre',
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
