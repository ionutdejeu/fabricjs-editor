import React, { useEffect, useState } from 'react';

function LoadingInputComponent(props) {
    const [isLoading,setIsLoading] = useState("a"=="b")
    const [inputTxt,setInputTxt] = useState("");
    
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },3000)
    })

    return isLoading ? (<div>Is Loading</div>): (
        <div>
             <input onChange={(e)=>{
                setInputTxt(e.target.value)
            }} placeholder="Enter some Text"/>
        </div>
    );
}

export default LoadingInputComponent;