
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRoom } from "@/context/RoomContext";
import { Color, BoxGeometry, CylinderGeometry } from "three";

// Custom furniture meshes based on type
const FurnitureMesh = ({ furniture, isSelected, onClick }) => {
  const getMeshByType = () => {
    switch (furniture.type) {
      case "dining_chair":
        return (
          <group>
            {/* Seat */}
            <mesh position={[0, -furniture.height/4, 0]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height/4, furniture.depth]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Back */}
            <mesh position={[0, furniture.height/4, -furniture.depth/2 + 0.05]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height/2, 0.05]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Legs */}
            {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([x, z], index) => (
              <mesh 
                key={index} 
                position={[
                  x * (furniture.width/2 - 0.05),
                  -furniture.height/2,
                  z * (furniture.depth/2 - 0.05)
                ]} 
                castShadow
              >
                <cylinderGeometry args={[0.02, 0.02, furniture.height/2]} />
                <meshStandardMaterial color={new Color(furniture.color)} />
              </mesh>
            ))}
          </group>
        );
      
      case "dining_table":
      case "coffee_table":
        return (
          <group>
            {/* Table top */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height/6, furniture.depth]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Legs */}
            {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([x, z], index) => (
              <mesh 
                key={index} 
                position={[
                  x * (furniture.width/2 - 0.1),
                  -furniture.height/2,
                  z * (furniture.depth/2 - 0.1)
                ]} 
                castShadow
              >
                <cylinderGeometry args={[0.05, 0.05, furniture.height]} />
                <meshStandardMaterial color={new Color(furniture.color)} />
              </mesh>
            ))}
          </group>
        );

      case "sofa":
      case "armchair":
        return (
          <group>
            {/* Base */}
            <mesh position={[0, -furniture.height/4, 0]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height/2, furniture.depth]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Back */}
            <mesh position={[0, furniture.height/4, -furniture.depth/2 + 0.1]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height/2, 0.2]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Arms */}
            {[-1, 1].map((x, index) => (
              <mesh 
                key={index}
                position={[x * (furniture.width/2 - 0.1), 0, 0]} 
                castShadow
              >
                <boxGeometry args={[0.2, furniture.height * 0.7, furniture.depth]} />
                <meshStandardMaterial color={new Color(furniture.color)} />
              </mesh>
            ))}
          </group>
        );

      case "bookshelf":
      case "wardrobe":
        return (
          <group>
            {/* Back panel */}
            <mesh position={[0, 0, -furniture.depth/2]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height, 0.05]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Shelves */}
            {Array.from({ length: 4 }).map((_, index) => (
              <mesh 
                key={index}
                position={[0, -furniture.height/2 + (index * furniture.height/4), 0]} 
                castShadow
              >
                <boxGeometry args={[furniture.width, 0.04, furniture.depth]} />
                <meshStandardMaterial color={new Color(furniture.color)} />
              </mesh>
            ))}
            {/* Side panels */}
            {[-1, 1].map((x, index) => (
              <mesh 
                key={index}
                position={[x * furniture.width/2, 0, 0]} 
                castShadow
              >
                <boxGeometry args={[0.05, furniture.height, furniture.depth]} />
                <meshStandardMaterial color={new Color(furniture.color)} />
              </mesh>
            ))}
          </group>
        );

      case "bed":
        return (
          <group>
            {/* Mattress */}
            <mesh position={[0, -furniture.height/4, 0]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height/2, furniture.depth]} />
              <meshStandardMaterial color={new Color("#FFFFFF")} />
            </mesh>
            {/* Frame */}
            <mesh position={[0, -furniture.height/2, 0]} castShadow>
              <boxGeometry args={[furniture.width + 0.1, furniture.height/4, furniture.depth + 0.1]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
            {/* Headboard */}
            <mesh position={[0, 0, -furniture.depth/2]} castShadow>
              <boxGeometry args={[furniture.width, furniture.height, 0.1]} />
              <meshStandardMaterial color={new Color(furniture.color)} />
            </mesh>
          </group>
        );

      default:
        return (
          <mesh castShadow>
            <boxGeometry args={[furniture.width, furniture.height, furniture.depth]} />
            <meshStandardMaterial 
              color={new Color(furniture.color)}
              emissive={isSelected ? new Color("#ffffff") : undefined}
              emissiveIntensity={isSelected ? 0.1 : 0}
            />
          </mesh>
        );
    }
  };

  return (
    <group 
      position={[
        furniture.position.x + furniture.width / 2, 
        furniture.height / 2, 
        furniture.position.y + furniture.depth / 2
      ]}
      rotation={[0, furniture.rotation * Math.PI / 180, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(furniture.id);
      }}
    >
      {getMeshByType()}
    </group>
  );
};

const RoomCanvas3D = () => {
  const { currentDesign, selectedFurnitureId, selectFurniture } = useRoom();

  if (!currentDesign) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-md">
        <p className="text-muted-foreground">Select or create a room design to start</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls target={[currentDesign.width / 2, 0, currentDesign.length / 2]} />

        {/* Room floor */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[currentDesign.width / 2, 0, currentDesign.length / 2]} 
          receiveShadow
        >
          <planeGeometry args={[currentDesign.width, currentDesign.length]} />
          <meshStandardMaterial color={new Color(currentDesign.floorColor)} />
        </mesh>

        {/* Room walls */}
        <group>
          {/* Back wall */}
          <mesh position={[currentDesign.width / 2, currentDesign.height / 2, 0]} receiveShadow>
            <boxGeometry args={[currentDesign.width, currentDesign.height, 0.1]} />
            <meshStandardMaterial color={new Color(currentDesign.wallColor)} />
          </mesh>
          
          {/* Left wall */}
          <mesh position={[0, currentDesign.height / 2, currentDesign.length / 2]} receiveShadow>
            <boxGeometry args={[0.1, currentDesign.height, currentDesign.length]} />
            <meshStandardMaterial color={new Color(currentDesign.wallColor)} />
          </mesh>
          
          {/* Right wall */}
          <mesh 
            position={[currentDesign.width, currentDesign.height / 2, currentDesign.length / 2]} 
            receiveShadow
          >
            <boxGeometry args={[0.1, currentDesign.height, currentDesign.length]} />
            <meshStandardMaterial color={new Color(currentDesign.wallColor)} />
          </mesh>
          
          {/* Far wall */}
          <mesh 
            position={[currentDesign.width / 2, currentDesign.height / 2, currentDesign.length]} 
            receiveShadow
          >
            <boxGeometry args={[currentDesign.width, currentDesign.height, 0.1]} />
            <meshStandardMaterial color={new Color(currentDesign.wallColor)} />
          </mesh>
        </group>

        {/* Furniture */}
        {currentDesign.furniture.map((furniture) => (
          <FurnitureMesh
            key={furniture.id}
            furniture={furniture}
            isSelected={selectedFurnitureId === furniture.id}
            onClick={selectFurniture}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default RoomCanvas3D;
