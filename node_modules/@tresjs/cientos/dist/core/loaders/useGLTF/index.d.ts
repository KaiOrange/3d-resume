import { TresLoader, TresObject3D } from '@tresjs/core';
import { DRACOLoader, GLTF } from 'three-stdlib';
import { AnimationClip, Material, Scene } from 'three';
export interface GLTFLoaderOptions {
    /**
     * Whether to use Draco compression.
     *
     * @type {boolean}
     * @memberof GLTFLoaderOptions
     */
    draco?: boolean;
    /**
     * The path to the Draco decoder.
     *
     * @type {string}
     * @memberof GLTFLoaderOptions
     */
    decoderPath?: string;
}
export interface GLTFResult {
    animations: Array<AnimationClip>;
    nodes: Record<string, TresObject3D>;
    materials: Record<string, Material>;
    scene: Scene;
}
export interface TresGLTFLoaderType extends TresLoader<GLTF> {
    setDRACOLoader?: (dracoLoader: DRACOLoader) => void;
}
/**
 * Loads a GLTF file and returns a THREE.Object3D.
 *
 * @export
 * @template T
 * @param {T} path - Path or array of paths to the GLTF file(s)
 * @param {GLTFLoaderOptions} [options] - Options for the loader
 * @param {(loader: TresGLTFLoaderType) => void} [extendLoader] - Function to extend the loader
 * @returns {Promise<T extends string[] ? GLTFResult[] : GLTFResult>} Promise that resolves with the loaded model(s)
 */
export declare function useGLTF<T extends string | string[]>(path: T, options?: GLTFLoaderOptions, extendLoader?: (loader: TresGLTFLoaderType) => void): Promise<T extends string[] ? GLTFResult[] : GLTFResult>;
