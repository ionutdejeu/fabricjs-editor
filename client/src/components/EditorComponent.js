import React, {useEffect,useContext}from 'react';
import {fabric} from 'fabric'
import ImageUploadComponent from './ImageUploadComponent'
import {GlobalContext} from './StateProvider';
import {store} from './AppEventStore'

let fabricEditor = {}
function EditorComponent(props) {
      
    const { selectedImage } = useContext(GlobalContext);
    let original_image = undefined
    let blured_image = undefined
    let blured_clone = undefined
    let mouseDown = false
    let newlyDrawnRectangle, origX, origY
    var filter = new fabric.Image.filters.Blur({
        blur: 0.2
    });

    const update_scale_pos = (blured_clone,options)=>{
        blured_clone.cropX = options.transform.target.left
        blured_clone.cropY =  options.transform.target.top
        blured_clone.width *= blured_clone.scaleX;
        blured_clone.height*=  blured_clone.scaleY;
        blured_clone.scaleX = 1
        blured_clone.scaleY = 1
    }
    const blureSection = (left=0, top=0, img=null)=>{
        if(original_image !== undefined)
        {
            fabricEditor.remove(original_image)
            fabricEditor.remove(blured_image)
            fabricEditor.remove(blured_clone)
        }
        
        original_image = img 
        fabricEditor.add(original_image)
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
    const resizeCanvas = ()=>{        
        fabricEditor.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
          });
        fabricEditor.renderAll();
    }
    useEffect(()=>{
        fabricEditor = new fabric.Canvas('canvas_editor');
        fabricEditor.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
          });
         
        fabricEditor.on('mouse:wheel', function(opt) {
        
            var delta = opt.e.deltaY;
            var zoom = fabricEditor.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            fabricEditor.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
            var vpt = this.viewportTransform;
            if (zoom < 400 / 1000) {
                vpt[4] = 200 - 1000 * zoom / 2;
                vpt[5] = 200 - 1000 * zoom / 2;
              } else {
                if (vpt[4] >= 0) {
                  vpt[4] = 0;
                } else if (vpt[4] < fabricEditor.getWidth() - 1000 * zoom) {
                  vpt[4] = fabricEditor.getWidth() - 1000 * zoom;
                }
                if (vpt[5] >= 0) {
                  vpt[5] = 0;
                } else if (vpt[5] < fabricEditor.getHeight() - 1000 * zoom) {
                  vpt[5] = fabricEditor.getHeight() - 1000 * zoom;
                }
            }
        });
        store.subscribe('image_changed',(data)=>{
            console.log('image_changed',data)
            fabric.Image.fromURL(data, function(img) {
                var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: true});
                blureSection(0,0,oImg)       
            });
        })
        window.addEventListener('resize', resizeCanvas, false);
        fabricEditor.on("mouse:down",function(e){
            mouseDown = true
            var pointer = fabricEditor.getPointer(e.e)
            origX = pointer.x
            origY = pointer.y

        })
        fabric.Image.fromURL("https://i.imgur.com/pZnE4mU.jpg", function (img) {
            var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: true});
            blureSection(0,0,oImg)
        }, {
            crossOrigin: 'anonymous'
        });
        return ()=>{
            console.log("In useEffect cleanup")
        }
    },[])
    useEffect(()=>{
        console.log('Selected item changed in editor')
    },[selectedImage])
    return (
        <div className="canvas_wrapper">
            <ImageUploadComponent></ImageUploadComponent>
            <canvas id="canvas_editor"></canvas>
        </div>
    );
}
export default EditorComponent;