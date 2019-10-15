import React from 'react'

import {  Provider } from 'react-redux'
import User from './User'

import store from '../store'

export default function Index() {
  return (
    <Provider store={store}>
      <User />
    </Provider>
  )
}

