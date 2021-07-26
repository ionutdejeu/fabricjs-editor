import React, { useContext } from 'react';
import { ContextTest } from './ContextComponent';

function ContextChildComponent(props) {
    const context = useContext(ContextTest)
    return (
        <div>
            <button onClick={(e)=>{
                console.log(context)
                context.testGlobalVal = 1;
            }}>

            </button>
        </div>
    );
}

export default ContextChildComponent;