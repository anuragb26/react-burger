import React from 'react'
import Classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
  <div className={Classes.BuildControls}>
    <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      type={ctrl.type}
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      disabled={props.disabled[ctrl.type]}
    />)}

    <button
      onClick={props.ordered}
      className={Classes.OrderButton}
      disabled={!props.purchasable}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>

  </div>
)

export default buildControls
