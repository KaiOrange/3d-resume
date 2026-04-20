import { TresColor } from '@tresjs/core';
import { Side } from 'three';
import { default as HolographicMaterial } from './HolographicMaterialParameters';
declare const _default: import('vue').DefineComponent<{
    fresnelAmount?: number;
    fresnelOpacity?: number;
    blinkFresnelOnly?: boolean;
    enableBlinking?: boolean;
    enableAdditive?: boolean;
    hologramBrightness?: number;
    scanlineSize?: number;
    signalSpeed?: number;
    hologramOpacity?: number;
    hologramColor?: TresColor;
    side?: Side;
}, {
    root: import('vue').ShallowRef<any, any>;
    constructor: typeof HolographicMaterial;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    fresnelAmount?: number;
    fresnelOpacity?: number;
    blinkFresnelOnly?: boolean;
    enableBlinking?: boolean;
    enableAdditive?: boolean;
    hologramBrightness?: number;
    scanlineSize?: number;
    signalSpeed?: number;
    hologramOpacity?: number;
    hologramColor?: TresColor;
    side?: Side;
}> & Readonly<{}>, {
    side: Side;
    fresnelOpacity: number;
    fresnelAmount: number;
    scanlineSize: number;
    hologramBrightness: number;
    signalSpeed: number;
    hologramColor: TresColor;
    enableBlinking: boolean;
    blinkFresnelOnly: boolean;
    hologramOpacity: number;
    enableAdditive: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
