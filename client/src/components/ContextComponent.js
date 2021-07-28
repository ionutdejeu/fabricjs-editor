import React,{useContext} from 'react';
import {ContextChildComponent} from './ContextChildComponent';
import { ShoppingList } from './ShoppingList';
import {GlobalProvider} from './StateProvider'
 
function ContextComponent(props) {

    

    return (
        <GlobalProvider>
            <div>
                <ContextChildComponent/>
                <ShoppingList/>
            </div>
        </GlobalProvider>
        
    );
}

export default ContextComponent;