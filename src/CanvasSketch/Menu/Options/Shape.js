import React, { useRef, useState } from 'react'
import IconButton from './Icon/IconButton';
import Circle from './Circle';
import classes from './Common.module.css'
import { mdiChartLine, mdiCircleBoxOutline, mdiCircleEditOutline, mdiCircleExpand, mdiCircleOutline, mdiEllipse, mdiEllipseOutline, mdiFormatLineStyle, mdiLineScan, mdiPalette, mdiRectangle, mdiRectangleOutline, mdiShapeOutline, mdiTriangleOutline, mdiVectorLine, mdiVectorPolygon } from '@mdi/js';
import useOutsideClick from './Hooks/useOutsideClick';
import Icon from '@mdi/react';

const shapes = [[mdiRectangleOutline,'rect'], [mdiCircleOutline,'circle'], [mdiTriangleOutline,'tri'], [mdiVectorLine,'line'], [mdiEllipseOutline,'ellipse'], [mdiVectorPolygon,'polygon']]

const Shape = (props) => {

    const [show, setShow] = useState(false)
    const ref = useRef()
    useOutsideClick(ref, () => setShow(false))

    const onClick = (x) => {
        props.setActive('shape')
        props.setShape2(x)
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
                        shapes.map(
                            shape => <Icon path={shape[0]} size={2.5} onClick={onClick(shape[1])}/>
                        )
                    }
                </div>
                : undefined}
        </IconButton >
    )
}

export default Shape