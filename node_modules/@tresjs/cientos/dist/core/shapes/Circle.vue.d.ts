import { TresColor } from '@tresjs/core';
import { CircleGeometry } from 'three';
export interface CircleProps {
    /**
     * The radius, segment, thetaStart, thetaLength of the circle.
     * @default [1, 32, 0, Math.PI * 2]
     * @type {number[]}
     * @memberof CircleProps
     * @see https://threejs.org/docs/#api/en/geometries/CircleGeometry
     */
    args?: ConstructorParameters<typeof CircleGeometry>;
    /**
     * The color of the circle.
     * @default 0xffffff
     * @type {TresColor}
     * @memberof CircleProps
     * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
     */
    color?: TresColor;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        circleRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
declare const __VLS_component: import('vue').DefineComponent<CircleProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<CircleProps> & Readonly<{}>, {
    color: TresColor;
    args: ConstructorParameters<typeof CircleGeometry>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
