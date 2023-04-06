declare module "*.gif";
declare module "*.png";
declare module "*.svg";
declare module "*.jpg";
declare module "*.gltf";
declare module "*.glb";
declare module "gsap/all";
declare module "*.module.css";
declare module "jwt-decode";
declare module "@ckeditor/ckeditor5-react";

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_NAVER_CLIENT_ID: string;
    readonly REACT_APP_NAVER_CLIENT_SECRET: string;
    readonly REACT_APP_IMG_URL: string;
  }
}
