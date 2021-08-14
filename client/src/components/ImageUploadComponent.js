import React,{useContext, useRef } from 'react';
import {GlobalContext} from './StateProvider';
import {store} from './AppEventStore'

function ImageUploadComponent(props) {
    const loadedImageRef = useRef(null);
    const { change_loaded_image } = useContext(GlobalContext);
    const file_selection_changed = (ev)=>{
        var f = ev.target.files[0];
        var fr = new FileReader();
    
        fr.onload = (ev2)=>{
            change_loaded_image(ev2.target.result);
            store.emit('image_changed',ev2.target.result)
        };
        fr.readAsDataURL(f);
    }
    return (
        <div class="upload-btn-wrapper">
            <button class="btn">Upload a file</button>
            <input type="file" onChange = {file_selection_changed}/>
        </div>
    );
}

export default ImageUploadComponent;    