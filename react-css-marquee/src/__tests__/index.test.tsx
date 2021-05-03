import React from 'react';
import { shallow } from 'enzyme';
import Marquee, { useWindowSize } from '..';

describe('React CSS Marquee', () => {
  const props = {
    text: 'test-text',
    cssNamespace: 'test',
  };
  const wrapper = shallow(<Marquee {...props} />);

  it('should render without errors', () => {
    expect(wrapper).toBeDefined();
  });

  it('should pass CSS namespace', () => {
    const match = `[className*='${props.cssNamespace}__container-']`;
    const actual = wrapper.find(match).length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should have default styling', () => {
    const actual = wrapper.find('style').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should display text', () => {
    const match = `[className*='${props.cssNamespace}__text-']`;
    const actual = wrapper.find(match).length;
    const expected = 2;
    expect(actual).toEqual(expected);
  });

  it('should generate a unique className for 2x text <div>', () => {
    const match = "[className*='rm-text__']";
    const regex = /rm-text__[a-zA-Z0-9.-]+$/;
    const divs = wrapper.find(match).map((x) => x);
    const actual = divs.every((div) => {
      const className = div.prop('className') || '';
      return regex.test(className);
    });
    const expected = true;
    expect(actual).toEqual(expected);
  });
});

describe('useWindowSize', () => {
  it('should return window size', () => {
    type HookWrapperProps = {
      'data-hook'?: string;
      hook: () => object;
    };
    const HookWrapper = ({ hook }: HookWrapperProps) => {
      const setHook = hook && hook();
      return <div data-hook={setHook} />;
    };
    const wrapper = shallow(<HookWrapper hook={() => useWindowSize()} />);
    const { ['data-hook']: windowSizes } = wrapper
      .find('div')
      .props() as HookWrapperProps;
    const actual = windowSizes;
    const expected = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    expect(actual).toEqual(expected);
  });
});
