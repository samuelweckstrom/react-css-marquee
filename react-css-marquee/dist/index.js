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
var createHash = function () {
    return Math.random()
        .toString(36)
        .substring(7);
};
var useWindowSize = function () {
    var getSize = function () { return ({
        width: window.innerWidth,
        height: window.innerHeight
    }); };
    var _a = react_1["default"].useState(getSize), windowSize = _a[0], setWindowSize = _a[1];
    react_1["default"].useEffect(function () {
        var onResize = function () { return setWindowSize(getSize); };
        window.addEventListener('resize', onResize);
        return function () { return window.removeEventListener('resize', onResize); };
    }, []);
    return windowSize;
};
exports.useWindowSize = useWindowSize;
var Marquee = function (_a) {
    var _b = _a.text, text = _b === void 0 ? 'REACT MARQUEE' : _b, _c = _a.direction, direction = _c === void 0 ? 'left' : _c, _d = _a.spacing, spacing = _d === void 0 ? 4 : _d, _e = _a.size, size = _e === void 0 ? 3 : _e, styles = _a.styles, _f = _a.speed, speed = _f === void 0 ? 5 : _f, _g = _a.namespace, namespace = _g === void 0 ? 'react-marquee' : _g, _h = _a.orientation, orientation = _h === void 0 ? 'horizontal' : _h;
    console.log('<Marquee />', { namespace: namespace });
    var _j = react_1["default"].useState(0), height = _j[0], setHeight = _j[1];
    var _k = react_1["default"].useState(0), width = _k[0], setWidth = _k[1];
    var windowSize = useWindowSize();
    var reactRef = react_1["default"].useCallback(function (node) {
        if (node !== null) {
            setHeight(node.parentNode.getBoundingClientRect().height);
            setWidth(node.parentNode.getBoundingClientRect().width);
        }
    }, [windowSize]);
    var repeatText = (orientation === 'vertical' ? height : width) /
        (spacing + text.length) /
        (size * 2);
    var textWithSpaces = ("" + text + ' '.repeat(spacing)).repeat(repeatText);
    var setDirection = direction === 'right' ? 'reverse' : 'left';
    var setRotation = orientation === 'vertical' ? 'rotate(-90deg)' : 'rotate(0)';
    var maxSpeed = 10;
    var setSpeed = (orientation === 'vertical' ? height : width) / speed / maxSpeed;
    var setWrapperTransform = orientation === 'vertical' ? 'translateX(-100%)' : 'translateX(0)';
    var setTransformOrigin = orientation === 'vertical' ? 'right top' : 'top left';
    var setItemWidth = orientation === 'vertical' ? height : width;
    var setItemHeight = orientation === 'vertical' ? width : height;
    var hash = react_1["default"].useMemo(createHash, []);
    return (react_1["default"].createElement("div", { ref: reactRef },
        react_1["default"].createElement("style", null, "\n          @keyframes " + namespace + "__animation-" + hash + " {\n            100% {\n              transform: translate3d(-100%, 0, 0);\n            }\n          }\n        "),
        react_1["default"].createElement("div", { className: namespace + "__wrapper-" + hash, style: {
                fontSize: '16px',
                width: setItemWidth + 'px',
                height: setItemHeight + 'px',
                transform: setWrapperTransform
            } },
            react_1["default"].createElement("div", { className: namespace + "__container-" + hash, style: {
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitPerspective: '1000',
                    overflow: 'hidden',
                    transformOrigin: setTransformOrigin,
                    transform: setRotation
                } },
                react_1["default"].createElement("div", { className: namespace + "__text-" + hash, style: __assign({ alignSelf: 'center', textRendering: 'optimizeLegibility', transform: 'translateZ(0)', whiteSpace: 'pre', fontSize: size + 'em', animation: namespace + '__animation-' + hash + ' linear' + ' infinite', animationDirection: setDirection, animationDuration: setSpeed + 's' }, styles) }, textWithSpaces),
                react_1["default"].createElement("div", { className: namespace + "__text-" + hash, style: __assign({ alignSelf: 'center', textRendering: 'optimizeLegibility', transform: 'translateZ(0)', whiteSpace: 'pre', fontSize: size + 'em', animation: namespace + '__animation-' + hash + ' linear' + ' infinite', animationDirection: setDirection, animationDuration: setSpeed + 's' }, styles) }, textWithSpaces)))));
};
exports["default"] = Marquee;
//# sourceMappingURL=index.js.map