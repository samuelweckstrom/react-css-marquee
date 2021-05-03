"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useWindowSize = void 0;
var react_1 = __importDefault(require("react"));
var createHash = function () { return "" + Math.random().toString(36).substring(7); };
exports.useWindowSize = function () {
    var getSize = function () { return ({
        width: window.innerWidth,
        height: window.innerHeight
    }); };
    var _a = react_1["default"].useState(getSize), windowSize = _a[0], setWindowSize = _a[1];
    react_1["default"].useLayoutEffect(function () {
        var onResize = function () { return setWindowSize(getSize); };
        window.addEventListener('resize', onResize);
        return function () { return window.removeEventListener('resize', onResize); };
    }, []);
    return windowSize;
};
var DIRECTION = {
    LEFT: 'left',
    REVERSE: 'reverse'
};
var ORIENTATION = {
    RIGHT_TOP: 'right top',
    TOP_LEFT: 'top left',
    LEFT_TOP: 'left top'
};
var Marquee = function (props) {
    var _a = react_1["default"].useState(0), height = _a[0], setHeight = _a[1];
    var _b = react_1["default"].useState(0), width = _b[0], setWidth = _b[1];
    var _c = react_1["default"].useState(false), isMouseOver = _c[0], setIsMouseOver = _c[1];
    var hash = react_1["default"].useMemo(createHash, []);
    var windowSize = exports.useWindowSize();
    var ref = react_1["default"].useCallback(function (node) {
        if (node) {
            var parentHeight = parseInt(window.getComputedStyle(node.parentNode).height.slice(0, -2));
            var parentWidth = parseInt(window.getComputedStyle(node.parentNode).width.slice(0, -2));
            var size = parseInt(window.getComputedStyle(node).fontSize.slice(0, -2));
            setHeight(parentHeight);
            setWidth(parentWidth);
        }
    }, [windowSize]);
    var SPEED = props.speed || 5;
    var CSS_NAMESPACE = props.cssNamespace || 'react-css-marquee';
    var ANIMATION_DIRECTION = props.reverse
        ? DIRECTION.REVERSE
        : DIRECTION.LEFT;
    var ROTATION = props.vertical && !props.flip
        ? 'rotate(90deg)'
        : props.vertical && props.flip
            ? 'rotate(-90deg)'
            : 'rotate(0deg)';
    var MAX_DURATION = 10;
    var ANIMATION_DURATION = (props.vertical ? height : width) / SPEED / MAX_DURATION;
    var CONTAINER_ALIGN = props.vertical && !props.flip
        ? 'translateX(5%)'
        : props.vertical && props.flip
            ? "translateX(-" + height + "px)"
            : 'translateX(0)';
    var TRANSFORM_ORIGIN = props.vertical && !props.flip
        ? ''
        : props.vertical && props.flip
            ? ORIENTATION.TOP_LEFT
            : '';
    var ITEM_WIDTH = props.vertical ? height + "px" : width + "px";
    var ITEM_HEIGHT = 'auto';
    var SPACING = props.spacing || 4;
    var TEXT = props.text || 'REACT CSS MARQUEE';
    var marqueeText = ("" + TEXT + ' '.repeat(SPACING)).repeat((props.vertical ? height : width) / (SPACING + TEXT.length) / 6);
    var handleMouseOver = function (event) {
        if (props.hoverStop) {
            var isMouseEnter = event.type === 'mouseenter';
            setIsMouseOver(isMouseEnter);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("style", null, "\n            @keyframes " + CSS_NAMESPACE + "__animation-" + hash + " {\n              0% {\n                transform: translateX(0%);\n              }\n              100% {\n                transform: translateX(-100%);\n              }\n            }\n\n            ." + CSS_NAMESPACE + "__wrapper-" + hash + " { \n              box-sizing: border-box;\n              user-select: none;\n            }\n\n            ." + CSS_NAMESPACE + "__rotation-" + hash + " {\n              transform: " + ROTATION + " " + CONTAINER_ALIGN + ";\n              transform-origin: " + TRANSFORM_ORIGIN + ";\n              will-change: transform;\n              pointer-events: none;\n            }\n\n            ." + CSS_NAMESPACE + "__container-" + hash + " {\n              height: " + ITEM_HEIGHT + ";\n              width: " + ITEM_WIDTH + ";\n              display: flex;\n              flex-flow: row nowrap;\n              backface-visibility: hidden;\n              perspective: 1000px;\n              overflow: hidden;\n              font-size: 16px;\n              pointer-events: none;            \n            }\n\n            ." + CSS_NAMESPACE + "__text-" + hash + " {\n              align-self: center;\n              text-rendering: optimizeLegibility;\n              transform: translateZ(0);\n              animation-name: " + CSS_NAMESPACE + "__animation-" + hash + ";\n              animation-timing-function: linear;\n              animation-iteration-count: infinite;\n              animation-direction: " + ANIMATION_DIRECTION + ";\n              animation-duration: " + ANIMATION_DURATION + "s;\n              animation-play-state: " + (isMouseOver ? 'paused' : 'initial') + ";\n              white-space: pre;\n              will-change: transform;\n              pointer-events: none;\n            }\n          "),
        react_1["default"].createElement("div", { ref: ref, onMouseEnter: handleMouseOver, onMouseOut: handleMouseOver, className: CSS_NAMESPACE + "__wrapper-" + hash + " " + CSS_NAMESPACE + "__wrapper" },
            react_1["default"].createElement("div", { className: CSS_NAMESPACE + "__rotation-" + hash },
                react_1["default"].createElement("div", { className: CSS_NAMESPACE + "__container-" + hash + " " + CSS_NAMESPACE + "__container" },
                    react_1["default"].createElement("div", { className: CSS_NAMESPACE + "__text-" + hash + " " + CSS_NAMESPACE + "__text" }, marqueeText),
                    react_1["default"].createElement("div", { className: CSS_NAMESPACE + "__text-" + hash + " " + CSS_NAMESPACE + "__text" }, marqueeText))))));
};
exports["default"] = Marquee;
//# sourceMappingURL=index.js.map