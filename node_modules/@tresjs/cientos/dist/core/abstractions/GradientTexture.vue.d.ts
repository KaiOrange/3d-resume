import * as THREE from 'three';
export type GradientType = 'linear' | 'radial';
interface Props {
    /**
     * A `number[]` of values between `0` and `1` representing the color positions in the gradient. `stops.length` should match `color.
     */
    stops: Array<number>;
    /**
     * A `THREE.ColorRepresentation[]` representing the colors in the gradient.
     */
    colors: Array<THREE.ColorRepresentation>;
    /**
     * Where the component should be attached within its parent.
     */
    attach?: string;
    /**
     * Height of the canvas used to draw the gradient.
     */
    height?: number;
    /**
     * Width of the canvas used to draw the gradient.
     */
    width?: number;
    /**
     * `'linear' \| 'radial'` Type of gradient to draw.
     */
    type?: GradientType;
    /**
     * Radius of the inner circle of a radial gradient.
     */
    innerCircleRadius?: number;
    /**
     * Radius of the outer circle of a radial gradient.
     */
    outerCircleRadius?: string | number;
}
declare const _default: import('vue').DefineComponent<Props, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    type: GradientType;
    attach: string;
    width: number;
    height: number;
    innerCircleRadius: number;
    outerCircleRadius: string | number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
