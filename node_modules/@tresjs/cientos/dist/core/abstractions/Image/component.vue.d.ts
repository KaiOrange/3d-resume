import { Side, Texture } from 'three';
import { TresColor } from '@tresjs/core';
export type ImageProps = {
    /**
     * Number of divisions in the the default geometry.
     */
    segments?: number;
    /**
     * Scale of the geometry.
     */
    scale?: number | [number, number];
    /**
     * Color multiplied into the image texture. Default is white.
     */
    color?: TresColor;
    /**
     * Shrinks or enlarges the image texture.
     */
    zoom?: number;
    /**
     * Border radius applied to image texture. Intended for rectangular geometries.
     */
    radius?: number;
    /**
     * Power of grayscale effect. 0 is no grayscale. 1 is full grayscale.
     */
    grayscale?: number;
    /**
     * Whether this material is tone mapped according to the renderer's toneMapping setting. [See THREE.material.tonemapped](https://threejs.org/docs/?q=material#api/en/materials/Material.toneMapped)
     */
    toneMapped?: boolean;
    /**
     * Whether the image material should be transparent. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent)
     */
    transparent?: boolean;
    /**
     * Opacity of the image material. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent)
     */
    opacity?: number;
    /**
     * THREE.Side of the image material. [See THREE.material.side](https://threejs.org/docs/?q=material#api/en/materials/Material.side)
     */
    side?: Side;
} & ({
    /**
     * Image texture to display on the geometry.
     */
    texture: Texture;
    url?: never;
} | {
    texture?: never;
    /**
     * Image URL to load and display on the geometry.
     */
    url: string;
});
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        imageRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import('vue').PublicProps>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
