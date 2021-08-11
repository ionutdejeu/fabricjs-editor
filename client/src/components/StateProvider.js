import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
   shoppingList : [],
   selectedImage: undefined
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AppReducer, initialState);

   // Actions for changing state

   function addItemToList(item) {
       dispatch({
           type: 'ADD_ITEM',
           payload: item
       });
   }
   function removeItemFromList(item) {
       dispatch({
           type: 'REMOVE_ITEM',
           payload: item
       });
   }

   function change_loaded_image(img){
        dispatch({
            type: 'CHANGE_IMAGE',
            payload: img
        });
   }

   return(
      <GlobalContext.Provider value = {{
        selectedImage : state.selectedImage,  
        shoppingList : state.shoppingList, 
      addItemToList, removeItemFromList,change_loaded_image}}> 
        {children} 
   </GlobalContext.Provider>
   )
}