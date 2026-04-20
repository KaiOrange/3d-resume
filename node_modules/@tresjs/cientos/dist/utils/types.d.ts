import { Camera, OrthographicCamera, PerspectiveCamera } from 'three';
export declare const isPerspectiveCamera: (camera?: Camera) => camera is PerspectiveCamera;
export declare const isOrthographicCamera: (camera?: Camera) => camera is OrthographicCamera;
