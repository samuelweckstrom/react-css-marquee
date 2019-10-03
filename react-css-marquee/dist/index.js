"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var useWindowSize = function () {
    var getSize = function () { return ({
        width: window.innerWidth,
        height: window.innerHeight
    }); };
    var _a = react_1["default"].useState(getSize), size = _a[0], setSize = _a[1];
    react_1["default"].useEffect(function () {
        var onResize = function () { return setSize(getSize); };
        window.addEventListener('resize', onResize);
        return function () { return window.removeEventListener('resize', onResize); };
    }, []);
    return size;
};
exports.useWindowSize = useWindowSize;
var Marquee = function (_a) {
    var _b = _a.text, text = _b === void 0 ? 'REACT MARQUEE' : _b, _c = _a.direction, direction = _c === void 0 ? 'left' : _c, _d = _a.spacing, spacing = _d === void 0 ? 4 : _d, _e = _a.size, size = _e === void 0 ? 3 : _e, styles = _a.styles, _f = _a.speed, speed = _f === void 0 ? 5 : _f, flip = _a.flip, _g = _a.orientation, orientation = _g === void 0 ? 'horizontal' : _g;
    var _h = react_1["default"].useState(0), height = _h[0], setHeight = _h[1];
    var _j = react_1["default"].useState(0), width = _j[0], setWidth = _j[1];
    var windowSize = useWindowSize();
    var reactRef = react_1["default"].useCallback(function (node) {
        if (node !== null) {
            setHeight(node.parentNode.getBoundingClientRect().height);
            setWidth(node.parentNode.getBoundingClientRect().width);
        }
    }, [windowSize]);
    var repeatText = (orientation === 'vertical' ? height : width) / (spacing + text.length) / (size * 2);
    var textWithSpaces = ("" + text + ' '.repeat(spacing)).repeat(repeatText);
    var setDirection = direction === 'right'
        ? 'reverse'
        : 'left';
    var setRotation = orientation === 'vertical'
        ? 'rotate(-90deg)'
        : 'rotate(0deg)';
    var maxSpeed = 10;
    var setSpeed = (orientation === 'vertical' ? height : width) / speed / maxSpeed;
    var setWrapperTransform = orientation === 'vertical' ? 'translateX(-100%)' : 'translateX(-0)';
    var setTransformOrigin = orientation === 'vertical'
        ? 'right top'
        : 'top left';
    var setItemWidth = orientation === 'vertical' ? height : width;
    var setItemHeight = orientation === 'vertical' ? width : height;
    var scopedClassName = react_1["default"].useMemo(function () { return Math.random().toString(36).substring(7); }, []);
    return (react_1["default"].createElement("div", { ref: reactRef },
        react_1["default"].createElement("style", null, "\n          @keyframes rm-animation__" + scopedClassName + " {\n            100% {\n              transform: translate3d(-100%, 0, 0);\n            }\n          }\n          .rm-wrapper__" + scopedClassName + " {\n            display: flex;\n            width: " + setItemWidth + "px;\n            height: " + setItemHeight + "px;\n            transform: " + setWrapperTransform + ";\n          }\n          .rm-container__" + scopedClassName + " {\n            display: flex;\n            flex-flow: row nowrap;\n            overflow: hidden;\n            transform-origin: " + setTransformOrigin + ";\n            transform: " + setRotation + ";\n          }\n          .rm-text__" + scopedClassName + " {\n            color: #000;\n            align-self: center;\n            animation: rm-animation__" + scopedClassName + ";\n            animation-direction: " + setDirection + ";\n            animation-duration: " + setSpeed + "s;\n            animation-iteration-count: infinite;\n            animation-timing-function: linear;\n            font-size: " + size + "rem;\n            text-rendering: optimizeLegibility;\n            transform: translateZ(0);\n            white-space: pre;\n          }\n        "),
        react_1["default"].createElement("div", { className: "react-marquee__wrapper rm-wrapper__" + scopedClassName },
            react_1["default"].createElement("div", { className: "react-marquee__container rm-container__" + scopedClassName },
                react_1["default"].createElement("div", { className: "react-marquee__text rm-text__" + scopedClassName, style: __assign({}, styles) }, textWithSpaces),
                react_1["default"].createElement("div", { className: "react-marquee__text rm-text__" + scopedClassName, style: __assign({}, styles) }, textWithSpaces)))));
};
exports["default"] = Marquee;
//# sourceMappingURL=index.js.map