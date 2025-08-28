"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Laje3DProps {
  comprimento: number;
  largura: number;
  espessura: number;
  espacamento: number;
  bitola: "8" | "10" | "12.5"; // adicionamos bitola
}

export function Laje3D({
  comprimento,
  largura,
  espessura,
  espacamento,
  bitola,
}: Laje3DProps) {
  // Número de ferros
  const numFerrosX = Math.floor(largura / espacamento) + 1;
  const numFerrosY = Math.floor(comprimento / espacamento) + 1;

  const ferrosX = Array.from({ length: numFerrosX }, (_, i) => i);
  const ferrosY = Array.from({ length: numFerrosY }, (_, i) => i);

  // Posição das colunas
  const numColumnsX = 2;
  const numColumnsY = 2;
  const columnPositions: [number, number][] = [];
  for (let i = 0; i < numColumnsX; i++) {
    for (let j = 0; j < numColumnsY; j++) {
      const x = (i / (numColumnsX - 1)) * comprimento;
      const z = (j / (numColumnsY - 1)) * largura;
      columnPositions.push([x, z]);
    }
  }

  // Offsets
  const offsetX = -comprimento / 2;
  const offsetY = -espessura / 2;
  const offsetZ = -largura / 2;
  const rebarOffset = espessura / 2.5;

  // Converte bitola mm → raio em m
  const raioVergalhao = parseFloat(bitola) / 1000 / 2;

  return (
    <Canvas
      camera={{ position: [comprimento, largura, comprimento * 1.5], fov: 50 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[comprimento, largura, 5]} intensity={1} />
      <OrbitControls />

      {/* Laje */}
      <mesh
        position={[offsetX + comprimento / 2, offsetY, offsetZ + largura / 2]}
      >
        <boxGeometry args={[comprimento, espessura, largura]} />
        <meshStandardMaterial color="gray" opacity={0.5} transparent />
      </mesh>

      {/* Colunas */}
      {columnPositions.map(([x, z], index) => {
        const alturaColuna = 3; // altura arbitrária da coluna
        return (
          <mesh
            key={`col-${index}`}
            position={[
              x + offsetX,
              offsetY - espessura / 2 - alturaColuna / 2, // base encostada na laje
              z + offsetZ,
            ]}
          >
            <boxGeometry args={[0.5, alturaColuna, 0.5]} />
            <meshStandardMaterial color="darkgray" />
          </mesh>
        );
      })}

      {/* Ferros no sentido X (comprimento) */}
      {ferrosX.map((i) => (
        <mesh
          key={`x-${i}`}
          position={[
            offsetX + comprimento / 2,
            offsetY + rebarOffset,
            offsetZ + i * espacamento,
          ]}
          rotation={[0, 0, Math.PI / 2]} // de pé → deitado no eixo X
        >
          <cylinderGeometry
            args={[raioVergalhao, raioVergalhao, comprimento, 8]}
          />
          <meshStandardMaterial color="#A52A2A" />
        </mesh>
      ))}

      {/* Ferros no sentido Y (largura → eixo Z) */}
      {ferrosY.map((i) => (
        <mesh
          key={`y-${i}`}
          position={[
            offsetX + i * espacamento,
            offsetY + rebarOffset,
            offsetZ + largura / 2,
          ]}
          rotation={[Math.PI / 2, 0, 0]} // de pé → deitado no eixo Z
        >
          <cylinderGeometry args={[raioVergalhao, raioVergalhao, largura, 8]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
      ))}
    </Canvas>
  );
}
