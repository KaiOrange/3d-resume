export interface MouseParallaxProps {
    /**
     * Whether to disable the mouse controls.
     * @type {boolean}
     * @default false
     * @memberof MouseParallaxProps
     *
     */
    disabled?: boolean;
    /**
     * The factor to multiply the mouse movement by.
     * @type {number | [number, number]}
     * @default 2.5
     * @memberof MouseParallaxProps
     *
     */
    factor?: number | [number, number];
    /**
     * The factor to smooth the mouse movement by.
     * @type {number | [number, number]}
     * @default 2.5
     * @memberof MouseParallaxProps
     *
     */
    ease?: number | [number, number];
    /**
     * Whether to apply the parallax effect to the local canvas.
     * @type {boolean}
     * @default false
     * @memberof MouseParallaxProps
     *
     */
    local?: boolean;
}
declare const _default: import('vue').DefineComponent<MouseParallaxProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<MouseParallaxProps> & Readonly<{}>, {
    disabled: boolean;
    factor: number | [number, number];
    ease: number | [number, number];
    local: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
