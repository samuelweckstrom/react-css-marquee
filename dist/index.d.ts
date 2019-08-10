import React from 'react';
interface MarqueeProps {
    text: string;
    speed?: number;
    styles?: object;
    direction?: string;
    spacing?: number;
    size?: number;
}
declare const Marquee: React.SFC<MarqueeProps>;
export default Marquee;
