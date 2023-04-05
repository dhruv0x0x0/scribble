import React, { useState } from 'react'
import classes from './Menu.module.css'
import Size from './Options/Size'
import Color from './Options/Color'
import IconButton from './Options/Icon/IconButton'
import { mdiFormatColorFill } from '@mdi/js';
import { mdiPen } from '@mdi/js';
import { mdiEraserVariant } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import Shape from './Options/Shape'
const HMenu = (props) => {

    const [active, setActive] = useState('Pen')
    const [color, setColor] = useState('rgb(60,64,67)')
    const [tool, setTool]= useState('pen')
    const colorChange = (color) => {
        setColor(color)
        props.dispatchData({ color, option: 'pen' })
    }

    const onChange = (action) => {
        if (action === 'Flood Fill'){ 
            props.dispatchData({ option: 'paint', color })
            setTool('fill')
    }
        else if (action === 'Clear Frame') {
            props.clearCanvas()
            props.dispatchData({ option: 'pen', color })
            return;
        }
        else if (action === 'Erase'){ 
            props.dispatchData({ color: 'white', option: 'pen' })
            setTool('eraser')
        }
        else {props.dispatchData({ option: 'pen', color })
          setTool('pen')}
        setActive(action)
        //props.onToolChange(tool);
    }

    const prop = { active, setActive: onChange }

    return (
        <div className={classes.menu}>
            <label style={{margin:"10px 10px 10px 20px"}}>Choose Color</label>
            <Color {...prop} color={color} setColor={colorChange} />
            <label style={{margin:"10px 10px 10px 30px"}}>Pen Size</label>
            <Size {...prop} color={color} dispatchData={props.dispatchData} />
            <div style={{float:"right"}}>
                Brush panel
            </div>
        </div>
    )
}

export default HMenu