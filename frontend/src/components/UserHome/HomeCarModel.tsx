/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import ThreeModel from "./ThreeModel";

const container = css`
  height: 71.5vh;
  width: 100%;
  overflow: hidden;
  background-color: black;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
`;

const color = 0xffffff;
const intensity = 1;

export default function CarModel() {
  return (
    <div css={container}>
      <div
        css={{
          width: "80%",
          height: "100%",
        }}>
        <Canvas
          camera={{
            fov: 5,
            near: 10,
            aspect: window.innerWidth / window.innerHeight,
            far: 1000,
            position: [-45, 10, 50],
          }}>
          <pointLight color={color} intensity={intensity} />
          <directionalLight color={color} intensity={intensity} />
          <ambientLight color={color} intensity={intensity} />
          <ThreeModel />
        </Canvas>
      </div>
    </div>
  );
}
