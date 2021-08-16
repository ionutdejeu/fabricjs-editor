import React from 'react';
 import {store} from './AppEventStore'

function DownloadImageComponent(props) {
    
    const download_image = (ev)=>{
        store.emit('download_image',{})
    }
    return (
        <div className="download-btn-wrapper">
            <button className="btn" onClick={download_image}>Descarca imagine</button>
        </div>
    );
}

export default DownloadImageComponent; 