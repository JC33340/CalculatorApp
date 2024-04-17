import React from 'react';
import Button from './components/Button';
import './App.css';

function App() {

  //display numberpad items
  const numpadItems:(string)[] = ["1","2","3","4","5","6","7","8","9","0","."]
  let numberpad: JSX.Element[] = []
  numberpad = numpadItems.map(item=>{
    return (
      <Button content={item} handleClick = {handleClick}/>
    )
  })

  const [currentDisplay,setCurrentDisplay] = React.useState<string>("")

  //handling the clicking of buttons on UI
  function handleClick(value:string): void{
    const stringifiedValue = value.toString()
    setCurrentDisplay(prevState=>prevState+stringifiedValue)
  }

  //handling typing of keys, by adding an event listener
  React.useEffect(()=>{
    document.querySelector("body")?.addEventListener('keyup',handleType)
  },[])
  function handleType(event:any): void{
    const stringifiedValue = event.key.toString()
    if (numpadItems.includes(stringifiedValue)){
      setCurrentDisplay(prevState=>prevState+event.key.toString())
    }
    console.log(event.key)
  }



  return (
    <div className='app'>
      <div className='displayDiv'>
        {currentDisplay}
      </div>
      <div className='numberpad'>
          {numberpad}
      </div>
    </div>
  );
}

export default App;
