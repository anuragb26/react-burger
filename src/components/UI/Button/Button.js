import React from 'react'
import Classes from './Button.css'

const button = (props) => (
  <button onClick={props.clicked}
    disabled={props.disabled}
    className={[Classes.Button, Classes[props.btnType]].join(' ')}
  >
    {props.children}
  </button>
)

export default button
