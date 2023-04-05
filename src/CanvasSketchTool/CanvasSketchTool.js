import React, { useReducer, useState } from 'react'
import CanvasSketch from '../CanvasSketch/CanvasSketch'
import classes from './CanvasSketchTool.module.css'
import Menu from './Menu/Menu'
import HMenu from './HMenu/Menu'

const initialData = {
    color: '#000000',
    option: 'pen',
    lineWidth: 4,
    //tool: 'pen'
}

function reducer(prev, action) {
    return {...prev, ...action}}
//function reducer(properties, action) {
//    return {color: action.color, option:action.option,lineWidth: action.lineWidth}}
const CanvasSketchTool = (props) => {

    const [properties, dispatchData] = useReducer(reducer, initialData);
    //properties, dis
    const [clearCanvas, setClearCanvas] = useState()

    return (
        <div className={classes.box} style={{ height: '100vh',width:'100%'}}>
            
            <HMenu dispatchData = {dispatchData} clearCanvas = {clearCanvas} />
            
            <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
            <Menu dispatchData = {dispatchData} clearCanvas = {clearCanvas}/>
            <CanvasSketch
                {...props}
                {...properties}
                lineCap='round'
                getClearCanvas = {setClearCanvas}
            />
            </div>
            
        </div>
    )
}

export default CanvasSketchTool