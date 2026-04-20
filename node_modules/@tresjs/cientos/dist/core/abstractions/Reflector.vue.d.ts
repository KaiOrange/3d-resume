import { Reflector } from 'three-stdlib';
import { TresColor } from '@tresjs/core';
export interface ReflectorProps {
    /**
     * The color of the reflector.
     *
     * @default '#333'
     * @type {TresColor}
     * @memberof ReflectorProps
     *
     */
    color?: TresColor;
    /**
     * The textureWidth of the internal WebGLRenderTarget.
     *
     * @default window.innerWidth
     * @type {number}
     * @memberof ReflectorProps
     *
     */
    textureWidth?: number;
    /**
     * The textureHeight of the internal WebGLRenderTarget.
     *
     * @default window.innerHeight
     * @type {number}
     * @memberof ReflectorProps
     *
     */
    textureHeight?: number;
    /**
     * The clipBias.
     *
     * @default 0
     * @type {number}
     * @memberof ReflectorProps
     *
     */
    clipBias?: number;
    /**
     * The multisample.
     *
     * @default 4
     * @type {number}
     * @memberof ReflectorProps
     *
     */
    multisample?: number;
    /**
     * Custom shader.
     *
     * @default Reflector.ReflectorShader
     * @type {object}
     * @memberof ReflectorProps
     *
     */
    shader?: object;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        reflectorRef: unknown;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ReflectorProps, {
    instance: import('vue').ShallowRef<Reflector | undefined, Reflector | undefined>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ReflectorProps> & Readonly<{}>, {
    color: TresColor;
    textureWidth: number;
    textureHeight: number;
    clipBias: number;
    multisample: number;
    shader: object;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
