import { TresColor } from '@tresjs/core';
import { BoxGeometry } from 'three';
export interface BoxProps {
    /**
     * The width, height, depth, segments and radius.
     * @default [1, 1, 1, 2, 0.1]
     * @type {number[]}
     * @memberof BoxProps
     * @see https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/RoundedBoxGeometry.js
     *
     */
    args?: ConstructorParameters<typeof BoxGeometry>;
    /**
     * The color of the box.
     * @default 0xffffff
     * @type {TresColor}
     * @memberof BoxProps
     * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
     */
    color?: TresColor;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        roundedBoxRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
declare const __VLS_component: import('vue').DefineComponent<BoxProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BoxProps> & Readonly<{}>, {
    color: TresColor;
    args: ConstructorParameters<typeof BoxGeometry>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
