import { Vector3, Matrix4, Raycaster } from 'three';
import { TresCamera, TresObject3D } from '@tresjs/core';
export declare const v1: Vector3;
export declare const v2: Vector3;
export declare const v3: Vector3;
export declare function calculatePosition(instance: TresObject3D, camera: TresCamera, size: {
    width: number;
    height: number;
}): number[];
export declare function isObjectBehindCamera(el: TresObject3D, camera: TresCamera): boolean;
export declare function isObjectVisible(el: TresObject3D, camera: TresCamera, raycaster: Raycaster, occlude: any): boolean;
export declare function objectScale(el: TresObject3D, camera: TresCamera): number;
export declare function objectZIndex(el: TresObject3D, camera: TresCamera, zIndexRange: Array<number>): number | undefined;
export declare const epsilon: (value: number) => number;
export declare function getCSSMatrix(matrix: Matrix4, multipliers: number[], prepend?: string): string;
export declare const getCameraCSSMatrix: (matrix: Matrix4) => string;
export declare const getObjectCSSMatrix: (matrix: Matrix4, factor: number) => string;
