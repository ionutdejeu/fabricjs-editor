import React, { useRef } from 'react';

function RefComponent({imageAltIdle,imageAltHover}) {
    const imageRef = useRef(null)
    return (
        <div>
            <img onMouseOver={()=>{
                imageRef.current.alt = imageAltHover
            }} onMouseOut={()=>{
                imageRef.current.alt = imageAltIdle
            }} src="" alt = "Image 1" ref={imageRef}/>
        </div>
    );
}

export default RefComponent;