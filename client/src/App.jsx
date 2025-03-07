import { useState } from 'react'
import { Stats, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { SocketManager, usersAtom } from './socketManager'
import { useAtom } from "jotai"
import { Interface } from './assets/interface'
import { UserCanvas } from './userCanvas'

function App() {

  return (
    <div className="relative flex-col items-center justify-between h-screen scroll-smooth focus:scroll-auto scroll-p-60">
      <UserCanvas />
      <Interface />
    </div >
  )
}

export default App
