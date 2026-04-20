import * as THREE from 'three';
interface Size {
    width: number;
    height: number;
}
export declare const calculateScaleFactor: (point3: THREE.Vector3, radiusPx: number, camera: THREE.Camera, size: Size) => number;
export {};
