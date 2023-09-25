import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Stats, PerspectiveCamera} from "@react-three/drei";
import { useScroll, animated, useSpring, config } from "@react-spring/three";

import CanvasLoader from "../Loader";


const Moon = ({ isMobile }) =>  {
  const group = useRef();
  const astronaut = useRef();
  const moon = useRef();
  const rocket = useRef();

const [scale, setScale] = useState(1);
const [positionY, setPositionY ] = useState(0);
const [rotationY, setRotationY] = useState(0);
const [scrolling, setScrolling] = useState(false);

const mapNumber = (number, inMin, inMax, outMin, outMax) =>
    ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

// const { scrollYProgress } = useScroll({
//     container: window,
//     onChange: ({ value: { scrollYProgress } }) => {
//         console.log(scrollYProgress)
//         setScrolling(true)
//     setScale(mapNumber(scrollYProgress, 0.0, 1.0, 1.0, 4));
//     setPositionY(mapNumber(scrollYProgress, 0, 1, 0, -8))
//     setRotationY(mapNumber(scrollYProgress, 0, 1, 0, 3));
//     if (scrollYProgress > 0.2) {
//         setAction('MoonWalk')
//     } else {
//         setAction('Walking')
//     }
//     },
// });

// const { scale } = useSpring({ scale: scrolling ? 1 : 1 })

// const { positionY } = useSpring({ positionY: scrolling ? -3 : 0 });


  const { nodes, materials, animations } = useGLTF("/moon/space_assets.glb");

  // Extract animation actions
  const { mixer, actions, names } = useAnimations(animations, group);
  const astronautActionNames = ['Walking','Waving','MoonWalk']


  // Hover and animation-index states
  const [hovered, setHovered] = useState(false);
  const [action, setAction] = useState('Walking')

  const onWaving = () => {
    console.log("is looping");
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
    if (action === 'Waving') {
        mixer.addEventListener("loop", onWaving);
        }
    
    // In the clean-up phase, fade it out
    return () => { 
        actions[action].fadeOut(0.5);
        mixer.removeEventListener("loop", onWaving);
        // setAction("Walking");
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

  return (
    <animated.group
      ref={group}
      // {...props}
      dispose={null}
      rotation={[0, rotationY, 0]}
      scale={scale}
      position={[1, positionY, 0]}
    >
      <group
        name="Scene"
        scale={0.3}
        // position={[-0.5, -0.7, 0]}
        position={isMobile ? [-1, -0.7, 0] : [-0.5, -0.7, 0]}
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
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={() => setAction("Waving")}
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
    </animated.group>
  );
}

useGLTF.preload("/moon/space_assets.glb");


const MoonCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      console.log("isMobile: " + isMobile);
      console.log(event);
      setIsMobile(event.matches);
      
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);


   
  return (

      <Canvas
        shadows
        //   frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
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
