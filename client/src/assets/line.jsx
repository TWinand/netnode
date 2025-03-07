import { useState } from 'react'
import { Line } from '@react-three/drei';


const wWidth = window.innerWidth / 20;
const wHeight = window.innerHeight / 20;



export function ConLine({ points, color }) {

    return (
        <Line
            points={points}
            color={color}
            lineWidth={2}
        />

    )
}


