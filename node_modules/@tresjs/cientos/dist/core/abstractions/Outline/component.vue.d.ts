import { TresColor } from '@tresjs/core';
interface OutlineProps {
    /** Outline color, default: black */
    color?: TresColor;
    /** Line thickness is independent of zoom, default: false */
    screenspace?: boolean;
    /** Outline opacity, default: 1 */
    opacity?: number;
    /** Outline transparency, default: false */
    transparent?: boolean;
    /** Outline thickness, default 0.05 */
    thickness?: number;
    /** Geometry crease angle (-1 === no crease), default: Math.PI, See [BufferGeometryUtils.toCreasedNormals](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.toCreasedNormals) */
    angle?: number;
    toneMapped?: boolean;
    polygonOffset?: boolean;
    polygonOffsetFactor?: number;
    renderOrder?: number;
}
declare const _default: import('vue').DefineComponent<OutlineProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<OutlineProps> & Readonly<{}>, {
    color: TresColor;
    renderOrder: number;
    opacity: number;
    polygonOffset: boolean;
    polygonOffsetFactor: number;
    toneMapped: boolean;
    transparent: boolean;
    angle: number;
    thickness: number;
    screenspace: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
