import React, { useContext } from 'react';
import { ContextTest } from './ContextComponent';
import {store} from './StateProvider'
function ContextChildComponent(props) {
    console.log(store)
    const [state,dispatch] = React.useContext(store)
    return (
        <div>
            <button onClick={(e)=>{
                console.log(e)
                dispatch({type:'ADD',payload:{key:Date.now(),otherProperries:Date.now().toString()}})}
            }>Add +</button>
            <div>
                <ol>
                    {state.elements && state.elements.map((elem) => <li>{JSON.stringify(elem)}</li>)}
                </ol>
            </div>
        </div>
    );
}

export default ContextChildComponent;