import React, {Suspense, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, PresentationControls} from '@react-three/drei';

import CanvasLoader from '../Loader';

const Satellite = () => {
  const satellite = useGLTF('./moon/satellite.glb');

  const satelliteRef = useRef();

  useFrame((state, delta)=> {
    satelliteRef.current.rotation.x += delta/30;
    satelliteRef.current.rotation.z += delta/10;
    satelliteRef.current.rotation.y += delta/80;
  })

  return (
    <>
      <primitive
        object={satellite.scene.children[0]}
        scale={0.25}
        position-y={0}
        rotation-y={0.2}
        rotation-z={0.3}
        rotation-x={0.1}
        ref={satelliteRef}
      
        castShadow
        receiveShadow
      />

    </>
  );
}

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
      {/* <ambientLight intensity={2} />
      <hemisphereLight intensity={3} />
      <directionalLight position={[-1, 7, 6]} color={0xffeeee} intensity={2} /> */}
      <ambientLight intensity={0.6} color={0x7e57e8} />
      <hemisphereLight intensity={0.2} skyColor={0x6200ea} />
      <directionalLight
        position={[0, -0.5, 20]}
        color={0xffffff}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Suspense fallback={<CanvasLoader />}>
        {/* <OrbitControls
          autoRotate
          enableZoom={false}
          // maxPolarAngle={Math.PI/2}
          // minPolarAngle={Math.PI/2}
        /> */}
        
          <Satellite />
      </Suspense>
    </Canvas>
  );
}

export default SatelliteCanvas