/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ThreeModel from "./ThreeModel";

const container = css`
  height: 71.5vh;
  width: 100%;
  overflow: hidden;
  background-color: black;
`;

const color = 0xffffff;
const intensity = 1;

export default function CarModel() {
  return (
    <div css={container}>
      <Canvas
        camera={{
          fov: 5,
          near: 10,
          aspect: window.innerWidth / window.innerHeight,
          far: 1000,
          position: [50, 20, 50],
        }}
      >
        <pointLight color={color} intensity={intensity} />
        <directionalLight color={color} intensity={intensity} />
        <ambientLight color={color} intensity={intensity} />
        <ThreeModel />
      </Canvas>
    </div>
  );
}
