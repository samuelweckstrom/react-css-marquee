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
var Marquee = function (_a) {
    var _b = _a.text, text = _b === void 0 ? 'REACT MARQUEE' : _b, _c = _a.direction, direction = _c === void 0 ? 'left' : _c, _d = _a.spacing, spacing = _d === void 0 ? 4 : _d, _e = _a.size, size = _e === void 0 ? 3 : _e, styles = _a.styles, _f = _a.speed, speed = _f === void 0 ? 5 : _f;
    var width = 1000;
    // const { width } = useWindowSize()
    var repeatText = width / (spacing + text.length) / (size * 2);
    var textWithSpaces = ("" + text + ' '.repeat(spacing)).repeat(repeatText);
    var setDirection = direction === 'right' ? 'reverse' : 'left';
    var maxSpeed = 10;
    var setSpeed = width / speed / maxSpeed;
    var scopedClassName = Math.random().toString(36).substring(7);
    return (react_1["default"].createElement("div", { className: "react-marquee__wrapper rm-wrapper-" + scopedClassName },
        react_1["default"].createElement("style", null, "\n          @keyframes rm-animation-" + scopedClassName + " {\n            100% {\n              transform: translate3d(-100%, 0, 0);\n            }\n          }\n          .rm-wrapper-" + scopedClassName + " {\n            display: flex;\n            flex-flow: row nowrap;\n            transform: translateZ(0);\n            width: 100%;\n            height: auto;\n            overflow: hidden;\n          }\n          .rm-text-" + scopedClassName + " {\n            align-self: center;\n            animation: rm-animation-" + scopedClassName + ";\n            animation-direction: " + setDirection + ";\n            animation-duration: " + setSpeed + "s;\n            animation-iteration-count: infinite;\n            animation-timing-function: linear;\n            font-size: " + size + "rem;\n            text-rendering: optimizeLegibility;\n            transform: translateZ(0);\n          }\n          .rm-text-" + scopedClassName + "::before {\n            white-space: pre;\n            content: '" + textWithSpaces + "';\n          }\n        "),
        react_1["default"].createElement("div", { className: "react-marquee__text rm-text-" + scopedClassName, style: __assign({}, styles) }),
        react_1["default"].createElement("div", { className: "react-marquee__text rm-text-" + scopedClassName, style: __assign({}, styles) })));
};
exports["default"] = Marquee;
