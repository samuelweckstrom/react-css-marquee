import * as React from 'react';
import { shallow } from 'enzyme';
import Marquee, { useWindowSize } from '..';

describe('<Marquee />', () => {
  const props = {
    text: 'test-text',
    namespace: 'test',
  };
  const wrapper = shallow(<Marquee {...props} />);

  it('should render without errors', () => {
    expect(wrapper).toBeDefined();
  });

  it('should pass namespace from props to className', () => {
    const match = `[className*='${props.namespace}__wrapper-']`;
    const actual = wrapper.find(match).length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should contain a <style>', () => {
    const actual = wrapper.find('style').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should contain 2x text <div>', () => {
    const match = `[className*='${props.namespace}__text-']`;
    const actual = wrapper.find(match).length;
    const expected = 2;
    expect(actual).toEqual(expected);
  });

  it('should generate a unique className for wrapper <div>', () => {
    const match = `[className*='${props.namespace}__wrapper-']`;
    const regex = /([a-z])__wrapper-[a-zA-Z0-9.-]+$/;
    const { className = '' } = wrapper.find(match).props();
    const actual = regex.test(className);
    const expected = true;
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

  it('should pass styles from props to 2x text <div>', () => {
    const border = '10px solid gold';
    wrapper.setProps({
      styles: {
        border,
      },
    });
    const divs = wrapper.find('div.react-marquee__text').map((x) => x);
    const actual = divs.every((div) => {
      const style = div.prop('style') || '';
      return style && { border };
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
