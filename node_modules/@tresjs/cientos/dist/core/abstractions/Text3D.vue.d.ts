export interface Glyph {
    _cachedOutline: string[];
    ha: number;
    o: string;
}
export interface FontData {
    boundingBox: {
        yMax: number;
        yMin: number;
    };
    familyName: string;
    glyphs: {
        [k: string]: Glyph;
    };
    resolution: number;
    underlineThickness: number;
}
export interface Text3DProps {
    /**
     *
     *  The JSON font to use for the text.
     *  Text3D requires fonts in JSON format generated through [typeface.json](http://gero3.github.io/facetype.js)
     *
     * @type {(FontData | string)}
     * @memberof Text3DProps
     * @see https://threejs.org/docs/index.html?q=TEXT#examples/en/geometries/TextGeometry
     */
    font: FontData | string;
    /**
     * The text to display.
     *
     * @type {string}
     * @memberof Text3DProps
     */
    text?: string;
    /**
     * The size of the text.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 0.5
     */
    size?: number;
    /**
     * The height of the text.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 0.2
     */
    height?: number;
    /**
     * The curve segments of the text.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 5
     */
    curveSegments?: number;
    /**
     * Turn on bevel
     *
     * @type {boolean}
     * @memberof Text3DProps
     * @default true
     */
    bevelEnabled?: boolean;
    /**
     * How deep into text bevel goes.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 0.05
     */
    bevelThickness?: number;
    /**
     * How far from text outline is bevel.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 0.02
     */
    bevelSize?: number;
    /**
     * How far from text outline is bevel.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 0
     */
    bevelOffset?: number;
    /**
     * How many bevel segments.
     *
     * @type {number}
     * @memberof Text3DProps
     * @default 4
     */
    bevelSegments?: number;
    /**
     * Whether to center the text.
     *
     * @type {boolean}
     * @memberof Text3DProps
     * @default false
     */
    center?: boolean;
    /**
     * Whether to update the text.
     *
     * @type {boolean}
     * @memberof Text3DProps
     * @default false
     */
    needUpdates?: boolean;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        text3DRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>, typeof import('three').Mesh>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
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
declare const __VLS_component: import('vue').DefineComponent<Text3DProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Text3DProps> & Readonly<{}>, {
    center: boolean;
    height: number;
    curveSegments: number;
    size: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelOffset: number;
    bevelSegments: number;
    needUpdates: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
