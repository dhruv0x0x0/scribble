import React, { useRef, useState } from 'react'
import IconButton from './Icon/IconButton';
import Circle from './Circle';
import classes from './Common.module.css'
import { mdiChartLine, mdiCircleBoxOutline, mdiCircleEditOutline, mdiCircleExpand, mdiCircleOutline, mdiEllipse, mdiEllipseOutline, mdiFormatLineStyle, mdiLineScan, mdiPalette, mdiRectangle, mdiRectangleOutline, mdiShapeOutline, mdiTriangleOutline, mdiVectorLine, mdiVectorPolygon } from '@mdi/js';
import useOutsideClick from './Hooks/useOutsideClick';
import Icon from '@mdi/react';

const colors = [mdiRectangleOutline, mdiCircleOutline, mdiTriangleOutline, mdiVectorLine, mdiEllipseOutline, mdiVectorPolygon]

const Shape = (props) => {

    const [show, setShow] = useState(false)
    const ref = useRef()
    useOutsideClick(ref, () => setShow(false))

    const onClick = () => {
        props.setActive('Pen Color')
        setShow(prev => !prev)
    }

    return (
        <IconButton
            name='Shape'
            label={mdiShapeOutline}
            {...props}
            onClick={onClick}
        >
            {show ?
                <div
                    ref={ref}
                    className={classes['size-menu']}
                    style={{ flexWrap: 'wrap' }}
                >
                    {
                        colors.map(
                            color => <Icon path={color} size={2.5} onClick={() => {console.log('press')}}/>
                        )
                    }
                </div>
                : undefined}
        </IconButton >
    )
}

export default Shape