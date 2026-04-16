import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties } from 'react';

type MarqueeProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'horizontal' | 'vertical';
    draggable?: boolean;
    repeat?: boolean;
    gap?: number;
    gradient?: boolean;
    gradientWidth?: number | string;
    isPaused?: boolean;
    isPausedOnClick?: boolean;
    isPausedOnHover?: boolean;
    isPausedOnMouseDown?: boolean;
    loop?: number;
    onCycleComplete?: () => void;
    onFinish?: () => void;
    reverse?: boolean;
    speed?: number;
    style?: CSSProperties;
};
declare const Marquee: ({ children, className, delay, direction, draggable, repeat, gap, gradient, gradientWidth, isPaused, isPausedOnClick, isPausedOnHover, isPausedOnMouseDown, loop, onCycleComplete, onFinish, reverse, speed, style: userStyle, }: MarqueeProps) => react_jsx_runtime.JSX.Element;

export { Marquee, type MarqueeProps };
