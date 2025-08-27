"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface LajeProps {
  comprimento: number;
  largura: number;
  espessura: number;
  espacamento: number;
}

export function Laje3D({ comprimento, largura, espessura, espacamento }: LajeProps) {
  const ferrosX = Array.from({ length: Math.floor(largura / espacamento) }, (_, i) => i);
  const ferrosY = Array.from({ length: Math.floor(comprimento / espacamento) }, (_, i) => i);

  return (
    <Canvas camera={{ position: [10, 10, 15], fov: 50 }} style={{ height: "100%", width: "100%" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />

      <mesh position={[comprimento / 2, -espessura / 2, largura / 2]}>
        <boxGeometry args={[comprimento, espessura, largura]} />
        <meshStandardMaterial color="gray" opacity={0.3} transparent />
      </mesh>

      {/* Ferros no sentido X */}
      {ferrosX.map((i) => (
        <mesh key={`x-${i}`} position={[comprimento / 2, 0, i * espacamento]}>
          <cylinderGeometry args={[0.05, 0.05, comprimento, 8]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}

      {ferrosY.map((i) => (
        <mesh
          key={`y-${i}`}
          position={[i * espacamento, 0, largura / 2]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <cylinderGeometry args={[0.05, 0.05, largura, 8]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      ))}
    </Canvas>
  );
}
