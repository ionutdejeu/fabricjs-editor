import React from 'react';
 import {store} from './AppEventStore'

function DownloadImageComponent(props) {
    
    const download_image = (ev)=>{
        store.emit('download_image',{})
    }
    return (
        <div className="download-btn-wrapper">
            <button onClick={download_image}>Download Image</button>
        </div>
    );
}

export default DownloadImageComponent; 