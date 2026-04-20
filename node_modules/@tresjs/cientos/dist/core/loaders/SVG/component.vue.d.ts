import { TresOptions } from '@tresjs/core';
import { MeshBasicMaterialParameters } from 'three';
interface SVGProps {
    /**
     *
     * The SVG data or path to an SVG file
     *
     * @type {string}
     * @required
     * @memberof SVGProps
     *
     */
    src: string;
    /**
     *
     * Whether to draw strokes
     *
     * @type {boolean}
     * @default false
     * @memberof SVGProps
     *
     */
    skipStrokes?: boolean;
    /**
     *
     * Whether to draw fills
     *
     * @type {boolean}
     * @default false
     * @memberof SVGProps
     *
     */
    skipFills?: boolean;
    /**
     *
     * Fill material properties
     *
     * @type {MeshBasicMaterialParameters}
     * @default undefined
     * @memberof SVGProps
     *
     */
    fillMaterial?: MeshBasicMaterialParameters;
    /**
     *
     * Stroke material properties
     *
     * @type {MeshBasicMaterialParameters}
     * @default undefined
     * @memberof SVGProps
     *
     */
    strokeMaterial?: MeshBasicMaterialParameters;
    /**
     *
     * Fill Mesh properties
     *
     * @type {TresOptions}
     * @default undefined
     * @memberof SVGProps
     *
     */
    fillMeshProps?: TresOptions;
    /**
     *
     * Stroke Mesh properties
     *
     * @type {TresOptions}
     * @default undefined
     * @memberof SVGProps
     *
     */
    strokeMeshProps?: TresOptions;
    /**
     *
     * Depth type
     * How should the resulting meshes and materials be rendered?
     * 'renderOrder' disables `depthWrite` and sets the `renderOrder` of each layer.
     * 'flat' disables `depthWrite` on materials.
     * 'offsetZ' enables `depthWrite` and inserts a small distance between each layer on the z-axis to avoid z-fighting.
     * number is treated the same as 'offsetZ'; the number is used as the distance between layers
     *
     * depthWrite documentation: https://threejs.org/docs/#api/en/materials/Material.depthWrite
     * renderOrder documentation: https://threejs.org/docs/?q=mesh#api/en/core/Object3D.renderOrder
     *
     * @type { 'renderOrder' | 'flat' | 'offsetZ' | number }
     * @default 'renderOrder'
     * @memberof SVGProps
     *
     */
    depth?: 'renderOrder' | 'flat' | 'offsetZ' | number;
}
declare const _default: import('vue').DefineComponent<SVGProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SVGProps> & Readonly<{}>, {
    depth: "renderOrder" | "flat" | "offsetZ" | number;
    skipStrokes: boolean;
    skipFills: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
