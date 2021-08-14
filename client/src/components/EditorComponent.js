import React, {useEffect,useContext}from 'react';
import {fabric} from 'fabric'
import ImageUploadComponent from './ImageUploadComponent'
import {GlobalContext} from './StateProvider';
import {store} from './AppEventStore'

let fabricEditor = {}

function center_image(img){
    let cw = fabricEditor.getWidth()
    let ch = fabricEditor.getWidth()
    let wh = window.innerHeight
    let ww = window.innerWidth
    let imgw = img.width 
    let imgh = img.height 
    
    // fit the image by dimentsions vertical
    let vertical = imgh > imgw
    let imgcx = imgh / 2
    let imgcy = imgw / 2 

    let imgPosY = vertical ? imgcx: imgcy;
    let imgPosX = vertical ? imgcy: imgcx;
    let zoom = vertical? ch / imgh: cw / imgw;
    animate_zoom(zoom,null,{x:imgPosX,y:imgPosY})
    let a = {left:0,top:0}
    console.log(a)
    img.set({left:0,top:0});
    console.log(img)

}
function animate_zoom(zoom,opt=null,offset=null){
    console.log(zoom,opt);
    //fabricEditor.setZoom(zoom);
    if(opt !== null){
        opt.e.preventDefault();
        opt.e.stopPropagation();
        fabricEditor.setZoom(zoom);
        //fabricEditor.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    }
    else {
        fabricEditor.zoomToPoint({ x: offset.x, y: offset.y }, zoom);
    }
    fabricEditor.renderAll();

    //fabric.util.animate({
    //    startValue: fabricEditor.getZoom(),
    //    endValue: zoom,
    //    duration: 500,
    //    onChange: function(zoomvalue) {
    //        if(opt !== null){
    //            opt.e.preventDefault();
    //            opt.e.stopPropagation();
    //            fabricEditor.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoomvalue);
    //        }
    //        else {
    //            fabricEditor.zoomToPoint({ x: offset.x, y: offset.y }, zoomvalue);
    //        }
    //        fabricEditor.renderAll();
    //    },
    //    onComplete: function() {
    //        if(opt !== null){
    //            opt.e.preventDefault();
    //            opt.e.stopPropagation();
    //        }
    //        fabricEditor.renderAll();
    //    }
    //  });
}
function zoom_editor(){
    let initialZoom = fabricEditor.getZoom()

}

function EditorComponent(props) {
      
    const { selectedImage } = useContext(GlobalContext);
    let original_image = undefined
    let blured_image = undefined
    let blured_clone = undefined
    let shouldDrawRect = false
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
        console.log(img)
        
        original_image = img 
        fabricEditor.add(original_image)
        center_image(img)
        original_image.set({selectable: false});
        
        blured_image = fabric.util.object.clone(img);
        blured_image.set({opacity:1,selectable: false});
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
        blured_clone.set({visible:true,selectable:true});


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
            
            animate_zoom(zoom,opt)
            
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
            
            console.log(e);
            shouldDrawRect = true
            var pointer = fabricEditor.getPointer(e.e)
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
            
            if(origX>pointer.x){
                newlyDrawnRectangle.set({ left: Math.abs(pointer.x) });
            }
            if(origY>pointer.y){
                newlyDrawnRectangle.set({ top: Math.abs(pointer.y) });
            }
            
            newlyDrawnRectangle.set({ width: Math.abs(origX - pointer.x) });
            newlyDrawnRectangle.set({ height: Math.abs(origY - pointer.y) });
            
            
            fabricEditor.renderAll();
        })
        fabricEditor.on('object:selected', function(o){
            console.log(o)
        });
        fabricEditor.on("selection:created", function(obj){
            console.log(obj)
        });
        fabricEditor.on("selection:updated", function(obj){
            console.log(obj)
        });
        fabricEditor.on('mouse:up', function(o){
            shouldDrawRect = false;
          });
        fabric.Image.fromURL("https://i.imgur.com/pZnE4mU.jpg", function (img) {
            var oImg = img.set({ left: 0, top: 0,opacity: 1, selectable: false});
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