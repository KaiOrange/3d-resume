import { TresColor, TresVector3 } from '@tresjs/core';
export interface OceanProps {
    /**
     * The textureWidth of the internal WebGLRenderTarget.
     *
     * @default 512
     * @type {number}
     * @memberof OceanProps
     *
     */
    textureWidth?: number;
    /**
     * The textureHeight of the internal WebGLRenderTarget.
     *
     * @default 512
     * @type {number}
     * @memberof OceanProps
     *
     */
    textureHeight?: number;
    /**
     * The normal texture of the ocean.
     * @default 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water/Water_1_M_Normal.jpg'
     * @type {string}
     * @memberof OceanProps
     * @see https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
     */
    waterNormals?: string;
    /**
     * The sun direction
     * @default '[0,0,0]'
     * @type {TresVector3}
     * @memberof OceanProps
     */
    sunDirection?: TresVector3;
    /**
     * The sun color.
     *
     * @default '#fff'
     * @type {TresColor}
     * @memberof OceanProps
     *
     */
    sunColor?: TresColor;
    /**
     * The water color.
     *
     * @default '#001e0f'
     * @type {TresColor}
     * @memberof OceanProps
     *
     */
    waterColor?: TresColor;
    /**
     * The distortion scale of the reflections.
     * @default 3.7
     * @type {number}
     * @memberof OceanProps
     *
     */
    distortionScale?: number;
    /**
     * The size of the normal texture.
     *
     * @default 1
     * @type {number}
     * @memberof OceanProps
     *
     */
    size?: number;
    /**
     * The ClipBias.
     *
     * @default 0.0
     * @type {number}
     * @memberof OceanProps
     *
     */
    clipBias?: number;
    /**
     * The alpha factor.
     *
     * @default 1.0
     * @type {number}
     * @memberof OceanProps
     *
     */
    alpha?: number;
    /**
     * ThreeJs side material property.
     *
     * @default FrontSide
     * @type {TresVector3}
     * @memberof OceanProps
     *
     */
    side?: TresVector3;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        waterRef: unknown;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<OceanProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<OceanProps> & Readonly<{}>, {
    side: TresVector3;
    size: number;
    textureWidth: number;
    textureHeight: number;
    clipBias: number;
    waterNormals: string;
    sunDirection: TresVector3;
    sunColor: TresColor;
    waterColor: TresColor;
    distortionScale: number;
    alpha: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
