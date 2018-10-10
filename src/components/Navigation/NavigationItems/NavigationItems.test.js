import React, { Component } from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from '../NavigationItem/NavigationItem'

configure({ adapter: new Adapter() }) // To fake the React Virtual Dom being mounted on actual DOM

describe('<NavigationItems />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })
  it('should render two <NavigationItem /> if not authenticated', () => {
    // const wrapper = shallow(<NavigationItems />);  // expects JSX doesn't deeply render
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render three <NavigationItem /> if authenticated', () => {
    // const wrapper = shallow(<NavigationItems isAuthenticated={true}/>);
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should render logout link only if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
  })
})
