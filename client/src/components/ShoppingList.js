import React, {useContext} from 'react';
import { GlobalContext } from './StateProvider';
import { RemoveItem } from './RemoveItem';
 
export const ShoppingList = () => {
   const { shoppingList } = useContext(GlobalContext);
 
   const shoppingMarkup = shoppingList.map((item, index) => (
       <li key = {index} className = 'list-item'> 
                 {item} <RemoveItem item = {item} /> 
      </li>
   )) 

   return ( 
      <ul className = 'shopping-list'> 
         {shoppingMarkup} 
      </ul>
   )
}