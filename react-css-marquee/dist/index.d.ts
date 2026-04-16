import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties } from 'react';

type MarqueeProps = {
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
declare const Marquee: ({ children, className, delay, direction, draggable, repeat, gap, gradient, gradientWidth, isPaused, isPausedOnClick, isPausedOnHover, isPausedOnMouseDown, loop, onCycleComplete, onFinish, reverse, speed, style: userStyle, }: MarqueeProps) => react_jsx_runtime.JSX.Element;

export { Marquee, type MarqueeProps };
