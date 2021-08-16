import React, {useEffect,useContext}from 'react';
import {fabric} from 'fabric'
import ImageUploadComponent from './ImageUploadComponent'
import DownloadImageComponent from './DownloadImageComponent'
import {store} from './AppEventStore'

let fabricEditor = {}
let original_image = undefined
let blured_image = undefined
let blured_sections = []
let shouldDrawRect = false
let newlyDrawnRectangle, origX, origY,webGLBackend = undefined
var filter = new fabric.Image.filters.Blur({
    blur: 0.3
});


function dowload_image(){
    var img_base64 = fabricEditor.toDataURL({
        format: "png",
        quality: 1,
        top:0,
        left:0,
        width: original_image.width * original_image.scaleX * fabricEditor.getZoom(),
        height: original_image.height * original_image.scaleY  * fabricEditor.getZoom()
        })
  
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;" + img_base64; //Image Base64 Goes here
    a.download = "Blurez_image_output.png"; //File name Here
    a.click(); //Downloaded file
    //document.removeChild(a);
    
}
function zoom_to_fit_selected_image(img){
    if(img === undefined){
        return
    } 
    let cw = fabricEditor.getWidth()
    let ch = fabricEditor.getHeight()
    let imgw = img.width 
    let imgh = img.height 
    let zoom = Math.min(ch / imgh, cw / imgw);

    set_zoom_of_editor(zoom,null,null)

}


function add_blured_selection(x,y,w,h){
    
    console.log(x,y,w,h)
    let blured_clone = fabric.util.object.clone(blured_image);
    blured_clone.cropX = x;
    blured_clone.cropY = y;
    blured_clone.width = w; // Default
    blured_clone.height = h; // Default
    blured_clone.objectCaching = false;
    fabricEditor.add(blured_clone);
    blured_clone.bringToFront();
    blured_clone.set({top:y,left:x, visible:true,selectable:true});
    blured_clone.on('moving', function (options) {
        update_scale_pos(blured_clone,options)
    });
    
    blured_clone.on('scaling', function (options) {
        update_scale_pos(blured_clone,options)
    })
    blured_sections.push(blured_clone);

}
function check_mouse_within_image_rect(imgW,imgH,pointer){
    return pointer.x <= imgW && pointer.y <=imgH;
}
const update_scale_pos = (blured_clone,options)=>{
    blured_clone.cropX = options.transform.target.left
    blured_clone.cropY =  options.transform.target.top
    blured_clone.width *= blured_clone.scaleX;
    blured_clone.height*=  blured_clone.scaleY;
    blured_clone.scaleX = 1
    blured_clone.scaleY = 1
}


function set_zoom_of_editor(zoom,opt=null,offset=null){
     
    if(opt !== null){
        opt.e.preventDefault();
        opt.e.stopPropagation();
        fabricEditor.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    }
    else {
        fabricEditor.setZoom(zoom);
    }
    fabricEditor.renderAll();
}

const blureSection = (left=0, top=0, img=null)=>{
    if(original_image !== undefined)
    {
        fabricEditor.remove(original_image)
        fabricEditor.remove(blured_image)
    }
    
    original_image = img 
    fabricEditor.add(original_image)
    
    zoom_to_fit_selected_image(img)
    original_image.set({selectable: false,hoverCursor: "arrow"});
    
    blured_image = fabric.util.object.clone(img);
    blured_image.set({opacity:1,selectable: false});
    blured_image.filters.push(filter);
    blured_image.applyFilters();
    fabricEditor.add(blured_image);
    blured_image.bringToFront();
    blured_image.set({visible:false,selectable:false});
    
}

function EditorComponent(props) {
      
   

   
    const resizeCanvas = ()=>{        
        fabricEditor.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
        console.log(fabricEditor.getZoom())
        zoom_to_fit_selected_image(original_image)
        fabricEditor.renderAll();
    }
    useEffect(()=>{
        fabricEditor = new fabric.Canvas('canvas_editor');
        //fabric.filterBackend = new fabric.WebglFilterBackend()
        fabric.textureSize = 6552236;
        resizeCanvas()
        
        store.subscribe('download_image',(data)=>{
            dowload_image();
        })
        store.subscribe('image_changed',(data)=>{
            fabric.Image.fromURL(data, function(img) {
                var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: true});
                blureSection(0,0,oImg)       
            });
        })
        window.addEventListener('resize', resizeCanvas, false);
        fabricEditor.on("mouse:down",function(e){
            
            let no_selected_obj =  fabricEditor.getActiveObjects().length == 0;
            var pointer = fabricEditor.getPointer(e.e)
            let within_rect = check_mouse_within_image_rect(original_image.width,
                original_image.height,
                pointer)
            shouldDrawRect = no_selected_obj && within_rect
            
            if(!shouldDrawRect) return
            origX = pointer.x
            origY = pointer.y
            var pointer = fabricEditor.getPointer(e.e);
            newlyDrawnRectangle = new fabric.Rect({
                left: origX,
                top: origY,
                originX: 'left',
                originY: 'top',
                width: pointer.x-origX,
                height: pointer.y-origY,
                angle: 0,
                fill: 'rgba(255,0,0,0.5)',
                transparentCorners: false
            });
            fabricEditor.add(newlyDrawnRectangle);

        })
        fabricEditor.on('mouse:move',function(o){
            if (!shouldDrawRect) return;
            var pointer = fabricEditor.getPointer(o.e);
            
            // need to clamp the size of the border to the withd of the intial loaded image 
            let imgw = original_image.width;
            let imgh = original_image.height;
            let mX = Math.min(pointer.x,imgw)
            let mY = Math.min(pointer.y,imgh)

            if(origX>pointer.x){
                newlyDrawnRectangle.set({ left: Math.max(0,mX) });
            }
            if(origY>pointer.y){
                newlyDrawnRectangle.set({ top: Math.max(0,mY) });
            }
            
            newlyDrawnRectangle.set({ width: Math.abs(origX - mX) });
            newlyDrawnRectangle.set({ height: Math.abs(origY - mY) });
            
            
            fabricEditor.renderAll();
        })
         
        fabricEditor.on('mouse:up', function(o){
            
            if(newlyDrawnRectangle !== undefined && shouldDrawRect==true){ 
                add_blured_selection(newlyDrawnRectangle.left,newlyDrawnRectangle.top,
                    newlyDrawnRectangle.width,
                    newlyDrawnRectangle.height)
                    
                fabricEditor.remove(newlyDrawnRectangle)
                shouldDrawRect = false;
                newlyDrawnRectangle = undefined;
            }
        });
        fabric.Image.fromURL("./background_image.png", function (img) {
            var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: false});
            blureSection(0,0,oImg)
        }, {
            crossOrigin: 'anonymous'
        });
        return ()=>{
            console.log("In useEffect cleanup")
        }
    },[])
    
    return (
        <div className="canvas_wrapper">
            <div className="toolbar" >
                <ImageUploadComponent></ImageUploadComponent>
                <DownloadImageComponent></DownloadImageComponent>
            </div>
            <div className="canvas_editor_wrapper">
            <canvas id="canvas_editor"></canvas>
            </div>
        </div>
    );
}
export default EditorComponent;