import React from 'react';
import ContextChildComponent from './ContextChildComponent';
import {StateProvider} from './StateProvider'
 
function ContextComponent(props) {
   

    return (
        <StateProvider>
            <div>
                <ContextChildComponent/>
                <ContextChildComponent/>
                <ContextChildComponent/>
                <ContextChildComponent/>
            </div>
        </StateProvider>
        
    );
}

export default ContextComponent;