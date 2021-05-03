import React from 'react';

const createHash = () => `${Math.random().toString(36).substring(7)}`;

export const useWindowSize = (): { [T: string]: number } => {
  const getSize = (): { [T: string]: number } => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [windowSize, setWindowSize] = React.useState(getSize);
  React.useLayoutEffect(() => {
    const onResize = () => setWindowSize(getSize);
    window.addEventListener('resize', onResize);
    return (): void => window.removeEventListener('resize', onResize);
  }, []);
  return windowSize;
};

const DIRECTION = {
  LEFT: 'left',
  REVERSE: 'reverse',
} as const;

const ORIENTATION = {
  RIGHT_TOP: 'right top',
  TOP_LEFT: 'top left',
  LEFT_TOP: 'left top',
} as const;

type MarqueeProps = {
  text: string;
  cssNamespace?: string;
  flip?: boolean;
  hoverStop?: boolean;
  reverse?: boolean;
  size?: number;
  spacing?: number;
  speed?: number;
  vertical?: boolean;
};

const Marquee = (props: MarqueeProps): JSX.Element => {
  const [height, setHeight] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
  const hash: string = React.useMemo(createHash, []);
  const windowSize = useWindowSize();
  const ref = React.useCallback(
    (node) => {
      if (node) {
        const parentHeight = parseInt(
          window.getComputedStyle(node.parentNode).height.slice(0, -2)
        );
        const parentWidth = parseInt(
          window.getComputedStyle(node.parentNode).width.slice(0, -2)
        );
        const size = parseInt(
          window.getComputedStyle(node).fontSize.slice(0, -2)
        );
        setHeight(parentHeight);
        setWidth(parentWidth);
      }
    },
    [windowSize]
  );

  const SPEED: number = props.speed || 5;
  const CSS_NAMESPACE: string = props.cssNamespace || 'react-css-marquee';
  const ANIMATION_DIRECTION: string = props.reverse
    ? DIRECTION.REVERSE
    : DIRECTION.LEFT;
  const ROTATION: string =
    props.vertical && !props.flip
      ? 'rotate(90deg)'
      : props.vertical && props.flip
      ? 'rotate(-90deg)'
      : 'rotate(0deg)';
  const MAX_DURATION: number = 10;
  const ANIMATION_DURATION: number =
    (props.vertical ? height : width) / SPEED / MAX_DURATION;
  const CONTAINER_ALIGN: string =
    props.vertical && !props.flip
      ? 'translateX(5%)'
      : props.vertical && props.flip
      ? `translateX(-${height}px)`
      : 'translateX(0)';
  const TRANSFORM_ORIGIN: string =
    props.vertical && !props.flip
      ? ''
      : props.vertical && props.flip
      ? ORIENTATION.TOP_LEFT
      : '';
  const ITEM_WIDTH: string = props.vertical ? `${height}px` : `${width}px`;
  const ITEM_HEIGHT: string = 'auto';
  const SPACING: number = props.spacing || 4;
  const TEXT = props.text || 'REACT CSS MARQUEE';
  const marqueeText: string = `${TEXT}${' '.repeat(SPACING)}`.repeat(
    (props.vertical ? height : width) / (SPACING + TEXT.length) / 6
  );
  const handleMouseOver = (event: React.MouseEvent): void => {
    if (props.hoverStop) {
      const isMouseEnter = event.type === 'mouseenter';
      setIsMouseOver(isMouseEnter);
    }
  };

  return (
    <>
      <style>
        {`
            @keyframes ${CSS_NAMESPACE}__animation-${hash} {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-100%);
              }
            }

            .${CSS_NAMESPACE}__wrapper-${hash} { 
              box-sizing: border-box;
              user-select: none;
            }

            .${CSS_NAMESPACE}__rotation-${hash} {
              transform: ${ROTATION} ${CONTAINER_ALIGN};
              transform-origin: ${TRANSFORM_ORIGIN};
              will-change: transform;
              pointer-events: none;
            }

            .${CSS_NAMESPACE}__container-${hash} {
              height: ${ITEM_HEIGHT};
              width: ${ITEM_WIDTH};
              display: flex;
              flex-flow: row nowrap;
              backface-visibility: hidden;
              perspective: 1000px;
              overflow: hidden;
              font-size: 16px;
              pointer-events: none;            
            }

            .${CSS_NAMESPACE}__text-${hash} {
              align-self: center;
              text-rendering: optimizeLegibility;
              transform: translateZ(0);
              animation-name: ${CSS_NAMESPACE}__animation-${hash};
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              animation-direction: ${ANIMATION_DIRECTION};
              animation-duration: ${ANIMATION_DURATION}s;
              animation-play-state: ${isMouseOver ? 'paused' : 'initial'};
              white-space: pre;
              will-change: transform;
              pointer-events: none;
            }
          `}
      </style>
      <div
        ref={ref}
        onMouseEnter={handleMouseOver}
        onMouseOut={handleMouseOver}
        className={`${CSS_NAMESPACE}__wrapper-${hash} ${CSS_NAMESPACE}__wrapper`}
      >
        <div className={`${CSS_NAMESPACE}__rotation-${hash}`}>
          <div
            className={`${CSS_NAMESPACE}__container-${hash} ${CSS_NAMESPACE}__container`}
          >
            <div
              className={`${CSS_NAMESPACE}__text-${hash} ${CSS_NAMESPACE}__text`}
            >
              {marqueeText}
            </div>
            <div
              className={`${CSS_NAMESPACE}__text-${hash} ${CSS_NAMESPACE}__text`}
            >
              {marqueeText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;
