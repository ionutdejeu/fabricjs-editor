import React, {useState, useContext} from 'react';
import {GlobalContext} from './StateProvider';
 
export const ContextChildComponent = () => {
   const [text, updateText] = useState('');
   const { addItemToList } = useContext(GlobalContext);
 
   const handleSubmit = (event) => {
       if (text.length){
           event.preventDefault();
           addItemToList(text);
           updateText('')
       }
   }
 
   const handleChange = (event) => {
       updateText(event.target.value)
   }
 
   return (
     <div> 
         <h3>Add a new item to the shopping list</h3> 
         <form onSubmit = {handleSubmit}> 
            <div className = 'form-control'> 
               <input type="text" value={text} onChange={handleChange} placeholder="Enter item..." /> 
            </div> 
            <button className = 'btn'>Add Item</button> 
         </form> 
      </div>
   )
}