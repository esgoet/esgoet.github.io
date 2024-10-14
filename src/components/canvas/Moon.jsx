import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, PresentationControls} from "@react-three/drei";

import CanvasLoader from "../Loader";
import { LoopPingPong } from "three";


const Moon = () =>  {
  const group = useRef();
  const astronaut = useRef();
  const moon = useRef();
  const rocket = useRef();

  const { nodes, materials, animations } = useGLTF("/moon/space_assets.glb");
  const { mixer, actions } = useAnimations(animations, group);
  const [action, setAction] = useState('Waving')

  const onWaving = () => {
    setAction("Walking");
  }

  useEffect(( ) => {
    actions['WavingLoop'].setLoop(LoopPingPong);
  }, [actions])

  useEffect(() => {
    actions[action].reset().fadeIn(0.5).play();
    action === 'Waving' && mixer.addEventListener("loop", onWaving)

    return () => { 
        actions[action].fadeOut(0.5);
        action === 'Waving' && mixer.removeEventListener("loop", onWaving);
    }
  }, [action, actions]);

  useFrame((state, delta) => {
    if (action === "Walking") {
      moon.current.rotation.x -= delta / 20;
    } else if (action === "MoonWalk") {
        moon.current.rotation.x += delta / 20;
    }
    rocket.current.rotation.x += delta/2;
  });


  return (
    <group
      ref={group}
      dispose={null}
      position={[0,0,0]}
      rotation={[0.4,0.4,0]}
    >
      <group
            scale={0.2}
            onPointerEnter={() => {
              setAction('WavingLoop')}}
            onPointerOut={() => {
              setAction('Walking')
            }}
      >
        <group
          name="Armature"
          position={[0, 0.249, 0]}
          scale={0.959}
          ref={astronaut}
        >
          <primitive
              object={nodes.mixamorigHips}
          />
          <group name="Astronaut003">
            <skinnedMesh
              name="Astronautmesh007"
              geometry={nodes.Astronautmesh007.geometry}
              material={materials.Suit}
              skeleton={nodes.Astronautmesh007.skeleton}
              receiveShadow
              castShadow
            />
            <skinnedMesh
              name="Astronautmesh007_1"
              geometry={nodes.Astronautmesh007_1.geometry}
              material={materials.Visor}
              skeleton={nodes.Astronautmesh007_1.skeleton}
              receiveShadow
              castShadow
            />
          </group>
          <skinnedMesh
            name="Backpack004"
            geometry={nodes.Backpack004.geometry}
            material={materials.Suit}
            skeleton={nodes.Backpack004.skeleton}
            receiveShadow
            castShadow
          />
        </group>
        <mesh
          name="Moon"
          geometry={nodes.Moon.geometry}
          material={materials.Moon}
          rotation={[0, -0.471, 0]}
          scale={6.161}
          ref={moon}
          receiveShadow
        />
      </group>
      <PresentationControls>
        <group
          scale={0.2}
          rotation={[0,0.5,0.2]}
        >
          <group name="Rocket" scale={0.65} ref={rocket}>
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials.RocketBase}
              castShadow
            />
            <mesh
              name="Cube_1"
              geometry={nodes.Cube_1.geometry}
              material={materials.RocketColor}
              castShadow
            />
            <mesh
              name="Cube_2"
              geometry={nodes.Cube_2.geometry}
              material={materials.RocketGlass}
              castShadow
            />
            <mesh
              name="RocketDoor"
              geometry={nodes.RocketDoor.geometry}
              material={materials.RocketBase}
              position={[1.619, 15.04, 0.577]}
              rotation={[1.586, 0.724, 1.563]}
              castShadow
            />
          </group>

        </group>

      </PresentationControls>
        
    </group>
  );
}

useGLTF.preload("/moon/space_assets.glb");


const MoonCanvas = () => (
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0.7, 5],
        }}
      >
        <ambientLight intensity={1.3} color={0x7e57e8} />
        <hemisphereLight intensity={1.6} skyColor={0x6200ea} />
        <directionalLight
          position={[10, -0.5, 20]}
          color={0xffffff}
          intensity={5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Suspense fallback={<CanvasLoader />}>
          <Moon/>
        </Suspense>
      </Canvas>
);

export default MoonCanvas;
