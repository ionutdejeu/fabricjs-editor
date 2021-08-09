import React, {useEffect, useState}from 'react';
import {fabric} from 'fabric'
import M from 'materialize-css'
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
          var filter = new fabric.Image.filters.Blur({
            blur: 0.5
          });
          var image = fabric.Image.fromURL("https://i.imgur.com/pZnE4mU.jpg", function (img) {
            var oImg = img.set({ left: 0, top: 0});
            var filter = new fabric.Image.filters.Blur({
              blur: 0.5
            });
            oImg.filters.push(filter);
            oImg.applyFilters();
            fabricEditor.add(oImg);
          });

          //triangle.filters.push(filter);
          //triangle.applyFilters();
          fabricEditor.add(triangle);
    }
    useEffect(()=>{
        fabricEditor = new fabric.Canvas('canvas_editor');
        console.log(fabricEditor)
        var elems = document.querySelectorAll('.sidenav');
        const options = {}
        var instances = M.Sidenav.init(elems, options);
        return ()=>{
            console.log("In useEffect cleanup")
        }
    },)
    return (
        <div>
            <canvas id="canvas_editor" width="800" height="600"></canvas>
            <button onClick={add_triagle}>Add Img</button>
        </div>
    );
}
export default EditorComponent;