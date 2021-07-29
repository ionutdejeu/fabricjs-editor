import React, {useEffect, useState}from 'react';
import {fabric} from 'fabric'
let fabricEditor = {}
function EditorComponent(props) {
    const add_square = ()=>{
        var rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 20,
          height: 20
        });
        fabricEditor.add(rect);        
    }
    const add_circle = ()=>{
        var circle = new fabric.Circle({
            radius: 20, fill: 'green', left: 100, top: 100
          });
        fabricEditor.add(circle);
    }
    const add_triagle = ()=>{
        var triangle = new fabric.Triangle({
            width: 20, height: 30, fill: 'blue', left: 50, top: 50
          });
          fabricEditor.add(triangle);
    }
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
            <div>
                <button onClick={(e)=>add_square()}>+ Square</button>
            </div>
            <div>
                <button onClick={(e)=>add_circle()}>+ Circle</button>
            </div>
            <div>
                <button onClick={(e)=>add_triagle()}>+ Triangle</button>
            </div>
        </div>
    );
}
export default EditorComponent;