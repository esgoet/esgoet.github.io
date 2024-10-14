import {Suspense, useEffect, useState} from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, useGLTF} from '@react-three/drei';

import CanvasLoader from '../Loader';

const Satellite = () => {
  const satellite = useGLTF('./satellite/satellite.glb');

  return (
      <primitive
          object={satellite.scene}
          position={[0,0,0]}
          rotation={[1.2,0.4, 1.1]}
          scale={0.25}
      />
  );
}

useGLTF.preload('./satellite/satellite.glb');

const SatelliteCanvas = () => {
  const [hovered, setHovered] = useState(false)
  const [grabbing, setGrabbing] = useState(false)

  useEffect(() => {
      if (hovered && !grabbing) {
          document.body.style.cursor = 'grab';
      } else if (grabbing) {
          document.body.style.cursor = 'grabbing';
      } else {
          document.body.style.cursor = 'auto';
      }

      document.body.addEventListener('mouseup', ()=> setGrabbing(false))

      return (
          document.body.removeEventListener('mouseup', ()=> setGrabbing(false))
      )
  }, [hovered, grabbing])
  
  return (
    <Canvas
        onPointerUp={() => setGrabbing(false)}
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
        }}
    >
      <ambientLight intensity={2.5} color={0xffffff}/>
      <Suspense fallback={<CanvasLoader />}>  
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}  
        onPointerDown={() => setGrabbing(true)}
      >
          <Satellite />
          </group>    
          <OrbitControls autoRotate enableZoom={false} enablePan={false}/>
      </Suspense>
    </Canvas>
  );
}

export default SatelliteCanvas