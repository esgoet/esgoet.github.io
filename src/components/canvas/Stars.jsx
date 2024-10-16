import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 1 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 70;
    ref.current.rotation.y -= delta / 75;
  });

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {

  return (
      <div className='w-screen h-screen fixed inset-0 -z-20'>

       <Canvas camera={{ position: [0, 0, 0] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>

          <Preload all />
        </Canvas>
      </div>
  );
};

export default StarsCanvas;