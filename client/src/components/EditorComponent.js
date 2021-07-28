import React, {useEffect, useState}from 'react';
import {fabric} from 'fabric'

let fabricEditor = {}

function EditorComponent(props) {

    useEffect(()=>{
        fabricEditor = new fabric.Canvas('canvas_editor');
        console.log(fabricEditor)
        return ()=>{
            console.log("In useEffect cleanup")
        }
    },)
    return (
        <div>
            <canvas id="canvas_editor" width="800" height="600"></canvas>
        </div>
    );
}

export default EditorComponent;