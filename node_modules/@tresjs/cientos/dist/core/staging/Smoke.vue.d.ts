import { TresColor } from '@tresjs/core';
export interface SmokeProps {
    /**
     * The color of the smoke.
     * @default 0xffffff
     * @type {TresColor}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    color?: TresColor;
    /**
     * The strength of the opacity.
     * @default 0.5
     * @type {number}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    opacity?: number;
    /**
     * The rotation speed of the smoke.
     * @default 0.4
     * @type {number}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    speed?: number;
    /**
     * The base width.
     * @default 4
     * @type {number}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
     */
    width?: number;
    /**
     * The base depth.
     * @default 10
     * @type {number}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
     */
    depth?: number;
    /**
     * The number of smoke to render.
     * @default 10
     * @type {number}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    segments?: number;
    /**
     * The texture of the smoke.
     * @default 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/clouds/defaultCloud.png'
     * @type {string}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    texture?: string;
    /**
     * The depthTest.
     * @default true
     * @type {boolean}
     * @memberof SmokeProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    depthTest?: boolean;
}
declare const _default: import('vue').DefineComponent<SmokeProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SmokeProps> & Readonly<{}>, {
    texture: string;
    depthTest: boolean;
    color: TresColor;
    width: number;
    depth: number;
    segments: number;
    opacity: number;
    speed: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
