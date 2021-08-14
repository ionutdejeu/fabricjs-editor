import React from 'react';
 import {store} from './AppEventStore'

function ImageUploadComponent(props) {
    
    const file_selection_changed = (ev)=>{
        var f = ev.target.files[0];
        var fr = new FileReader();
    
        fr.onload = (ev2)=>{
            
            store.emit('image_changed',ev2.target.result)
        };
        fr.readAsDataURL(f);
    }
    return (
        <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input type="file" onChange = {file_selection_changed}/>
        </div>
    );
}

export default ImageUploadComponent;    