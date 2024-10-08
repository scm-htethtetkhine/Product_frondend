import React from 'react'

function ChildComponent(props) {
  return (
    <div>
      <button onClick={() => props.greetHandler('Hello child')}>Greet Parent</button>
    </div>
  )
}

export default ChildComponent
