import React, { useEffect, useRef, useState } from 'react'
import classes from './CanvasSketch.module.css'
import floodFill from './FloodFill/floodFill'
import { fabric } from 'fabric';
const CanvasSketch = (props) => {
  
    //var color='black'
    //var width=5
    //var tool='pen'
    const [tool, setTool]= useState('pen')
    const [width, setWidth]= useState('4')
    const [color, setColor]= useState('white')
    
    var canvas = new fabric.Canvas('canvas',{
      width: 1350,
      height: 720,
      backgroundColor:'white',
      globalCompositeOperation: 'destination-atop'
    });
    canvas.setOverlayColor('transparent'.toString(),undefined,{erasable:false, globalCompositeOperation: 'source-over'});
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = '#1faeff';
canvas.calcOffset();
canvas.renderAll();

    // var rect = new fabric.Rect({
    //   //left: 100,
    //   //top: 100,
    //   fill: 'red',
    //   width: 20,
    //   height: 20
    // })
   
    // canvas.add(rect);
  //   useEffect(() => {
  //     if (props.getClearCanvas) {
  //       canvas.clear();
  //         props.getClearCanvas(() => () => {
  //             canvas.getObjects().forEach((o) => {
  //               if (o !==canvas.backgroundImage){
  //                 canvas.remove(o)
  //               }
  //             })
  //         })
  //     }
  // }, [])
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
      const canvas = canvasRef.current

      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;

      canvas.style.width = `${canvas.width}`;
      canvas.style.height = `${canvas.height}`;

      const context = canvas.getContext("2d");
      context.lineCap = props.lineCap || 'round';
      context.strokeStyle = props.color || 'black';
      context.lineWidth = props.lineWidth || 4;
      contextRef.current = context;
  }, [])




 // var brush = new fabric['PencilBrush'](canvas);



  useEffect(() => {
    console.log('linecap')
    contextRef.current.lineCap = props.lineCap
}, [props.lineCap])
useEffect(() => {
  setTool(props.option)
   console.log('tool',tool)
   //canvas.freeDrawingBrush = new fabric['Pencil' + 'Brush'](canvas);
   
  }, [props.option])
useEffect(() => {
  
  console.log('linecolor', props.color)
  setColor(props.color)
  contextRef.current.strokeStyle = props.color

  //var brush = canvas.freeDrawingBrush;
    brush.stroke = props.color;
   if (brush.getPatternSrc) {
      brush.source = brush.getPatternSrc.call(brush);
    }
  
}, [props.color])
useEffect(() => {
  setWidth(props.lineWidth)
  contextRef.current.lineWidth = props.lineWidth
  console.log('lineW',width)}, [props.lineWidth])
   
  useEffect(() => {
    if (props.getClearCanvas) {
        props.getClearCanvas(() => () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d")
            context.fillStyle = "white"
            context.fillRect(0, 0, canvas.width, canvas.height)
        })
    }
}, [])
  function changeObjectSelection(value) {
    canvas.forEachObject(function (obj) {
      obj.selectable = value;
    });
    canvas.renderAll();
  }

  if (canvas.freeDrawingBrush) {
    var brush = canvas.freeDrawingBrush;
    brush.stroke = props.color;
    if (brush.getPatternSrc) {
      brush.source = brush.getPatternSrc.call(brush);
    }
    brush.width = parseInt(width, 10) || 1;
    brush.shadow = new fabric.Shadow({
      blur: parseInt(width, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: props.color
    });
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;
  
};
  if (tool === 'erase') {
    console.log(color, 'yyy')
    changeObjectSelection(false);
    var brush = new fabric['PencilBrush'](canvas);
    brush.strokeLineCap ='round'
    brush.strokeLineJoin ='round' // bevel / round / miter
    brush.strokeMiterLimit = 1;
    brush.width = width;
    brush.color = 'white';
    if (brush.getPatternSrc) {
      brush.source = brush.getPatternSrc.call(brush);
    }
    brush.shadow = new fabric.Shadow({
      blur: parseInt(width, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: 'white'
    });
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;
  }

  var line, isDown
  function drawLine() {
    console.log('mousedown')
    canvas.on('mouse:down', function(o) {
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      var points = [pointer.x, pointer.y, pointer.x, pointer.y];
      line = new fabric.Line(points, {
        
        stroke: props.color.toString(),
        fill: null,
        originX: 'center',
        originY: 'center',
        centeredRotation: true,
        selectable: false
      });
      canvas.add(line);
    });
    canvas.on('mouse:move', function(o) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      line.set({
        x2: pointer.x,
        y2: pointer.y
      });
      canvas.renderAll();
    });
    canvas.on('mouse:up', function(o) {
      isDown = false;
      line.setCoords();
    //  if (lockHistory) return;
    //  console.log("object:modified");
      //undo_history.push(JSON.stringify(canvas));
      //redo_history.length = 0;
    });
  }
 
  // Add an event listener to the canvas to handle mouse down events
  
    return (
        <div>
            <canvas id='canvas'  ref={canvasRef} className={classes.canvas} style={{marginTop : '5%', borderRadius:'10px'}}/> 
        </div>
    )

    }

export default CanvasSketch