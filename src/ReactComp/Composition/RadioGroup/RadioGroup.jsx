import React from 'react'

export default function RadioGroup({children,name}) {
  return (
    <div>
      {React.Children.map(children, child => {
          return  React.cloneElement(child,{name:name})
      })}
    </div>
  )
}
