import { Group } from 'three';
import { TresColor } from '@tresjs/core';
export interface ContactShadowsProps {
    /**
     * The opacity of the shadows.
     *
     * @default 1
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    opacity?: number;
    /**
     * The blur of the shadows.
     *
     * @default 1
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    blur?: number;
    /**
     * The color of the shadows.
     *
     * @default '#000000'
     * @type {TresColor}
     * @memberof ContactShadowsProps
     *
     */
    color?: TresColor;
    /**
     * The tint at the "core" of the shadows.
     *
     * @default undefined
     * @type {TresColor}
     * @memberof ContactShadowsProps
     *
     */
    tint?: TresColor;
    /**
     * The scale of the shadows.
     */
    scale?: number | [x: number, y: number];
    /**
     * The width of the shadow plane.
     *
     * @default 1
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    width?: number;
    /**
     * The height of the shadow plane.
     *
     * @default 1
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    height?: number;
    /**
     * How far the OrthographicCamera should be to capture the shadows.
     *
     * @default 10
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    far?: number;
    /**
     * Whether the shadows should be smooth or not.
     *
     * @default true
     * @type {boolean}
     * @memberof ContactShadowsProps
     *
     */
    smooth?: boolean;
    /**
     * The resolution of the shadows.
     *
     * @default 512
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    resolution?: number;
    /**
     * The number of frames to render the shadows.
     *
     * @default Infinity
     * @type {number}
     * @memberof ContactShadowsProps
     *
     */
    frames?: number;
    /**
     * Whether the shadows should write to the depth buffer or not.
     *
     * @default false
     * @type {boolean}
     * @memberof ContactShadowsProps
     *
     */
    depthWrite?: boolean;
}
declare const _default: import('vue').DefineComponent<ContactShadowsProps, {
    instance: Group<import('three').Object3DEventMap>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<ContactShadowsProps> & Readonly<{}>, {
    depthWrite: boolean;
    color: TresColor;
    scale: number | [x: number, y: number];
    far: number;
    width: number;
    height: number;
    opacity: number;
    blur: number;
    resolution: number;
    frames: number;
    tint: TresColor;
    smooth: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
