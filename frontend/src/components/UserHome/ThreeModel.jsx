/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, Suspense } from "react";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import ThreeFont from "../../assets/3dFont/Oswald_Bold.json";

extend({ TextGeometry });

function Model(props) {
  const font = new FontLoader().parse(ThreeFont);
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2 - 0.01, 0, -Math.PI]}>
        <mesh
          rotation={[Math.PI / 2 + 0.01, Math.PI / 2 + 0.8, -0.01]}
          position={[5.5, -1, -0.8]}
        >
          <textGeometry args={["CAR-BORN", { font, size: 1.1, height: 1 }]} />
          <meshLambertMaterial attach="material" color={"red"} />
        </mesh>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials["Material.001"]}
        />
        <lineSegments
          geometry={nodes.Object_3.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials["Material.008"]}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials["Material.010"]}
        />
        <lineSegments
          geometry={nodes.Object_6.geometry}
          material={materials["Material.016"]}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials["Material.016"]}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials["Material.020"]}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials["Material.018"]}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials["Material.029"]}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials["Material.042"]}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials["Lamborghini-text-logo-1440x900"]}
        />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials["Material.002"]}
        />
        <lineSegments
          geometry={nodes.Object_16.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          geometry={nodes.Object_23.geometry}
          material={materials["Material.011"]}
        />
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials["Material.011"]}
        />
        <mesh
          geometry={nodes.Object_25.geometry}
          material={materials["Material.011"]}
        />
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials["Material.011"]}
        />
        <mesh
          geometry={nodes.Object_27.geometry}
          material={materials["Material.013"]}
        />
        <mesh
          geometry={nodes.Object_28.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          geometry={nodes.Object_30.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          geometry={nodes.Object_33.geometry}
          material={materials["Material.012"]}
        />
        <mesh
          geometry={nodes.Object_34.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          geometry={nodes.Object_36.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          geometry={nodes.Object_37.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          geometry={nodes.Object_39.geometry}
          material={materials["Material.025"]}
        />
        <mesh
          geometry={nodes.Object_40.geometry}
          material={materials["Material.017"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");

export default function ThreeModel() {
  const object3d = useRef(null);

  return (
    <>
      <object3D ref={object3d}>
        <OrbitControls
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 2}
          maxZoom={1}
          minZoo={1}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </object3D>
    </>
  );
}
