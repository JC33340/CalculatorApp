import React from 'react'

interface buttonProps {
    content:number|string
}

export default function Button({content}:buttonProps){

    function handleClick(){
        console.log("YEA")
    }

    return(
        <div className='grid-item' onClick = {handleClick}>
            {content}
        </div>
    )
}