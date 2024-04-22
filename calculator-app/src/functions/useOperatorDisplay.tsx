import React from 'react'
import Button from '../components/Button'

export default function useOperatorDisplay(array:string[], eventHandler:(value:string)=>void,currentOperator:string){
  let arrayDisplay: JSX.Element[] = []
  arrayDisplay = array.map(item=>{
    return (
      <Button key = {item} content={item} handleClick = {eventHandler} className={item===currentOperator?"active-grid-item":"grid-item"}/>
    )
  })
  return(arrayDisplay)
}
