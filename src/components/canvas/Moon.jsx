import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Stats, PerspectiveCamera, PresentationControls} from "@react-three/drei";
import { useScroll, animated, useSpring, config } from "@react-spring/three";

import CanvasLoader from "../Loader";
import { LoopPingPong } from "three";


const Moon = ({ isMobile }) =>  {
  const group = useRef();
  const astronaut = useRef();
  const moon = useRef();
  const rocket = useRef();

  const [clicked, setClicked] = useState();

  // const [rotationY, setRotationY] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const mapNumber = (number, inMin, inMax, outMin, outMax) =>
      ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;


  const { nodes, materials, animations } = useGLTF("/moon/space_assets.glb");

  // Extract animation actions
  const { mixer, actions, names } = useAnimations(animations, group);

  // Hover and animation-index states
  const [hovered, setHovered] = useState(false);
  const [action, setAction] = useState('Waving')

  useEffect(( ) => {
    actions['WavingLoop'].setLoop(LoopPingPong);
  }, [actions])

  const onWaving = () => {
    console.log("waving anim has looped once");
    setAction("Walking");
  }

  // Change cursor on hover-state
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  // Change animation when the index changes
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[action].reset().fadeIn(0.5).play();
    action === 'Waving' && mixer.addEventListener("loop", onWaving)
    console.log(isMobile)
    
    // In the clean-up phase, fade it out
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
    } else if (action === 'Waving') {

    }

    rocket.current.rotation.x += delta/2;
    // rocket.current.rotation.y += delta / 20;
    // rocket.current.rotation.z += delta / 30;
    });

    const handleClick = () => {
      if (!clicked) {
        setAction('MoonWalk');
        setClicked(true);
      } else {
        setAction('Waving');
        setClicked(false);
      }
    }

  return (
    <group
      ref={group}
      // {...props}
      dispose={null}
      position={[0,0,0]}
      rotation={[0.4,0.4,0]}
    >
      {/* <group
        name="Scene"
        scale={isMobile ? 0.27 : 0.3}
        // position={isMobile ? [-1, -0.7, 0] : [-0.5, -0.7, 0]}
 
      > */}
      <group
            scale={0.2}
            onPointerEnter={() => {
              // setHovered(true)
              setAction('WavingLoop')}}
            onPointerOut={() => {
              // setHovered(false)
              setAction('Walking')
              // setClicked(false)
            }}
            >
            <group
          name="Armature"
          position={[0, 0.249, 0]}
          scale={0.959}
          ref={astronaut}
        >
          <primitive object={nodes.mixamorigHips} />
          <group name="Astronaut003">
            <skinnedMesh
              name="Astronautmesh007"
              geometry={nodes.Astronautmesh007.geometry}
              material={materials.Suit}
              skeleton={nodes.Astronautmesh007.skeleton}
              // onPointerEnter={() => setHovered(true)}
              // onPointerOut={() => setHovered(false)}
              // onClick={() => setAction('Waving')}
              receiveShadow
            />
            <skinnedMesh
              name="Astronautmesh007_1"
              geometry={nodes.Astronautmesh007_1.geometry}
              material={materials.Visor}
              skeleton={nodes.Astronautmesh007_1.skeleton}
              receiveShadow
            />
          </group>
          <skinnedMesh
            name="Backpack004"
            geometry={nodes.Backpack004.geometry}
            material={materials.Suit}
            skeleton={nodes.Backpack004.skeleton}
            receiveShadow
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

          //
        />

        </group>
        <PresentationControls
       
        >
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


const MoonCanvas = ({isMobile}) => {
  
  return (

      <Canvas
        shadows
        //   frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0.7, 5],
        }}
      >
        {/* <PerspectiveCamera makeDefault position={[0,1,6]}/> */}
        <ambientLight intensity={0.6} color={0x7e57e8} />
        <hemisphereLight intensity={0.2} skyColor={0x6200ea} />
        {/* <directionalLight position={[-10, -2, 6]} /> */}
        <directionalLight
          position={[0, -0.5, 20]}
          color={0xffffff}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Suspense fallback={<CanvasLoader />}>
    
   
          
          <Moon isMobile={isMobile} />
    
        </Suspense>
        {/* <Stats showPanel={0} /> */}
      </Canvas>

  );
};

export default MoonCanvas;
