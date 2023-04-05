import React, { useRef, useState } from 'react'
import IconButton from './Icon/IconButton';
import Circle from './Circle';
import classes from './Common.module.css'
import { mdiPalette } from '@mdi/js';
import useOutsideClick from './Hooks/useOutsideClick';

const Color = (props) => {
    const [color, setColor] = useState('#000000');
    const [show, setShow] = useState(false)
    const ref = useRef()
    useOutsideClick(ref, () => setShow(false))
    const onChange = (event) => {
        const data=event.target.value;
        setColor(data);
        props.setActive('Pen Color')
        setShow(prev => !prev)
        props.onColorChange(data);
    }

    return (
        <div style={{display: 'flex', flexDirection : 'column', alignItems:'center', gap:'10px', borderRadius:'50%', justifyContent:'space-around'}}>
        <input type="color" value={color} onChange={onChange} id="style1" style={{boxSizing:'border-box',padding:0, margin:0, appearance:'none', width:'40px', height:'40px', backgroundColor: 'transparent',borderRadius: '10px', border: 'none',backgroundClip:'border-box'}} />
        
               
        </div>
    )
}

export default Color