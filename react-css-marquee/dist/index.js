import { useState, useRef, useEffect, useMemo } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/index.tsx
var instanceCounter = 0;
var Marquee = ({
  children,
  className,
  delay = 0,
  direction = "horizontal",
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
  style: userStyle
}) => {
  const [uid] = useState(() => `rcm${++instanceCounter}`);
  const horiz = direction === "horizontal";
  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const trackRef = useRef(null);
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
          const s = horiz ? entry.contentRect.width : entry.contentRect.height;
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
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPausedOnHover) return;
    const onEnter = (e) => {
      if (e.pointerType !== "touch") return;
      setTouchHoverPaused(true);
    };
    const onLeave = (e) => {
      if (e.pointerType !== "touch") return;
      setTouchHoverPaused(false);
    };
    container.addEventListener("pointerenter", onEnter);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointerenter", onEnter);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [isPausedOnHover]);
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !onCycleComplete && !onFinish) return;
    const onIteration = onCycleComplete ? () => onCycleComplete() : void 0;
    const onEnd = onFinish ? () => onFinish() : void 0;
    if (onIteration) track.addEventListener("animationiteration", onIteration);
    if (onEnd) track.addEventListener("animationend", onEnd);
    return () => {
      if (onIteration)
        track.removeEventListener("animationiteration", onIteration);
      if (onEnd) track.removeEventListener("animationend", onEnd);
    };
  }, [onCycleComplete, onFinish]);
  const totalDistance = repeat ? sizes.group + gap : sizes.container + sizes.group;
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!draggable && !isPausedOnClick) return;
    let dragging = false;
    let startPos = 0;
    let startScrub = 0;
    let wasDragged = false;
    const onPointerDown = (e) => {
      if (!draggable) return;
      dragging = true;
      wasDragged = false;
      startPos = horiz ? e.clientX : e.clientY;
      startScrub = scrubRef.current;
      container.setPointerCapture(e.pointerId);
      setIsDragging(true);
    };
    const onPointerMove = (e) => {
      if (!dragging || totalDistance <= 0) return;
      const pos = horiz ? e.clientX : e.clientY;
      const delta = pos - startPos;
      if (Math.abs(delta) > 3) wasDragged = true;
      const timeDelta = -delta / totalDistance * speed;
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
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("click", onClick);
    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("click", onClick);
    };
  }, [draggable, isPausedOnClick, horiz, totalDistance, speed, delay]);
  const copies = repeat && sizes.group > 0 ? Math.ceil(sizes.container / sizes.group) + 1 : 1;
  const active = sizes.group > 0 && sizes.container > 0;
  const paused = isPaused || isPausedOnClick && clickPaused || isDragging || touchHoverPaused;
  const css = useMemo(() => {
    let s;
    if (repeat) {
      const dist = sizes.group + gap;
      const dx = horiz ? `-${dist}px` : "0";
      const dy = horiz ? "0" : `-${dist}px`;
      s = `@keyframes ${uid}{to{transform:translate(${dx},${dy})}}`;
    } else {
      const fromVal = `${sizes.container}px`;
      const toVal = `-${sizes.group}px`;
      const fromX = horiz ? fromVal : "0";
      const fromY = horiz ? "0" : fromVal;
      const toX = horiz ? toVal : "0";
      const toY = horiz ? "0" : toVal;
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
  const gwPx = typeof gradientWidth === "number" ? `${gradientWidth}px` : gradientWidth;
  const maskDir = horiz ? "to right" : "to bottom";
  const mask = gradient ? `linear-gradient(${maskDir}, transparent, black ${gwPx}, black calc(100% - ${gwPx}), transparent)` : void 0;
  const animDelay = delay - scrubRef.current;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      "data-rcm": uid,
      className,
      style: {
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...mask ? { maskImage: mask, WebkitMaskImage: mask } : void 0,
        ...draggable ? {
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          // Allow scrolling in the perpendicular axis so the page
          // remains scrollable when the marquee is draggable.
          touchAction: horiz ? "pan-y" : "pan-x"
        } : isPausedOnClick ? { cursor: "pointer" } : void 0,
        ...userStyle
      },
      children: [
        /* @__PURE__ */ jsx("style", { children: css }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: trackRef,
            "data-rcm-t": "",
            style: {
              display: "flex",
              flexDirection: horiz ? "row" : "column",
              alignItems: "center",
              width: horiz ? "max-content" : "100%",
              height: horiz ? "100%" : "max-content",
              gap: gapStyle,
              animation: active ? `${uid} ${speed}s linear ${loop === 0 ? "infinite" : loop}` : "none",
              animationPlayState: paused ? "paused" : "running",
              animationDirection: reverse ? "reverse" : "normal",
              animationDelay: animDelay ? `${animDelay}s` : void 0,
              willChange: active ? "transform" : void 0
            },
            children: Array.from({ length: copies }, (_, i) => /* @__PURE__ */ jsx(
              "div",
              {
                ref: i === 0 ? groupRef : void 0,
                "aria-hidden": i > 0 || void 0,
                style: {
                  display: "flex",
                  flexDirection: horiz ? "row" : "column",
                  alignItems: "center",
                  flexShrink: 0,
                  gap: gapStyle
                },
                children
              },
              i
            ))
          }
        )
      ]
    }
  );
};

export { Marquee };
