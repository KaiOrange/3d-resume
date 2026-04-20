interface SoftShadowsProps {
    /** Size of the light source (the larger the softer the light), default: 25 */
    size?: number;
    /** Number of samples (more samples less noise but more expensive), default: 10 */
    samples?: number;
    /** Depth focus, use it to shift the focal point (where the shadow is the sharpest), default: 0 (the beginning) */
    focus?: number;
}
declare const _default: import('vue').DefineComponent<SoftShadowsProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SoftShadowsProps> & Readonly<{}>, {
    focus: number;
    samples: number;
    size: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
