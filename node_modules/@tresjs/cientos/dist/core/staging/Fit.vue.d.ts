import { Box3, Group, Vector3, Object3D } from 'three';
export interface Props {
    /**
     * If `into` is:
     * - omitted or explicitly `undefined`: position/scale children to fit into a 1 × 1 × 1 `Box3` at world origin.
     * - `null`: turn off `<Fit />`; reset scale/position of children.
     * - `number`: convert argument to `Vector3(number, number, number)`.
     * - `[number, number, number]`: convert argument to `Vector3`.
     * - `Vector3`: position/scale children to fit inside a `Box3` of size `Vector3` at target objects' cumulative center.
     * - `Box3`: position/scale children to fit inside `Box3`.
     * - `Object3D`: position/scale children to fit inside calculated `Box3`. [See `THREE.Box3.setFromObject`](https://threejs.org/docs/#api/en/math/Box3.setFromObject). `<Fit />` must not contain the `Object3D` and vice-versa.
     */
    into?: number | [number, number, number] | Vector3 | Box3 | Object3D | null;
    /** [See `precise` argument in `THREE.Box3.setFromObject`](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject) */
    precise?: boolean;
}
declare const props: Readonly<{}> & {
    readonly into: number | Box3 | Vector3 | Object3D<import('three').Object3DEventMap> | [number, number, number] | null;
    readonly precise: boolean;
} & {
    readonly precise: boolean;
};
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        outer: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
        middle: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
declare const __VLS_component: import('vue').DefineComponent<Props, {
    instance: import('vue').ShallowRef<any, any>;
    fit: (into?: typeof props.into, precise?: boolean) => void;
    update: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    precise: boolean;
    into: number | [number, number, number] | Vector3 | Box3 | Object3D | null;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
