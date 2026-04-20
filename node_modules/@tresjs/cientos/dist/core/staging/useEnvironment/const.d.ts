import { VectorFlexibleParams } from '@tresjs/core';
export interface EnvironmentOptions {
    /**
     * If true, the environment will be set as the scene's background.
     *
     * @type {boolean}
     * @default false
     */
    background?: boolean | string;
    /**
     * The blur radius of the environment.
     *
     * @type {number}
     * @default 0
     */
    blur?: number;
    /**
     * The files to load. If a string is provided, it will be loaded as an equirectangular texture.
     * If an array is provided, it will be loaded as a cube texture.
     *
     * @type {(string | string[])}
     */
    files?: string | string[];
    /**
     * The path to the files.
     *
     * @type {string}
     * @default '/'
     */
    path?: string;
    /**
     * The preset to use. If provided, the files and path props will be ignored.
     *
     * @type {EnvironmentPresetsType}
     */
    preset?: EnvironmentPresetsType;
    /**
     * The resolution of the WebGLCubeRenderTarget.
     *
     * @type {number}
     * @default 256
     */
    resolution?: number;
    /**
     * The near of the CubeCamera.
     *
     * @type {number}
     * @default 1
     */
    near?: number;
    /**
     * The far of the CubeCamera.
     *
     * @type {number}
     * @default 1000
     */
    far?: number;
    /**
     * The frames of the cubeCamera.update.
     *
     * @type {number}
     * @default Infinity
     */
    frames?: number;
    /**
     * The intensity of the background.
     *
     * @type {number}
     * @default 1
     */
    backgroundIntensity?: number;
    /**
     * The rotation of the background.
     *
     * @type {VectorFlexibleParams}
     * @default [0, 0, 0]
     */
    backgroundRotation?: VectorFlexibleParams;
    /**
     * The intensity of the environment.
     *
     * @type {number}
     * @default 1
     */
    environmentIntensity?: number;
    /**
     * The rotation of the environment.
     *
     * @type {VectorFlexibleParams}
     * @default [0, 0, 0]
     */
    environmentRotation?: VectorFlexibleParams;
    /**
     * If true, the environment rotation will be synced with the background rotation.
     * This means when backgroundRotation changes, environmentRotation will be updated to match.
     *
     * @type {boolean}
     * @default false
     */
    syncMaterials?: boolean;
}
export declare const environmentPresets: {
    sunset: string;
    studio: string;
    city: string;
    umbrellas: string;
    night: string;
    forest: string;
    snow: string;
    dawn: string;
    hangar: string;
    urban: string;
    modern: string;
    shangai: string;
};
export type EnvironmentPresetsType = keyof typeof environmentPresets;
