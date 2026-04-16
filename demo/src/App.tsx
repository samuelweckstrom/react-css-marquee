import { useState } from 'react';
import { Marquee } from 'react-css-marquee';
import './styles.css';

const ITEMS = [
  { emoji: '🎨', color: '#ff6b6b' },
  { emoji: '🚀', color: '#feca57' },
  { emoji: '✨', color: '#48dbfb' },
  { emoji: '🎵', color: '#ff9ff3' },
  { emoji: '🌈', color: '#54a0ff' },
  { emoji: '⚡', color: '#5f27cd' },
  { emoji: '🎯', color: '#01a3a4' },
  { emoji: '💎', color: '#f368e0' },
  { emoji: '🔥', color: '#ff6348' },
  { emoji: '🌟', color: '#7bed9f' },
];

function ItemCard({ emoji, color }: { emoji: string; color: string }) {
  return (
    <div className="item-card" style={{ background: color }}>
      <span>{emoji}</span>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle ${checked ? 'toggle-on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle-thumb" />
      </button>
    </label>
  );
}

export function App() {
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  );
  const [speed, setSpeed] = useState(10);
  const [isPaused, setIsPaused] = useState(false);
  const [isPausedOnHover, setIsPausedOnHover] = useState(false);
  const [isPausedOnClick, setIsPausedOnClick] = useState(false);
  const [isPausedOnMouseDown, setIsPausedOnMouseDown] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [itemCount, setItemCount] = useState(5);
  const [gap, setGap] = useState(40);
  const [repeat, setRepeat] = useState(true);
  const [gradient, setGradient] = useState(false);
  const [gradientWidth, setGradientWidth] = useState(200);
  const [cycles, setCycles] = useState(0);

  return (
    <div className="app">
      <header className="header">
        <h1>react-css-marquee</h1>
        <p>Lightweight, CSS-powered infinite scrolling marquee for React</p>
        <a
          className="github-link"
          href="https://github.com/samuelweckstrom/react-css-marquee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg height="16" viewBox="0 0 16 16" width="16" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
      </header>

      <main className="main">
        <section
          className={`preview ${direction === 'vertical' ? 'preview-vertical' : ''}`}
        >
          <Marquee
            direction={direction}
            speed={speed}
            isPaused={isPaused}
            isPausedOnHover={isPausedOnHover}
            isPausedOnClick={isPausedOnClick}
            isPausedOnMouseDown={isPausedOnMouseDown}
            draggable={isDraggable}
            reverse={reverse}
            gap={gap}
            repeat={repeat}
            gradient={gradient}
            gradientWidth={gradientWidth}
            onCycleComplete={() => setCycles((c) => c + 1)}
          >
            {ITEMS.slice(0, itemCount).map((item, i) => (
              <ItemCard key={i} emoji={item.emoji} color={item.color} />
            ))}
          </Marquee>
          {cycles > 0 && (
            <span className="cycle-badge">Cycles: {cycles}</span>
          )}
        </section>

        <section className="controls">
          <h2>Controls</h2>

          <div className="control-grid">
            <div className="control-group">
              <label>Direction</label>
              <div className="segmented">
                <button
                  type="button"
                  className={direction === 'horizontal' ? 'active' : ''}
                  onClick={() => setDirection('horizontal')}
                >
                  Horizontal
                </button>
                <button
                  type="button"
                  className={direction === 'vertical' ? 'active' : ''}
                  onClick={() => setDirection('vertical')}
                >
                  Vertical
                </button>
              </div>
            </div>

            <div className="control-group">
              <label>
                Speed <span className="value">{speed}s</span>
              </label>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>
                Items <span className="value">{itemCount}</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>
                Gap <span className="value">{gap}px</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={4}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>
                Gradient width <span className="value">{gradientWidth}px</span>
              </label>
              <input
                type="range"
                min={0}
                max={400}
                step={10}
                value={gradientWidth}
                onChange={(e) => setGradientWidth(Number(e.target.value))}
              />
            </div>

            <div className="control-group toggles-column">
              <Toggle
                checked={isPaused}
                onChange={setIsPaused}
                label="Paused"
              />
              <Toggle
                checked={isPausedOnHover}
                onChange={setIsPausedOnHover}
                label="Pause on Hover"
              />
              <Toggle
                checked={isPausedOnClick}
                onChange={setIsPausedOnClick}
                label="Click to Pause"
              />
              <Toggle
                checked={isPausedOnMouseDown}
                onChange={setIsPausedOnMouseDown}
                label="Hold to Pause"
              />
              <Toggle
                checked={reverse}
                onChange={setReverse}
                label="Reverse"
              />
              <Toggle checked={repeat} onChange={setRepeat} label="Repeat" />
              <Toggle
                checked={isDraggable}
                onChange={setIsDraggable}
                label="Draggable"
              />
              <Toggle
                checked={gradient}
                onChange={setGradient}
                label="Gradient"
              />
            </div>
          </div>
        </section>

        <section className="code-preview">
          <h2>Usage</h2>
          <pre>
            <code>{`<Marquee
  direction="${direction}"
  speed={${speed}}
  gap={${gap}}
  repeat={${repeat}}${gradient ? `\n  gradient\n  gradientWidth={${gradientWidth}}` : ''}${isPaused ? '\n  isPaused' : ''}${isPausedOnHover ? '\n  isPausedOnHover' : ''}${isPausedOnClick ? '\n  isPausedOnClick' : ''}${isPausedOnMouseDown ? '\n  isPausedOnMouseDown' : ''}${isDraggable ? '\n  draggable' : ''}${reverse ? '\n  reverse' : ''}
>
  {children}
</Marquee>`}</code>
          </pre>
        </section>
      </main>
    </div>
  );
}
