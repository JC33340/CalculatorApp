import React from 'react'

interface buttonProps {
    content:string,
    handleClick: (value:string)=>void,
    className: string
}

export default function Button({content,handleClick,className}:buttonProps){


    return(
        <div className={className} onClick={()=>handleClick(content)} >
            {content}
        </div>
    )
}