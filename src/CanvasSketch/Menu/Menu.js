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
const Menu = (props) => {

    const [active, setActive] = useState('Pen')
    const [color, setColor] = useState('#000000')
    const [option, setOption] = useState('pen')
    const colorChange = (color) => {
        setColor(color)
        props.dispatchData({ color, option: option })
    }

    const onChange = (action) => {
        if (action === 'Flood Fill'){ props.dispatchData({ option: 'paint', color })
    setOption('paint')}
        else if (action === 'Clear Frame') {
            props.clearCanvas()
            props.dispatchData({ option: 'pen', color })
            return;
        }
        else if (action === 'Erase'){ props.dispatchData({ color: 'white', option: 'erase' })
    setOption('erase')}
        else {props.dispatchData({ option: 'pen', color })
    setOption('pen')}
        setActive(action)
    }
const handle= (d) => {
    props.dispatchData({option : option, lineWidth: d.lineWidth})
}
    const prop = { active, setActive: onChange }

    return (
        <div className={classes.menu} style={{display:'flex', alignItems:'left'}}>
            <IconButton name='Pen' label={mdiPen} {...prop} color={color} />
            <IconButton name='Erase' label={mdiEraserVariant} {...prop} />
            <Size {...prop} color={color} option={option} dispatchData={handle} />
            <Color {...prop} color={color} onColorChange={colorChange} />
            <IconButton name='Flood Fill' label={mdiFormatColorFill} {...prop} color={color} />
            <Shape {...prop} color={color} setColor={colorChange} />
            <IconButton name='Clear Frame' label={mdiDelete} {...prop} />
        </div>
    )
}

export default Menu