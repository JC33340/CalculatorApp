import React from 'react'

interface buttonProps {
    content:string,
    handleClick: (value:string)=>void
}

export default function Button({content,handleClick}:buttonProps){


    return(
        <div className='grid-item' onClick={()=>handleClick(content)} >
            {content}
        </div>
    )
}