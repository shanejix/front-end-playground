

import React from 'react'


import WelcomDialog from './WelcomDialog'
import Footer from './Footer'


export default function index() {

  //fixme:footer 必须是表达式
  // let footer = <button onClick={() => alert('hallow dialog')}>click</button>

  return (
    //fixme:footer 必须是表达式
    <WelcomDialog color='green' footer={Footer()} />
  )
}
