import React, { useReducer } from 'react';

const intialState= {
    elements:[]
}

export const store = React.createContext(intialState)
const {Provider} = store

export const StateProvider = ({children})=>{
    const [state, dispatch] = useReducer((state,action)=>{
        const currentState = {...state}
        switch(action.type){
            case 'ACION1':
                currentState.elements  = action.payload
            default:
                throw Error("Unknown action")
        }
    },intialState)
    return <Provider value={{state,dispatch}}>{children}</Provider>;
}; 

 
 