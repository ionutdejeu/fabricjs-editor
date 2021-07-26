import React, {useEffect, useState}from 'react';

function EffectComponent(props) {

    const [counterValue,setCounterValue] = useState(0)
    useEffect(()=>{
        console.log("in Useeffect")
        console.log("Counter Value:"+counterValue)
        
        return ()=>{
            console.log("In useEffect cleanup")
        }
    },[counterValue])
    return (
        <div>
            <button onClick={(e)=>{setCounterValue(counterValue+1)}}>Counter {counterValue}</button>
        </div>
    );
}

export default EffectComponent;