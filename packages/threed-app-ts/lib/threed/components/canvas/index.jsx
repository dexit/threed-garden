// ==============================================================
// ** RESOURCES

import { proxy, useSnapshot } from 'valtio'

import { Suspense, useState } from 'react'
import { useRef } from 'react'

import { Canvas, useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls, Preload, Environment, Html, useProgress } from '@react-three/drei'
import { useGLTF, PresentationControls, ContactShadows } from '@react-three/drei'

// import AppPage from '#/lib/threed/pages/_app-page'
// import BoxPage from '#/lib/threed/pages/box-page'
import BoxComponent from '#/lib/threed/components/canvas/Box'
// import ShaderPage from '#/lib/threed/pages/shader-page'
import ShaderComponent from '#/lib/threed/components/canvas/Shader'

// ** ThreeD Imports
import ThreeD from '#/lib/threed/components/canvas/Nouns/ThreeD'

// ** COLORFUL CONSOLE MESSAGES (ccm)
import { ccm0, ccm1, ccm2, ccm3, ccm4, ccm5, ccm6 } from '#/ui/~core/utils/console-colors'

// ==============================================================
// ** VARIABLES

// Reactive state model (using valtio)
const state = proxy({ current: null, mode: 0 })

// Model interactive "modes" using TransformControls
const modes = ['translate', 'rotate', 'scale']

function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.round(progress)} % loaded</Html>
}

// Controls
function Controls() {
  // Get 'snap' notified on changes to state + scene
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)

  return (
    <>
      {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
      {snap.current && <TransformControls object={scene.getObjectByName(snap.current)} mode={modes[snap.mode]} />}
      {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </>
  )
}

export default function VCanvas({ models, children }) {
  // inject models inside Suspense groups
  if (models) {
    console.debug('models', models)
    if (models.length) {
      console.debug('models.length', models.length)
    }
  }

  return (
    <Canvas
      camera={{ position: [-10, 10, 100], fov: 50 }}
      dpr={[1, 2]}
      shadows
      style={{
        height: '480px',
        width: '100%',
      }}>
      <Controls />
      <Preload all />
      <Suspense fallback={<Loader />}>
        <Environment preset='forest' background />

        <ambientLight intensity={0.5} />

        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />

        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          {/* MODEL */}
          <Watch rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} />
          {/* MODEL */}
        </PresentationControls>

        <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />

        <axesHelper args={[100]} />
        <gridHelper args={[100, 10]} />

        <pointLight position={[100, 100, 100]} intensity={0.8} />
        <hemisphereLight color='#ffffff' groundColor='#b9b9b9' position={[-7, 25, 13]} intensity={0.85} />

        {/* [MM] HEY HEY HEY */}
        {/* NEED TO SEND A THREED_SCENE TO A CANVAS, BUT THIS IS FINE FOR NOW */}
        {/* <ThreeD state={state} threedId={1} threed={{}} /> */}
        {/* [MM] HEY HEY HEY */}

        {children}
      </Suspense>
    </Canvas>
  )
}

function Watch(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/watch-v1.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Object005_glass_0.geometry} material={materials.glass}>
        <Html scale={100} rotation={[Math.PI / 2, 0, 0]} position={[180, -350, 50]} transform occlude>
          <div className='annotation'>
            <span style={{ fontSize: '1.5em' }}>🥕</span> 6,550
          </div>
        </Html>
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Object006_watch_0.geometry} material={materials.watch} />
    </group>
  )
}
