import React,{Component,useState} from 'react'

export const InputComponent = ()=>{
    
    const [inputTxt,setInputTxt] = useState("");
    

    
    return (
        <div>
            <p>
                <br/>
                <pre>{inputTxt}</pre>
            </p>
            <input onChange={(e)=>{
                setInputTxt(e.target.value)
            }} placeholder="Enter some Text"/>
        </div>
    );
    
}
