import { TresColor } from '@tresjs/core';
import { BufferGeometry } from 'three';
export type Float3 = [number, number, number];
export interface SuperFormulaProps {
    /**
     * Number of horizontal mesh segments
     */
    widthSegments?: number;
    /**
     * Number of vertical mesh segments
     */
    heightSegments?: number;
    /**
     * The 3D Superformula is the spherical product of 2 2D superformula curves: here called curves "A" and "B".
     * Number of radial arms/ripples of A, corresponding to "m" [in this article.](https://en.wikipedia.org/wiki/Superformula)
     */
    numArmsA?: number;
    /**
     * A's 3 exponents
     */
    expA?: Float3;
    /**
     * For B, number of radial arms/ripples
     */
    numArmsB?: number;
    /**
     * B's 3 exponents
     */
    expB?: Float3;
    /**
     * If no material is provided, a color for the default material
     */
    color?: TresColor;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        superformulaRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<SuperFormulaProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SuperFormulaProps> & Readonly<{}>, {
    color: TresColor;
    widthSegments: number;
    heightSegments: number;
    numArmsA: number;
    expA: Float3;
    numArmsB: number;
    expB: Float3;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
