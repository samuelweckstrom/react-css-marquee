import * as React from 'react'
import { shallow } from 'enzyme'
import Marquee, { useWindowSize } from '..'
import console = require('console');

describe('<Marquee />', () => {
  const props = {
    text: 'test-text'
  }
  const wrapper = shallow(<Marquee {...props} />)

  it('should render without errors', () => {
    expect(wrapper).toBeDefined()
  })

  it('should contain a .react-marquee__wrapper <div>', () => {
    const actual = wrapper.find('div.react-marquee__wrapper').length
    const expected = 1
    expect(actual).toEqual(expected)
  })

  it('should contain a <style>', () => {
    const actual = wrapper.find('style').length
    const expected = 1
    expect(actual).toEqual(expected)
  })

  it('should contain 2x .react-marquee__text <div>', () => {
    const actual = wrapper.find('div.react-marquee__text').length
    const expected = 2
    expect(actual).toEqual(expected)
  })

  it('should generate a unique className for wrapper <div>', () => {
    const match = "[className*='rm-wrapper__']"
    const regex = /rm-wrapper__[a-zA-Z0-9.-]+$/
    const { className = '' } = wrapper.find(match).props()
    const actual = regex.test(className)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it("should generate a unique className for 2x text <div>", () => {
    const match = "[className*='rm-text__']"
    const regex = /rm-text__[a-zA-Z0-9.-]+$/
    const divs = wrapper.find(match).map(x => x)
    const actual = divs.every(div => {
      const className = div.prop('className') || ''
      return regex.test(className)
    })
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('should pass styles from props to 2x text <div>', () => {
    const border = '10px solid gold'
    wrapper.setProps({
      styles: {
        border,
      },
    })
    const divs = wrapper.find('div.react-marquee__text').map(x => x)
    const actual = divs.every(div => {
      const style = div.prop('style') || ''
      return style && { border }
    })
    const expected = true
    expect(actual).toEqual(expected)
  })
})


interface HookAttributes extends React.AriaAttributes, React.DOMAttributes, React.SFC {
  // extends React's HTMLAttributes
  'data-test': string;
}


describe('useWindowSize', () => {
  it('should return window size', () => {
    interface HookWrapperProps {
      'data-hook'?: string;
      hook: () => object
    }
    const HookWrapper: React.SFC<HookWrapperProps> = ({ hook }): React.ReactElement => {
      const setHook = hook && hook()
      return <div data-hook={setHook} />;
    }
    const wrapper = shallow(<HookWrapper hook={() => useWindowSize()} />)
    const { ['data-hook']: windowSizes } = wrapper.find('div').props() as HookWrapperProps
    const actual = windowSizes
    const expected = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    expect(actual).toEqual(expected)
  })
})
