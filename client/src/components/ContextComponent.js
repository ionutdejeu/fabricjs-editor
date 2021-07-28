import React,{useContext} from 'react';
import ContextChildComponent from './ContextChildComponent';
import {StateProvider,store} from './StateProvider'
 
function ContextComponent(props) {

    

    return (
        <StateProvider>
            <div>
                <ContextChildComponent/>
            </div>
            
        </StateProvider>
        
    );
}

export default ContextComponent;