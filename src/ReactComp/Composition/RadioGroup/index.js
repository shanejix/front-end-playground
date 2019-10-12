
import React from 'react'
import RadioGroup from './RadioGroup'
import Radio from './Radio'




export default function index() {
  return (
    <RadioGroup name='mvc'>
      <Radio value='react'>react</Radio>
      <Radio value='react-dom'>react-dom</Radio>
      <Radio value='redux'>redux</Radio>
      <Radio value='react-native'>react-native</Radio>
    </RadioGroup>
  )
}
