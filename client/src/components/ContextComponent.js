import React from 'react';
import ContextChildComponent from './ContextChildComponent';

export const ContextTest = React.createContext();
const GlobalContextTst = {
    testGlobalVal:123
}

function ContextComponent(props) {
   

    return (
        <ContextTest.Provider value = {GlobalContextTst}>
            <div>
                <ContextChildComponent/>
                <ContextChildComponent/>
                <ContextChildComponent/>
                <ContextChildComponent/>
            </div>
        </ContextTest.Provider>
        
    );
}

export default ContextComponent;