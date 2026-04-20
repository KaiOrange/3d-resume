import { Vector3 } from 'three';
import { TresColor } from '@tresjs/core';
type CurveType = 'centripetal' | 'chordal' | 'catmullrom';
type Points = Array<Vector3 | [number, number, number]>;
interface CatmullRomCurve3Props {
    segments?: number;
    closed?: boolean;
    curveType?: CurveType;
    tension?: number;
    points: Points;
    vertexColors?: TresColor[] | undefined;
    color?: TresColor;
    lineWidth?: number;
    alphaToCoverage?: boolean;
    dashed?: boolean;
    dashSize?: number;
    dashScale?: number;
    dashOffset?: number;
    gapSize?: number;
    worldUnits?: boolean;
}
declare const _default: import('vue').DefineComponent<CatmullRomCurve3Props, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<CatmullRomCurve3Props> & Readonly<{}>, {
    closed: boolean;
    curveType: CurveType;
    tension: number;
    segments: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
