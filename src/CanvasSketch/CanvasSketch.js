import { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import {addRect, setUpRect} from './canvasFunctions';
import {handleUndo, handleRedo, removeFuture} from './historyFunctions';
import React, { useReducer } from 'react'
import classes from './CanvasSketchTool.module.css'
import Menu from './Menu/Menu'
import classes2 from  './Menu/Menu.module.css'         
import Size from './Menu/Options/Size'
import Color from './Menu/Options/Color'
import IconButton from './Menu/Options/Icon/IconButton'
import { mdiFormatColorFill } from '@mdi/js';
import { mdiPen } from '@mdi/js';
import { mdiEraserVariant } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import Shape from './Menu/Options/Shape'
import HMenu from './HMenu/Menu'
//import './App.css';
// const initialData = {
//   color: '#000000',
//   option: 'pen',
//   lineWidth: 4,
//   //tool: 'pen'
// }
// function reducer(prev, action) {
//   return {...prev, ...action}}


function CanvasSketch() {

  const [canvas, setCanvas] = useState(null);
  const [currentCanvasObject, setCurrentCanvasObject] = useState(null);
  const [history, setHistory] = useState([]);
  const [indexInHistory, setIndexInHistory] = useState(0);
  const [rect, setRect] = useState(null);
  const [tool, setTool] = useState('pen')
  const [lineWidth, setLinewidth] = useState(4)
  const initCanvas = () => (
    new fabric.Canvas('c',{
      width: 1350,
      height: 720,
      backgroundColor:'white',
      //globalCompositeOperation: 'destination-atop',
      enableRetinaScaling: false,
      selectable: false
    }))

    const [active, setActive] = useState('Pen')
    const [color, setColor] = useState('#000000')
    const [shape, setShape]= useState('rect')
    const [option, setOption] = useState('pen')
    const colorChange = (color) => {
        setColor(color)
        //props.dispatchData({ color, option: option })
    }
    const shapeChange= (x) => {
      setShape(x)
      console.log(shape)
    }

    const onChange = (action) => {
        if (action === 'Flood Fill'){ //props.dispatchData({ option: 'paint', color })
    setOption('paint')}
        else if (action === 'Clear Frame') {
          canvas.remove(...canvas.getObjects().concat())
          //setActive('Pen')
          setOption(option)
            //props.clearCanvas()
            //props.dispatchData({ option: 'pen', color })
            //return;
        }
        else if (action === 'Erase'){ //props.dispatchData({ color: 'white', option: 'erase' })
    setOption('erase')}
        else {//props.dispatchData({ option: 'pen', color })
    setOption('pen')}
        setActive(action)
    }
const handle= (d) => {
  setLinewidth(d.lineWidth)
    //props.dispatchData({option : option, lineWidth: d.lineWidth})
}
    const prop = { active, setActive: onChange, setShape2: shapeChange}
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ctx,setCtx]=useState(null);
    const [ctx2,setCtx2]=useState(null);

//function reducer(properties, action) {
//    return {color: action.color, option:action.option,lineWidth: action.lineWidth}}


  //const [properties, dispatchData] = useReducer(reducer, initialData);
  //properties, dis
  const [clearCanvas, setClearCanvas] = useState()
  
  ////canvas.setOverlayColor('transparent'.toString(),undefined,{erasable:false, globalCompositeOperation: 'source-over'});
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = '#1faeff';
//canvas.calcOffset();
//canvas.renderAll();
var canvasElement = document.getElementById('c');
//const canvasRef = useRef(null);
//const contextRef = useRef(null);

useEffect(() => {
   var canvasElement = document.getElementById('c');
   if(canvas)
    canvas.selection=false
}, [])
  
  
  useEffect(() => {
    const canvas = initCanvas();
    canvas.on('object:modified', () => {
      setCurrentCanvasObject(canvas.toObject().objects)
    })
    canvas.on('mouse:up', (e) => {
      if(e.transform){
      if (e.transform.action === 'borderRadius') {
        setCurrentCanvasObject(canvas.toObject().objects)
      }
    }});
    //addRect(canvas, setRect);
    setCanvas(canvas)
    setCurrentCanvasObject(canvas.toObject().objects)
  }, [])

  useEffect(() => { 
    if (rect) {
      setUpRect(canvas,rect);
    }
  }, [rect, canvas])

  useEffect(() => {
    if (currentCanvasObject) {
      removeFuture(history, setHistory, indexInHistory, setIndexInHistory, currentCanvasObject);
    }
  }, [currentCanvasObject])

  useEffect(() => {
    if(canvas){
      canvas.remove(...canvas.getObjects());
      history[indexInHistory].forEach(obj => {
        if (obj.type === 'rect') {
         //  addRect(canvas, setRect, obj);
        }
      });
    }
  }, [indexInHistory]);

  const postionCanvas = (e) => {
    //var pointer = canvas.getPointer(e);
   // e=pointer
  // var left=0
   //var top=0
   if(e){
    const { left, top } = canvasElement.getBoundingClientRect();
  
    return [
        parseInt((e.pageX || e.touches[0].pageX) - left),
        parseInt((e.pageY || e.touches[0].pageY) - top)
       //0,0
    ];}
}
//setTool(properties.option)

if(canvas){
  
canvas.freeDrawingBrush = new fabric['Pencil' + 'Brush'](canvas);
canvas.isDrawingMode=true
//canvas.on('mouse:down', function(options) {
  //setTool(properties.option)
  //var pointer = canvas.getPointer(options.e);
  
//})

canvas.on('mouse:move', function(e) {
  //setTool(properties.option)
  
  console.log(canvas.isDrawingMode, option)
  if (canvas.isDrawingMode) {
    //canvas.freeDrawingBrush = brush;
   
    
    //canvas.renderAll();
  }
  
})




canvas.on('mouse:up', function(options){
  canvas.isDrawingMode=false
  //contextRef.current.closePath();
})
}
const [position, setPosition]= useState('')
if(canvasElement){
canvasElement.onmousedown = (e)=>{
console.log("done")
setPosition(postionCanvas(e));}
}
var FloodFill = {

	// Compare subsection of array1's values to array2's values, with an optional tolerance
	withinTolerance: function(array1, offset, array2, tolerance)
	{
		var length = array2.length,
			start = offset + length;
		tolerance = tolerance || 0;

		// Iterate (in reverse) the items being compared in each array, checking their values are
		// within tolerance of each other
		while(start-- && length--) {
			if(Math.abs(array1[start] - array2[length]) > tolerance) {
				return false;
			}
		}

		return true;
	},

	// The actual flood fill implementation
	fill: function(imageData, getPointOffsetFn, point, color, target, tolerance, width, height)
	{
	    var directions = [[1, 0], [0, 1], [0, -1], [-1, 0]],
			coords = [],
			points = [point],
			seen = {},
			key,
			x,
			y,
			offset,
			i,
			x2,
			y2,
			minX = -1,
			maxX = -1,
			minY = -1,
			maxY = -1;

		// Keep going while we have points to walk
		while (!!(point = points.pop())) {
			x = point.x;
			y = point.y;
			offset = getPointOffsetFn(x, y);

			// Move to next point if this pixel isn't within tolerance of the color being filled
			if (!FloodFill.withinTolerance(imageData, offset, target, tolerance)) {
				continue;
			}

			if (x > maxX) { maxX = x; }
			if (y > maxY) { maxY = y; }
			if (x < minX || minX == -1) { minX = x; }
			if (y < minY || minY == -1) { minY = y; }

			// Update the pixel to the fill color and add neighbours onto stack to traverse
			// the fill area
			i = directions.length;
			while (i--) {
				// Use the same loop for setting RGBA as for checking the neighbouring pixels
				if (i < 4) {
					imageData[offset + i] = color[i];
					coords[offset+i] = color[i];
				}

				// Get the new coordinate by adjusting x and y based on current step
				x2 = x + directions[i][0];
				y2 = y + directions[i][1];
				key = x2 + ',' + y2;

				// If new coordinate is out of bounds, or we've already added it, then skip to
				// trying the next neighbour without adding this one
				if (x2 < 0 || y2 < 0 || x2 >= width || y2 >= height || seen[key]) {
					continue;
				}

				// Push neighbour onto points array to be processed, and tag as seen
				points.push({ x: x2, y: y2 });
				seen[key] = true;
			}
		}

		return {
			x: minX,
			y: minY,
			width: maxX-minX,
			height: maxY-minY,
			coords: coords
		}
	}

}; // End FloodFill


//var fcanvas=canvas; // Fabric Canvas
var fillColor = color;
var fillTolerance = 2;

function hexToRgb(hex, opacity) {
	opacity = Math.round(opacity * 255) || 255;
	hex = hex.replace('#', '');
	var rgb = [], re = new RegExp('(.{' + hex.length/3 + '})', 'g');
	hex.match(re).map(function(l) {
		rgb.push(parseInt(hex.length % 2 ? l+l : l, 16));
	});
	return rgb.concat(opacity);
}

function floodFill(enable) {
	if (!enable) {
		canvas.off('mouse:down');
		canvas.selection = true;
		canvas.forEachObject(function(object){
			object.selectable = true;
		});
		return;
	}
  
	//canvas.deactivateAll();
  canvas.forEachObject(object => {
    object.selectable = false;
    object.evented = false;
});
  canvas.renderAll(); // Hide object handles!
	canvas.selection = false;
	
var isActive= false
	canvas.on({
		'mouse:down': function(e) {
			var mouse = canvas.getPointer(e.e),
				mouseX = Math.round(mouse.x), mouseY = Math.round(mouse.y),
				fcanvas = canvas.lowerCanvasEl,
				context = fcanvas.getContext('2d', { willReadFrequently: true }),
				parsedColor = hexToRgb(fillColor),
				imageData = context.getImageData(0, 0, fcanvas.width, fcanvas.height),
				getPointOffset = function(x,y) {
					return 4 * (y * imageData.width + x)
				},
				targetOffset = getPointOffset(mouseX, mouseY),
				target = imageData.data.slice(targetOffset, targetOffset + 4);

			if (FloodFill.withinTolerance(target, 0, parsedColor, fillTolerance)) {
				// Trying to fill something which is (essentially) the fill color
				console.log('Ignore... same color')
				return;
			}

			// Perform flood fill
			var data = FloodFill.fill(
				imageData.data,
				getPointOffset,
				{ x: mouseX, y: mouseY },
				parsedColor,
				target,
				fillTolerance,
				imageData.width,
				imageData.height
			);

			if (0 === data.width || 0 === data.height) {
				return;
			}

			var tmpCanvas = document.createElement('canvas'), tmpCtx = tmpCanvas.getContext('2d', { willReadFrequently: true });
			tmpCanvas.width = fcanvas.width;
			tmpCanvas.height = fcanvas.height;

			var palette = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height); // x, y, w, h
			palette.data.set(new Uint8ClampedArray(data.coords)); // Assuming values 0..255, RGBA
			tmpCtx.putImageData(palette, 0, 0); // Repost the data.
			var imgData = tmpCtx.getImageData(data.x, data.y, data.width, data.height); // Get cropped image

			tmpCanvas.width = data.width;
			tmpCanvas.height = data.height;
      tmpCanvas.selectable= false
			tmpCtx.putImageData(imgData,0,0);

			// Convert canvas back to image:
			var img = new Image();
      img.selection=false 
			img.onload = function() {
				canvas.add(new fabric.Image(img, {
					left: data.x,
					top: data.y,
					selectable: false
				}))
			};

			img.src = tmpCanvas.toDataURL('image/png'); 
         
      tmpCanvas.selection=false
			canvas.add(new fabric.Image(tmpCanvas, {
				left: data.x,
				top: data.y,
        selectable: false
			}))
      
      floodFill(false);
      isActive=false
		}
	});
}


  if(option=== 'pen'){
  
    if(canvas){

    var brush = canvas.freeDrawingBrush;
    brush.color = color;
    if (brush.getPatternSrc) {
      brush.source = brush.getPatternSrc.call(brush);
    }
    brush.width = parseInt(lineWidth, 10) || 1;
    brush.shadow = new fabric.Shadow({
      blur: parseInt(lineWidth, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: color
    });
    canvas.freeDrawingBrush = brush;
    //canvas.freeDrawingBrush.initialize(canvas);
    //canvas.freeDrawingBrush._setBrushStyles();
    //canvas.freeDrawingBrush.start(pointer);
   canvas.isDrawingMode = true;
  }
  };
  if(option=== 'erase'){
    if(canvas){

    
     
      var brush = canvas.freeDrawingBrush;
      brush.color = 'white';
      if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
      }
      brush.width = parseInt(lineWidth, 10) || 1;
      brush.shadow = new fabric.Shadow({
        blur: parseInt(lineWidth, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: 'white'
      });
      canvas.freeDrawingBrush = brush;
      //canvas.freeDrawingBrush.initialize(canvas);
      //canvas.freeDrawingBrush._setBrushStyles();
      //canvas.freeDrawingBrush.start(pointer);
     canvas.isDrawingMode = true;
  }
  };


/*
var mouseIsDown = false;
if(canvas){
canvas.onmousedown = function(e){
  console.log(e.x, e.y);

    mouseIsDown = true;
}
canvas.onmouseup = function(e){
    if(mouseIsDown) console.log('mouse clicked')

    mouseIsDown = false;
}

canvas.onmousemove = function(e){
    if(!mouseIsDown) return;

    console.log(e.x, e.y);
    return false;
}}*/

  return (
    <div className={classes.box} style={{ height: '100vh',width:'100%'}}>
       <div className={classes2.menu} style={{display:'flex', alignItems:'left'}}>
            <IconButton name='Pen' label={mdiPen} {...prop} color={color} />
            <IconButton name='Erase' label={mdiEraserVariant} {...prop} />
            <Size {...prop} color={color} option={option} dispatchData={handle} />
            <Color {...prop} color={color} onColorChange={colorChange} />
            <IconButton name='Flood Fill' label={mdiFormatColorFill} {...prop} color={color} onClick={() => {floodFill('floodFill' == 'floodFill');}} style={{ backgroundColor: (!option!=='paint' ? 'white' : (color || 'rgb(60,64,67)')) }}
 />
            <Shape {...prop} color={color} />
            <IconButton name='Clear Frame' label={mdiDelete} {...prop} />
        </div>
      <HMenu dispatchData = {''} clearCanvas = {clearCanvas} />
         
            <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
     
            
      
      <canvas id="c" ref={canvasRef} style={{marginTop:'65px', marginLeft:'10px', borderRadius:'15px'} }/>
      <div style={{width: '10%', height:'5%', display: 'absolute', justifyContent: 'space-between', marginBottom: '-300px', alignItems:'flex-end'}}>
        <button onClick={() => handleUndo(indexInHistory, history, setIndexInHistory)}>Undo</button>
        <button onClick={() => handleRedo(indexInHistory, setIndexInHistory)}>Redo</button>
      </div>

    </div>
    
    </div>
  );
}

export default CanvasSketch;