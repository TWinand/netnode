import React from 'react';
import { Sphere, Text } from '@react-three/drei';
import { ConLine } from './line';

const wWidth = window.innerWidth / 20;
const wHeight = window.innerHeight / 20;

export function NodeSphere({ id, node }) {
    // Skalierte Position des Nodes berechnen
    const nodePos = [
        node.position[0] * wWidth,
        node.position[1] * wHeight,
        node.position[2] || 0,
    ];

    return (
        <group>
            {/* Sphere */}
            <Sphere position={nodePos} args={[1, 32, 32]}>
                <meshBasicMaterial color={node.color} />
            </Sphere>

            {/* Namens-Tag */}
            <Text
                position={[nodePos[0], nodePos[1] + 3, nodePos[2]]} // Text erscheint über der Sphere
                fontSize={2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {node.name}
            </Text>

            {/* Linien für Offer Connections */}
            {node.offerCon.map((con) => {
                const conPos = [
                    con.position[0] * wWidth,
                    con.position[1] * wHeight,
                    con.position[2] || 0,
                ];
                return (
                    <ConLine
                        key={node.id + "offer" + con.id}
                        points={[nodePos, conPos]} // Linie zwischen nodePos und conPos
                        color="#FF0000"
                    />
                );
            })}

            {/* Linien für Search Connections */}
            {node.searchCon.map((con) => {
                const conPos = [
                    con.position[0] * wWidth,
                    con.position[1] * wHeight,
                    con.position[2] || 0,
                ];
                return (
                    <ConLine
                        key={node.id + "search" + con.id}
                        points={[nodePos, conPos]} // Linie zwischen nodePos und conPos
                        color="#008000"
                    />
                );
            })}
        </group>
    );
}
