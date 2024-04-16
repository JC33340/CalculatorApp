import React from 'react';
import Button from './components/Button';
import './App.css';

function App() {

  const numpadItems:(number|string)[] = [1,2,3,4,5,6,7,8,9,0,"."]
  let numberpad: JSX.Element[] = []

  numberpad = numpadItems.map(item=>{
    return (
      <Button content={item}/>
    )
  })

  return (
    <div className='app'>
      <div className='numberpad'>
          {numberpad}
      </div>
    </div>
  );
}

export default App;
