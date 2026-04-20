import { Vector2, Vector3 } from 'three';
import { TresColor } from '@tresjs/core';
type Points = (Vector3 | Vector2 | [number, number, number] | [number, number] | number)[];
type VertexColors = Array<TresColor>;
export interface LineProps {
    points: Points;
    vertexColors?: VertexColors | null;
    color?: TresColor;
    lineWidth?: number;
    worldUnits?: boolean;
    alphaToCoverage?: boolean;
    dashed?: boolean;
    dashSize?: number;
    gapSize?: number;
    dashScale?: number;
    dashOffset?: number;
}
declare const _default: import('vue').DefineComponent<LineProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<LineProps> & Readonly<{}>, {
    color: TresColor;
    alphaToCoverage: boolean;
    vertexColors: VertexColors | null;
    dashSize: number;
    gapSize: number;
    lineWidth: number;
    worldUnits: boolean;
    dashed: boolean;
    dashScale: number;
    dashOffset: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
