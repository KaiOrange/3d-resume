import { Mesh } from 'three';
interface MaskProps {
    /** Id of the stencil buffer to use. Each mask must have an id. Multiple masks can refer to the same id. */
    id: number;
    /** Whether the colors of the masks own material will leak through, default: false */
    colorWrite?: boolean;
    /** Whether the depth of the masks own material will leak through, default: false */
    depthWrite?: boolean;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        meshRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<MaskProps, {
    instance: import('vue').ShallowRef<Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap> | undefined, Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap> | undefined>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<MaskProps> & Readonly<{}>, {
    depthWrite: boolean;
    id: number;
    colorWrite: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
