import React from 'react'

import { Provider } from 'react-redux'
import store from '../store'

import Count from './Count'

export default function Index() {
  return (
    <Provider store={store}>
      <Count />
    </Provider>
  )
}
