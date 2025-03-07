import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { NodeSphere } from './assets/sphere'
import { ConLine } from './assets/line'
import { SocketManager, nodesAtom } from './socketManager'
import { useAtom } from "jotai"

const bgColor = "#000000"

const wWidth = window.innerWidth / 20;
const wHeight = window.innerHeight / 20;


export function UserCanvas() {

    const [nodes] = useAtom(nodesAtom);

    return (
        <div className="h-screen" id="canvas-container">
            <SocketManager />
            <Canvas orthographic camera={{ position: [0, 0, 2], left: - wWidth, right: wWidth, top: wHeight, bottom: -wHeight, zoom: 1, near: 1, far: 2000 }} >
                {
                    nodes.map((node) => (
                        <NodeSphere key={node.id + "_node"} node={node} />
                    ))
                }

                <color attach="background" args={[bgColor]} />
                <OrbitControls />
                <Stats />

            </Canvas>
        </div >
    )
}
