import React, {useEffect, useState,useContext}from 'react';
import {fabric} from 'fabric'
import M from 'materialize-css'
import ImageUploadComponent from './ImageUploadComponent'
import {GlobalContext} from './StateProvider';


let fabricEditor = {}
function EditorComponent(props) {
      
    const { selectedImage } = useContext(GlobalContext);

    let blured_image = undefined
    let blured_clone = undefined
    var filter = new fabric.Image.filters.Blur({
        blur: 0.2
    });

    const update_scale_pos = (blured_clone,options)=>{
        blured_clone.cropX = options.transform.target.left
        blured_clone.cropY =  options.transform.target.top
        console.log({"x":blured_clone.cropX,"y":blured_clone.cropY});
        blured_clone.width *= blured_clone.scaleX;
        blured_clone.height*=  blured_clone.scaleY;
        blured_clone.scaleX = 1
        blured_clone.scaleY = 1
    }
    const blureSection = (left=0, top=0, img=null)=>{
        blured_image = fabric.util.object.clone(img);
        blured_image.set({opacity:1,selectable: true});
        blured_image.filters.push(filter);
        blured_image.applyFilters();
        fabricEditor.add(blured_image);
        blured_image.sendToBack();
        blured_image.set({visible:false});
        
        
        blured_clone = fabric.util.object.clone(blured_image);
        blured_clone.cropX = 0;
        blured_clone.cropY = 0;
        blured_clone.width = 300; // Default
        blured_clone.height = 150; // Default
        blured_clone.objectCaching = false;
        fabricEditor.add(blured_clone);
        blured_clone.bringToFront();
        blured_clone.set({visible:true});


        blured_clone.on('moving', function (options) {
            update_scale_pos(blured_clone,options)
        });
        
        blured_clone.on('scaling', function (options) {
            update_scale_pos(blured_clone,options)
        })
    }
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
          
          var image = fabric.Image.fromURL("https://i.imgur.com/pZnE4mU.jpg", function (img) {
            var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: false,});
            //var filter = new fabric.Image.filters.Blur({
            //  blur: 0.5
            //});
            //oImg.filters.push(filter);
            //oImg.applyFilters();
            oImg.set({opacity:1});
            fabricEditor.add(oImg);
            blureSection(0,0,oImg);
          }, {
            crossOrigin: 'anonymous'
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
        var image = fabric.Image.fromURL("https://i.imgur.com/pZnE4mU.jpg", function (img) {
            var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: true});
            //var filter = new fabric.Image.filters.Blur({
            //  blur: 0.5
            //});
            //oImg.filters.push(filter);
            //oImg.applyFilters();
            oImg.set({opacity:1});

            fabricEditor.add(oImg);
            blureSection(0,0,oImg)
        }, {
            crossOrigin: 'anonymous'
        });
        return ()=>{
            console.log("In useEffect cleanup")
        }
    },)
    return (
        <div>
            <img src={selectedImage} />
            <canvas id="canvas_editor" width="800" height="600"></canvas>
            <nav> </nav>

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
            <button onClick={add_triagle}>Add Img</button>
            <ImageUploadComponent></ImageUploadComponent>
        </div>
    );
}
export default EditorComponent;