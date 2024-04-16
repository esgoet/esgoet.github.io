import React, {Suspense, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, PresentationControls} from '@react-three/drei';

import CanvasLoader from '../Loader';

const Satellite = () => {
  const satellite = useGLTF('./satellite/satellite.glb');

  // const satelliteRef = useRef();


  return (
    <>
      {/* <primitive
        object={satellite.scene}
        scale={0.25}
        position-y={0}
        rotation-y={0.2}
        rotation-z={0.3}
        rotation-x={0.1}
        ref={satelliteRef}
      
      /> */}
         <primitive object={satellite.scene} position={[0,0,0]} rotation={[1.2,0.4, 1.1]} scale={0.25}/>



    </>
  );
}

useGLTF.preload('./satellite/satellite.glb');

const SatelliteCanvas = () => {
  return (
    <Canvas
      shadows
      // frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        // position: [-4, 3, 6],
      }}
    >
      
      <ambientLight intensity={1} color={0xffffff}/>
      
      <Suspense fallback={<CanvasLoader />}>        
          <Satellite />
          <OrbitControls autoRotate enableZoom={false} enablePan={false}/>
      </Suspense>
    </Canvas>
  );
}

export default SatelliteCanvas