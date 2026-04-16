import React from 'react';
import { render, screen } from '@testing-library/react';
import { Marquee } from '..';

beforeAll(() => {
  (window.ResizeObserver as unknown) = class {
    cb: (entries: unknown[]) => void;
    constructor(cb: (entries: unknown[]) => void) {
      this.cb = cb;
    }
    observe(target: Element) {
      this.cb([
        {
          target,
          contentRect: { width: 800, height: 400 },
        },
      ]);
    }
    unobserve() {}
    disconnect() {}
  };
});

describe('Marquee', () => {
  it('renders children', () => {
    render(
      <Marquee>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Marquee>
    );
    expect(screen.getAllByText('Item 1').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Item 2').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Item 3').length).toBeGreaterThanOrEqual(1);
  });

  describe('repeat', () => {
    it('does not duplicate items when repeat is false', () => {
      render(
        <Marquee repeat={false}>
          <div>Unique</div>
        </Marquee>
      );
      expect(screen.getAllByText('Unique')).toHaveLength(1);
    });

    it('uses from/to keyframes when repeat is false', () => {
      const { container } = render(
        <Marquee repeat={false}>
          <div>Item</div>
        </Marquee>
      );
      const style = container.querySelector('style');
      expect(style?.textContent).toContain('from{');
      expect(style?.textContent).toContain('to{');
    });

    it('uses only to keyframe when repeat is true', () => {
      const { container } = render(
        <Marquee repeat={true}>
          <div>Item</div>
        </Marquee>
      );
      const style = container.querySelector('style');
      expect(style?.textContent).not.toContain('from{');
      expect(style?.textContent).toContain('to{');
    });

    it('marks duplicate groups as aria-hidden', () => {
      const { container } = render(
        <Marquee repeat={true}>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]')!;
      const groups = Array.from(track.children);
      expect(groups[0].getAttribute('aria-hidden')).toBeNull();
      for (let i = 1; i < groups.length; i++) {
        expect(groups[i].getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  describe('direction', () => {
    it('applies horizontal layout by default', () => {
      const { container } = render(
        <Marquee>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.flexDirection).toBe('row');
    });

    it('applies vertical layout', () => {
      const { container } = render(
        <Marquee direction="vertical">
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.flexDirection).toBe('column');
    });
  });

  describe('pause controls', () => {
    it('pauses animation when isPaused is true', () => {
      const { container } = render(
        <Marquee isPaused>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animationPlayState).toBe('paused');
    });

    it('runs animation when isPaused is false', () => {
      const { container } = render(
        <Marquee isPaused={false}>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animationPlayState).toBe('running');
    });

    it('injects hover pause CSS when isPausedOnHover is true', () => {
      const { container } = render(
        <Marquee isPausedOnHover>
          <div>Item</div>
        </Marquee>
      );
      const style = container.querySelector('style');
      expect(style?.textContent).toContain(':hover');
      expect(style?.textContent).toContain('animation-play-state:paused');
    });

    it('does not inject hover CSS when isPausedOnHover is false', () => {
      const { container } = render(
        <Marquee isPausedOnHover={false}>
          <div>Item</div>
        </Marquee>
      );
      const style = container.querySelector('style');
      expect(style?.textContent).not.toContain(':hover');
    });

    it('injects mouse-down pause CSS when isPausedOnMouseDown is true', () => {
      const { container } = render(
        <Marquee isPausedOnMouseDown>
          <div>Item</div>
        </Marquee>
      );
      const style = container.querySelector('style');
      expect(style?.textContent).toContain(':active');
      expect(style?.textContent).toContain('animation-play-state:paused');
    });
  });

  describe('draggable', () => {
    it('sets grab cursor when draggable', () => {
      const { container } = render(
        <Marquee draggable>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.cursor).toBe('grab');
    });

    it('sets touch-action pan-y for horizontal draggable marquee', () => {
      const { container } = render(
        <Marquee draggable direction="horizontal">
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.touchAction).toBe('pan-y');
    });

    it('sets touch-action pan-x for vertical draggable marquee', () => {
      const { container } = render(
        <Marquee draggable direction="vertical">
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.touchAction).toBe('pan-x');
    });

    it('disables user-select when draggable', () => {
      const { container } = render(
        <Marquee draggable>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.userSelect).toBe('none');
    });
  });

  describe('reverse', () => {
    it('sets reverse animation direction', () => {
      const { container } = render(
        <Marquee reverse>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animationDirection).toBe('reverse');
    });

    it('sets normal animation direction by default', () => {
      const { container } = render(
        <Marquee>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animationDirection).toBe('normal');
    });
  });

  describe('gradient', () => {
    it('applies mask-image when gradient is true', () => {
      const { container } = render(
        <Marquee gradient>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.maskImage).toContain('linear-gradient');
    });

    it('does not apply mask-image when gradient is false', () => {
      const { container } = render(
        <Marquee gradient={false}>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.maskImage).toBeFalsy();
    });

    it('uses custom gradient width', () => {
      const { container } = render(
        <Marquee gradient gradientWidth={100}>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.maskImage).toContain('100px');
    });

    it('accepts string gradient width', () => {
      const { container } = render(
        <Marquee gradient gradientWidth="10%">
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.maskImage).toContain('10%');
    });
  });

  describe('loop', () => {
    it('sets infinite iteration count by default', () => {
      const { container } = render(
        <Marquee>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animation).toContain('infinite');
    });

    it('sets finite iteration count when loop is specified', () => {
      const { container } = render(
        <Marquee loop={3}>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animation).toContain(' 3');
      expect(track.style.animation).not.toContain('infinite');
    });
  });

  describe('delay', () => {
    it('sets animation-delay when delay is provided', () => {
      const { container } = render(
        <Marquee delay={2}>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animationDelay).toBe('2s');
    });

    it('does not set animation-delay by default', () => {
      const { container } = render(
        <Marquee>
          <div>Item</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.animationDelay).toBeFalsy();
    });
  });

  describe('styling', () => {
    it('applies gap between items', () => {
      const { container } = render(
        <Marquee gap={24}>
          <div>A</div>
          <div>B</div>
        </Marquee>
      );
      const track = container.querySelector('[data-rcm-t]') as HTMLElement;
      expect(track.style.gap).toBe('24px');
    });

    it('passes className to container', () => {
      const { container } = render(
        <Marquee className="my-marquee">
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.classList.contains('my-marquee')).toBe(true);
    });

    it('passes style to container', () => {
      const { container } = render(
        <Marquee style={{ borderRadius: '8px' }}>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.borderRadius).toBe('8px');
    });

    it('hides overflow on the container', () => {
      const { container } = render(
        <Marquee>
          <div>Item</div>
        </Marquee>
      );
      const marquee = container.firstChild as HTMLElement;
      expect(marquee.style.overflow).toBe('hidden');
    });
  });

  describe('accessibility', () => {
    it('includes prefers-reduced-motion media query', () => {
      const { container } = render(
        <Marquee>
          <div>Item</div>
        </Marquee>
      );
      const style = container.querySelector('style');
      expect(style?.textContent).toContain('prefers-reduced-motion');
    });
  });
});
