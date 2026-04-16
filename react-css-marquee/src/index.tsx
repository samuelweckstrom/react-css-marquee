import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

export type MarqueeProps = {
  /** Content to scroll. Can be any React nodes — images, cards, text, etc. */
  children: ReactNode;
  /** CSS class applied to the outer container element. */
  className?: string;
  /** Seconds to wait before the animation begins. Default: `0`. */
  delay?: number;
  /**
   * Axis along which content scrolls.
   * - `'horizontal'` — scrolls left (or right when `reverse` is true). Default.
   * - `'vertical'`   — scrolls up   (or down  when `reverse` is true).
   *   For vertical marquees give the container a fixed height via `style`.
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Allow users to click-and-drag to scrub through the marquee.
   * The animation resumes from the dragged position on release.
   * Default: `false`.
   */
  draggable?: boolean;
  /**
   * Duplicate children enough times to fill the viewport, creating a
   * seamless infinite loop. Set to `false` for a "ticker" effect where
   * items scroll across the screen individually without repeating.
   * Default: `true`.
   */
  repeat?: boolean;
  /** Gap between items (and between repeated copies) in pixels. Default: `40`. */
  gap?: number;
  /**
   * Fade the leading and trailing edges of the marquee using a CSS
   * `mask-image` gradient. Works over any background colour without
   * needing to know it. Default: `false`.
   */
  gradient?: boolean;
  /**
   * Width of the gradient fade zone on each edge.
   * Pass a `number` for pixels or a CSS string (e.g. `'10%'`).
   * Only applies when `gradient` is `true`. Default: `200` (px).
   */
  gradientWidth?: number | string;
  /** Programmatically pause the animation. Default: `false`. */
  isPaused?: boolean;
  /** Clicking anywhere on the marquee toggles between paused and running. Default: `false`. */
  isPausedOnClick?: boolean;
  /** Pause while the pointer hovers over the marquee. Works on touch via pointer events. Default: `false`. */
  isPausedOnHover?: boolean;
  /** Pause while the mouse button (or touch) is held down on the marquee. Default: `false`. */
  isPausedOnMouseDown?: boolean;
  /**
   * Number of full animation cycles to play before stopping.
   * `0` = infinite (default). Pair with `onFinish` to react when it ends.
   */
  loop?: number;
  /** Called each time the marquee completes one full cycle. */
  onCycleComplete?: () => void;
  /** Called once when a finite (`loop > 0`) animation finishes all its cycles. */
  onFinish?: () => void;
  /**
   * Reverse the scroll direction.
   * Horizontal: scrolls right instead of left.
   * Vertical: scrolls down instead of up.
   * Default: `false`.
   */
  reverse?: boolean;
  /**
   * Controls scroll speed as an animation duration in seconds.
   * A **higher** number means **slower** movement (it's a CSS `animation-duration`).
   * Default: `10` (one full cycle takes 10 seconds).
   */
  speed?: number;
  /** Inline styles applied to the outer container element. */
  style?: CSSProperties;
};

let instanceCounter = 0;

/**
 * A lightweight, zero-dependency React marquee powered by CSS animations.
 *
 * Renders children in a continuously scrolling track. By default children are
 * duplicated to fill the viewport for a seamless infinite loop. Set
 * `repeat={false}` for a "breaking news" ticker where each item crosses once.
 *
 * @example Basic horizontal logo strip
 * ```tsx
 * <Marquee gap={32} speed={15}>
 *   <img src="logo-a.svg" />
 *   <img src="logo-b.svg" />
 *   <img src="logo-c.svg" />
 * </Marquee>
 * ```
 *
 * @example Vertical feed with gradient edges, paused on hover
 * ```tsx
 * <Marquee direction="vertical" gradient gradientWidth={80} isPausedOnHover style={{ height: 400 }}>
 *   <Card title="Item 1" />
 *   <Card title="Item 2" />
 * </Marquee>
 * ```
 *
 * @example Ticker — items scroll across once, no repeat
 * ```tsx
 * <Marquee repeat={false} speed={8}>
 *   <h2>Breaking: major update shipped</h2>
 * </Marquee>
 * ```
 *
 * @example Finite loop with completion callback
 * ```tsx
 * <Marquee loop={3} onFinish={() => setDone(true)}>
 *   <span>Plays exactly three times</span>
 * </Marquee>
 * ```
 *
 * @example Draggable photo strip
 * ```tsx
 * <Marquee draggable gap={16}>
 *   <img src="photo1.jpg" />
 *   <img src="photo2.jpg" />
 * </Marquee>
 * ```
 */
export const Marquee = ({
  children,
  className,
  delay = 0,
  direction = 'horizontal',
  draggable = false,
  repeat = true,
  gap = 40,
  gradient = false,
  gradientWidth = 200,
  isPaused = false,
  isPausedOnClick = false,
  isPausedOnHover = false,
  isPausedOnMouseDown = false,
  loop = 0,
  onCycleComplete,
  onFinish,
  reverse = false,
  speed = 10,
  style: userStyle,
}: MarqueeProps) => {
  const [uid] = useState(() => `rcm${++instanceCounter}`);
  const horiz = direction === 'horizontal';
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState({ container: 0, group: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [clickPaused, setClickPaused] = useState(false);
  const [touchHoverPaused, setTouchHoverPaused] = useState(false);
  const scrubRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group) return;

    const ro = new ResizeObserver((entries) => {
      setSizes((prev) => {
        let next = prev;
        for (const entry of entries) {
          const s = horiz
            ? entry.contentRect.width
            : entry.contentRect.height;
          if (entry.target === container) next = { ...next, container: s };
          if (entry.target === group) next = { ...next, group: s };
        }
        return next;
      });
    });
    ro.observe(container);
    ro.observe(group);
    return () => ro.disconnect();
  }, [horiz]);

  // On touch devices :hover is unreliable, so mirror isPausedOnHover via
  // pointer events (pointerenter/pointerleave fire for both mouse and touch).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPausedOnHover) return;

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      setTouchHoverPaused(true);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      setTouchHoverPaused(false);
    };

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);
    return () => {
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, [isPausedOnHover]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || (!onCycleComplete && !onFinish)) return;

    const onIteration = onCycleComplete
      ? () => onCycleComplete()
      : undefined;
    const onEnd = onFinish ? () => onFinish() : undefined;

    if (onIteration) track.addEventListener('animationiteration', onIteration);
    if (onEnd) track.addEventListener('animationend', onEnd);
    return () => {
      if (onIteration)
        track.removeEventListener('animationiteration', onIteration);
      if (onEnd) track.removeEventListener('animationend', onEnd);
    };
  }, [onCycleComplete, onFinish]);

  const totalDistance = repeat
    ? sizes.group + gap
    : sizes.container + sizes.group;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!draggable && !isPausedOnClick) return;

    let dragging = false;
    let startPos = 0;
    let startScrub = 0;
    let wasDragged = false;

    const onPointerDown = (e: PointerEvent) => {
      if (!draggable) return;
      dragging = true;
      wasDragged = false;
      startPos = horiz ? e.clientX : e.clientY;
      startScrub = scrubRef.current;
      container.setPointerCapture(e.pointerId);
      setIsDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || totalDistance <= 0) return;
      const pos = horiz ? e.clientX : e.clientY;
      const delta = pos - startPos;
      if (Math.abs(delta) > 3) wasDragged = true;
      const timeDelta = (-delta / totalDistance) * speed;
      scrubRef.current = startScrub + timeDelta;
      if (trackRef.current) {
        trackRef.current.style.animationDelay = `${delay - scrubRef.current}s`;
      }
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      setIsDragging(false);
    };

    const onClick = () => {
      if (wasDragged) {
        wasDragged = false;
        return;
      }
      if (isPausedOnClick) setClickPaused((p) => !p);
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('click', onClick);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('click', onClick);
    };
  }, [draggable, isPausedOnClick, horiz, totalDistance, speed, delay]);

  const copies =
    repeat && sizes.group > 0
      ? Math.ceil(sizes.container / sizes.group) + 1
      : 1;
  const active = sizes.group > 0 && sizes.container > 0;
  const paused = isPaused || (isPausedOnClick && clickPaused) || isDragging || touchHoverPaused;

  const css = useMemo(() => {
    let s: string;
    if (repeat) {
      const dist = sizes.group + gap;
      const dx = horiz ? `-${dist}px` : '0';
      const dy = horiz ? '0' : `-${dist}px`;
      s = `@keyframes ${uid}{to{transform:translate(${dx},${dy})}}`;
    } else {
      const fromVal = `${sizes.container}px`;
      const toVal = `-${sizes.group}px`;
      const fromX = horiz ? fromVal : '0';
      const fromY = horiz ? '0' : fromVal;
      const toX = horiz ? toVal : '0';
      const toY = horiz ? '0' : toVal;
      s = `@keyframes ${uid}{from{transform:translate(${fromX},${fromY})}to{transform:translate(${toX},${toY})}}`;
    }
    if (isPausedOnHover) {
      s += `[data-rcm="${uid}"]:hover [data-rcm-t]{animation-play-state:paused!important}`;
    }
    if (isPausedOnMouseDown) {
      s += `[data-rcm="${uid}"]:active [data-rcm-t]{animation-play-state:paused!important}`;
    }
    s += `@media(prefers-reduced-motion:reduce){[data-rcm="${uid}"] [data-rcm-t]{animation-play-state:paused!important}}`;
    return s;
  }, [uid, isPausedOnHover, isPausedOnMouseDown, sizes, gap, horiz, repeat]);

  const gapStyle = `${gap}px`;

  const gwPx =
    typeof gradientWidth === 'number' ? `${gradientWidth}px` : gradientWidth;
  const maskDir = horiz ? 'to right' : 'to bottom';
  const mask = gradient
    ? `linear-gradient(${maskDir}, transparent, black ${gwPx}, black calc(100% - ${gwPx}), transparent)`
    : undefined;

  const animDelay = delay - scrubRef.current;

  return (
    <div
      ref={containerRef}
      data-rcm={uid}
      className={className}
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined),
        ...(draggable
          ? {
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none' as const,
              // Allow scrolling in the perpendicular axis so the page
              // remains scrollable when the marquee is draggable.
              touchAction: (horiz ? 'pan-y' : 'pan-x') as CSSProperties['touchAction'],
            }
          : isPausedOnClick
            ? { cursor: 'pointer' }
            : undefined),
        ...userStyle,
      }}
    >
      <style>{css}</style>
      <div
        ref={trackRef}
        data-rcm-t=""
        style={
          {
            display: 'flex',
            flexDirection: horiz ? 'row' : 'column',
            alignItems: 'center',
            width: horiz ? 'max-content' : '100%',
            height: horiz ? '100%' : 'max-content',
            gap: gapStyle,
            animation: active
              ? `${uid} ${speed}s linear ${loop === 0 ? 'infinite' : loop}`
              : 'none',
            animationPlayState: paused ? 'paused' : 'running',
            animationDirection: reverse ? 'reverse' : 'normal',
            animationDelay: animDelay ? `${animDelay}s` : undefined,
            willChange: active ? 'transform' : undefined,
          } as CSSProperties
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? groupRef : undefined}
            aria-hidden={i > 0 || undefined}
            style={{
              display: 'flex',
              flexDirection: horiz ? 'row' : 'column',
              alignItems: 'center',
              flexShrink: 0,
              gap: gapStyle,
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};
