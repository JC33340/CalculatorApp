import React from 'react';
import './App.css';
import createDisplay from './functions/createDisplay';
import useOperatorDisplay from './functions/useOperatorDisplay';


function App() {
  //display state
  const [currentDisplay,setCurrentDisplay] = React.useState<string>("")

  //equation state
  const [equation,setEquation] = React.useState<string[]>([])
  
  //reset state e.g. when an operator is pressed
  const [reset,setReset] = React.useState<boolean>(true)

  // keep operators in state
  const [currentOperator,setCurrentOperator] = React.useState<string>("")

  //display numberpad items
  const numpadItems:(string)[] = ["1","2","3","4","5","6","7","8","9","0","."]
  let numberpad:JSX.Element[] = createDisplay(numpadItems,handleEvent)

  //operators
  const operators:string[] = ["+","-","/","*"]
  let operatorDisplay: JSX.Element[]|undefined = useOperatorDisplay(operators,handleEvent,currentOperator)

  // equals button
  const equals:string[] = ["="]
  let equalsDisplay:JSX.Element[] = createDisplay(equals,handleEvent)

  //clear button
  const clear:string[] = ["CC"]
  let clearDisplay:JSX.Element[] = createDisplay(clear,handleEvent)

  //handling the clicking of buttons on UI and events in general
  function handleEvent(value:string): void{
    console.log(value)
    if(numpadItems.includes(value)){
      //handle number input
      numberInput(value)
    }else if (value === "Backspace"){
      //handle backspace input
      setCurrentDisplay(prevState=>prevState.slice(0,-1))
    } else if(operators.includes(value)){
      if(equation.length>0){
        //changing operator
        if (reset){
          setEquation(prevState=>{
            const newArr:string[] = prevState.map((item,i)=>{
              if(i === 1){
                return value
              }else{
                return item
              }
            })
            return newArr
         })
        } else {
          //adding to current calculation
          setEquation(prevState=>{
            return[
              ...prevState,
              currentDisplay
            ]
          })
        }
      }else{
        setEquation([currentDisplay?currentDisplay:"0",value]);
        setReset(true);
      }
      setCurrentOperator(value)
    } else if (value === "="||value === "Enter"){
      //handle equals input
      if (!reset && equation.length!=0){
        setEquation(prevState=>{
          return[
            ...prevState,
            currentDisplay
          ]
        })
        setCurrentOperator("=")
      }
    } else if (value === "CC"){
      //handle clear function
      setEquation([])
      setReset(false)
      setCurrentDisplay("")
    }
  }
  console.log(currentOperator,equation)

  //handling typing of keys, by adding an event listener
  React.useEffect(()=>{
    document.querySelector("body")?.addEventListener('keyup',handleType)
    return()=>{
      document.querySelector("body")?.removeEventListener('keyup',handleType)
    }
  },[currentDisplay,equation])

  function handleType(event:any): void{
    handleEvent(event.key)
  }

  //handling number inputs
  function numberInput(value:string):void{
    if(reset){
      setCurrentDisplay(value)
      setReset(false)
    }else{
      setCurrentDisplay(prevState=>{
        if(prevState.includes(".")&&value==="."){
          return prevState
        } else {
          return prevState+value
        }
      })
    }
    
  }

  //calculate the sum in the equation array using a use effect
  React.useEffect(()=>{
    if(equation.length===3){
      const num1:number = parseFloat(equation[0])
      const num2:number = parseFloat(equation[2])
      const operator:string = equation[1]
      let sum:number=0
      if (operator === "+"){
        sum = num1+num2
      } else if (operator === "-"){
        sum = num1-num2
      } else if(operator === "/"){
        sum = num1/num2
      }else if(operator === "*"){
        sum=num1*num2
      }
      setCurrentDisplay(sum.toString())
      setEquation([])
      setReset(true)
    }
  },[equation])

  return (
    <div className='app'>
      <div className='display-div'>
        {currentDisplay}
      </div>
      <div className='input-pad'>
        <div className='number-pad'>
              {numberpad}
              {clearDisplay}
        </div>
        <div className="operator-pad">
          {operatorDisplay}
        </div>
      </div>
      <div className='equals-div'>
        {equalsDisplay}
      </div>
      
    </div>
  );
}

export default App;

