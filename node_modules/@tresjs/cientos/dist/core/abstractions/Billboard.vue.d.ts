import { Camera, Group } from 'three';
export interface BillboardProps {
    /**
     * Whether the Billboard should face the camera automatically on every frame.
     */
    autoUpdate?: boolean;
    /**
     * Whether to lock the x-axis.
     */
    lockX?: boolean;
    /**
     * Whether to lock the y-axis.
     */
    lockY?: boolean;
    /**
     * Whether to lock the z-axis.
     */
    lockZ?: boolean;
}
declare function update(camera?: Camera): void;
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        outerRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
        innerRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<Group<import('three').Object3DEventMap>, typeof Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
declare const __VLS_component: import('vue').DefineComponent<BillboardProps, {
    instance: import('vue').ShallowRef<Group<import('three').Object3DEventMap>, Group<import('three').Object3DEventMap>>;
    update: typeof update;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BillboardProps> & Readonly<{}>, {
    autoUpdate: boolean;
    lockX: boolean;
    lockY: boolean;
    lockZ: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
