import React from 'react';
 
export default (state, action) => {
   switch(action.type) {
       case 'CHANGE_IMAGE':
           console.log(action)
        return {
            selectedImage: action.payload
        }
       case 'ADD_ITEM':
           return {
                   shoppingList: [action.payload, ...state.shoppingList]
           }
       case 'REMOVE_ITEM':
           return {
               shoppingList: state.shoppingList.filter(item => item !== action.payload)
           }
       default:
           return state;
   }
}