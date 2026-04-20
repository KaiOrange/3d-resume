export interface ScrollControlsProps {
    /**
     * The scroll size.
     *
     * @type {number}
     * @default 4
     * @memberof ScrollControlsProps
     */
    pages?: number;
    /**
     * The distance to move the camera.
     *
     * @type {number}
     * @default 4
     * @memberof ScrollControlsProps
     */
    distance?: number;
    /**
     * The smooth factor of the scrolling.
     *
     * @type {number}
     * @default 0.1
     * @memberof ScrollControlsProps
     */
    smoothScroll?: number;
    /**
     * Whether the scroll is horizontal or vertical.
     *
     * @type {boolean}
     * @default false
     * @memberof ScrollControlsProps
     */
    horizontal?: boolean;
    /**
     * Whether to use the HTML scroll.
     *
     * @type {boolean}
     * @default false
     * @memberof ScrollControlsProps
     */
    htmlScroll?: boolean;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        wrapperRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Group<import('three').Object3DEventMap>, typeof import('three').Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Group<import('three').Object3DEventMap>, typeof import('three').Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<{
    pages?: number;
    distance?: number;
    smoothScroll?: number;
    horizontal?: boolean;
    htmlScroll?: boolean;
}, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<{
    pages?: number;
    distance?: number;
    smoothScroll?: number;
    horizontal?: boolean;
    htmlScroll?: boolean;
}> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    distance: number;
    pages: number;
    smoothScroll: number;
    horizontal: boolean;
    htmlScroll: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
