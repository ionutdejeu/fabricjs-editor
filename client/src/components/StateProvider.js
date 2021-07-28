import React, { useReducer } from 'react';

const intialState= {
    elements:[]
}

export const store = React.createContext()
const {Provider} = store

export const StateProvider = ({children})=>{
    const [state, dispatch] = useReducer((state,action)=>{
        const currentState = {...state}
        switch(action.type){
            case 'ADD':
                currentState.elements.push(action.payload)
            default:
                
        }
        console.log(action,currentState)
        return currentState;
    },intialState)
    return <Provider value={{state,dispatch}}>{children}</Provider>;
}; 

 
 