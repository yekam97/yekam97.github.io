// components/Scene3D.js

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Este es el componente que contiene el objeto 3D
const AnimatedSphere = () => {
  const sphereRef = useRef();

  // useFrame es un hook que ejecuta código en cada frame (60 veces por segundo)
  useFrame(() => {
    // Hacemos que la esfera rote lentamente por sí misma
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002;
      sphereRef.current.rotation.x += 0.002;
    }
  });

  return (
    <Sphere ref={sphereRef} visible args={[1, 100, 200]} scale={2}>
      {/* El material es lo que le da la apariencia al objeto */}
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.4} // Qué tanto se deforma la esfera
        speed={1.5}   // Velocidad de la animación de distorsión
        roughness={0.1}
      />
    </Sphere>
  );
};

// Este es el componente principal que monta la escena
const Scene3D = () => {
  return (
    <Canvas>
      {/* Luces para que el objeto sea visible */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />

      {/* OrbitControls permite al usuario rotar la escena con el ratón */}
      <OrbitControls enableZoom={false} />

      {/* Aquí renderizamos nuestro objeto animado */}
      <AnimatedSphere />
    </Canvas>
  );
};

export default Scene3D;
