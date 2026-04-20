import { TresColor } from '@tresjs/core';
import { Texture } from 'three';
export interface PrecipitationProps {
    /**
     * The size of the drops.
     *
     * @type {number}
     * @memberof PrecipitationProps
     * @default 0.1
     */
    size?: number;
    /**
     * The size of the precipitation area.
     *
     * @type {[number, number, number]}
     * @memberof PrecipitationProps
     * @default "[10, 10, 20]"
     */
    area?: [number, number, number];
    /**
     * The color of the shadows.
     *
     * @default '0xffffff'
     * @type {TresColor}
     * @memberof PrecipitationProps
     *
     */
    color?: TresColor;
    /**
     * Color texture of the drops.
     *
     * @type {Texture}
     * @memberof PrecipitationProps
     * @default null
     */
    map?: string | Texture | null;
    /**
     * texture of the alphaMap Drops.
     *
     * @type {Texture}
     * @memberof PrecipitationProps
     * @default null
     */
    alphaMap?: string | Texture | null;
    /**
     * enables the WebGL to know when not to render the pixel.
     *
     * @type {number}
     * @memberof PrecipitationProps
     * @default 0.01
     */
    alphaTest?: number;
    /**
     * Set the opacity of the drops.
     *
     * @type {number}
     * @memberof PrecipitationProps
     * @default 0.8
     */
    opacity?: number;
    /**
     * number of drops.
     *
     * @type {number}
     * @memberof PrecipitationProps
     * @default 5000
     */
    count?: number;
    /**
     * Speed of drops.
     *
     * @type {number}
     * @memberof PrecipitationProps
     * @default 5000
     */
    speed?: number;
    /**
     * Add randomness to the drops.
     *
     * @default 0.5
     * @type {number}
     * @memberof PrecipitationProps
     *
     */
    randomness?: number;
    /**
     * Whether the shadows should write to the depth buffer or not.
     *
     * @default false
     * @type {boolean}
     * @memberof PrecipitationProps
     *
     */
    depthWrite?: boolean;
    /**
     * show transparency on the drops texture.
     *
     * @type {boolean}
     * @memberof PrecipitationProps
     * @default true
     */
    transparent?: boolean;
    /**
     * keep the same size regardless distance.
     *
     * @type {boolean}
     * @memberof PrecipitationProps
     * @default true
     */
    sizeAttenuation?: boolean;
}
declare const _default: import('vue').DefineComponent<PrecipitationProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<PrecipitationProps> & Readonly<{}>, {
    alphaTest: number;
    depthWrite: boolean;
    color: TresColor;
    count: number;
    opacity: number;
    transparent: boolean;
    size: number;
    sizeAttenuation: boolean;
    area: [number, number, number];
    speed: number;
    randomness: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
