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
            <nav> </nav>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li><a href="#!">First Sidebar Link</a></li>
                <li><a href="#!">Second Sidebar Link</a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <canvas id="canvas_editor" width="800" height="600"></canvas>
            <div>
                <button className="btn waves-effect white grey-text darken-text-2" onClick={(e)=>add_square()}>+ Square</button>
            </div>
            <div>
                <button className="btn waves-effect white grey-text darken-text-2" onClick={(e)=>add_circle()}>+ Circle</button>
            </div>
            <div>
                <button className="btn waves-effect white grey-text darken-text-2" onClick={(e)=>add_triagle()}>+ Triangle</button>
            </div>
        </div>
    );
}
export default EditorComponent;