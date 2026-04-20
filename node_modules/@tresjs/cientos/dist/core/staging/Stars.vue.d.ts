export interface StarsProps {
    /**
     * The size of the stars.
     *
     * @type {number}
     * @memberof StarsProps
     * @default 0.1
     */
    size?: number;
    /**
     * keep the same size regardless distance.
     *
     * @type {boolean}
     * @memberof StarsProps
     * @default true
     */
    sizeAttenuation?: boolean;
    /**
     * show transparency on the stars texture.
     *
     * @type {boolean}
     * @memberof StarsProps
     * @default true
     */
    transparent?: boolean;
    /**
     * enables the WebGL to know when not to render the pixel.
     *
     * @type {number}
     * @memberof StarsProps
     * @default 0.01
     */
    alphaTest?: number;
    /**
     * number of stars.
     *
     * @type {number}
     * @memberof StarsProps
     * @default 5000
     */
    count?: number;
    /**
     * depth of star's shape.
     *
     * @type {number}
     * @memberof StarsProps
     * @default 50
     */
    depth?: number;
    /**
     * Radius of star's shape.
     *
     * @type {number}
     * @memberof StarsProps
     * @default 100
     */
    radius?: number;
    /**
     * texture of the stars.
     *
     * @type {string}
     * @memberof StarsProps
     * @default null
     */
    alphaMap?: null;
}
declare const _default: import('vue').DefineComponent<StarsProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<StarsProps> & Readonly<{}>, {
    alphaTest: number;
    depth: number;
    count: number;
    radius: number;
    transparent: boolean;
    alphaMap: null;
    size: number;
    sizeAttenuation: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
