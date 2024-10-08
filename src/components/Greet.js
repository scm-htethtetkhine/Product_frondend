import React from 'react'

//functional component

// function Greet() {
//     return <h1>Hello Vishwas</h1>
// }

const Greet = props => {
  const { name , heroName } = props
  // console.log(props)   
  return (
    <div>
    <h1>Hello { name } and { heroName } </h1>
    {/* { props.children } */}
    </div>
  )
}

export default Greet
