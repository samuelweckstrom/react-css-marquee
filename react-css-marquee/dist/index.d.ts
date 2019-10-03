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
}
declare const useWindowSize: () => {
    [T: string]: number;
};
declare const Marquee: React.SFC<MarqueeProps>;
export { useWindowSize };
export default Marquee;
