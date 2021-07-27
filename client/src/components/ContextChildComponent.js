import React, { useContext } from 'react';
import { ContextTest } from './ContextComponent';
import {store} from './StateProvider'
function ContextChildComponent(props) {
    const [state,dispatch] = useContext(store)
    return (
        <div>
            <button onClick={(e)=>{
                dispatch({action:'ACION1',payload:{adaw:1}})
            }}>

            </button>
        </div>
    );
}

export default ContextChildComponent;