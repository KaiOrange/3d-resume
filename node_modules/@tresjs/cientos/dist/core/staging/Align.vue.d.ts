import { Group, Object3D, Box3, Sphere, Vector3 } from 'three';
import { MaybeRefOrGetter } from 'vue';
export interface OnAlignCallbackProps {
    /** The next parent above <Align /> */
    parent: Object3D;
    /** The outmost container group of the <Align/> component */
    container: Object3D;
    width: number;
    height: number;
    depth: number;
    boundingBox: Box3;
    boundingSphere: Sphere;
    center: Vector3;
    verticalAlignment: number;
    horizontalAlignment: number;
    depthAlignment: number;
}
export interface AlignProps {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    front?: boolean;
    back?: boolean;
    /** Disable all axes */
    disable?: boolean;
    /** Disable x-axis alignment */
    disableX?: boolean;
    /** Disable y-axis alignment */
    disableY?: boolean;
    /** Disable z-axis alignment */
    disableZ?: boolean;
    /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
    precise?: boolean;
    /** Callback, fires when updating, after measurement */
    onAlign?: (props: OnAlignCallbackProps) => void;
    /** Optional cacheKey to keep the component from recalculating on every render */
    cacheKey?: MaybeRefOrGetter<any>;
}
declare function update(): void;
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        ref: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
        outer: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
        inner: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
declare const __VLS_component: import('vue').DefineComponent<AlignProps, {
    instance: import('vue').ShallowRef<Group<import('three').Object3DEventMap> | undefined, Group<import('three').Object3DEventMap> | undefined>;
    update: typeof update;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<AlignProps> & Readonly<{}>, {
    precise: boolean;
    cacheKey: MaybeRefOrGetter<any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
