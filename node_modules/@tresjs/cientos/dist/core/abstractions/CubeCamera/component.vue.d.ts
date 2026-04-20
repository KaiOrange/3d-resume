import { Group } from 'three';
import { CubeCameraOptions } from './useCubeCamera';
import { MaybeRefOrGetter } from 'vue';
type Props = {
    /** Number of frames to render, Infinity */
    frames?: MaybeRefOrGetter<number>;
} & CubeCameraOptions;
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        groupRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    instance: import('vue').ShallowRef<Group<import('three').Object3DEventMap> | undefined, Group<import('three').Object3DEventMap> | undefined>;
    fbo: import('vue').ComputedRef<import('three').WebGLCubeRenderTarget>;
    camera: import('vue').ComputedRef<import('three').CubeCamera>;
    update: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    frames: MaybeRefOrGetter<number>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
