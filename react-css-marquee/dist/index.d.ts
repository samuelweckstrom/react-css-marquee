export declare const useWindowSize: () => {
    [T: string]: number;
};
declare type MarqueeProps = {
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
declare const Marquee: (props: MarqueeProps) => JSX.Element;
export default Marquee;
