import React from "react"
import Button from "../components/Button"

// a function which takes an array and returns the display with a custon JSX button component
export default function createDisplay(array:string[],eventHandler:(value:string)=>void){
    let arrayDisplay: JSX.Element[] = []
    arrayDisplay = array.map(item=>{
      return (
        <Button key = {item} content={item} handleClick = {eventHandler} className="grid-item"/>
      )
    })
    return(arrayDisplay)
}