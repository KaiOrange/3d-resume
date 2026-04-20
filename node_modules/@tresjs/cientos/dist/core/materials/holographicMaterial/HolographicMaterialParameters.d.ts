import { Clock, Color, ShaderMaterial, Blending, Side } from 'three';
interface HolographicMaterialParameters {
    time?: number;
    fresnelOpacity?: number;
    fresnelAmount?: number;
    scanlineSize?: number;
    hologramBrightness?: number;
    signalSpeed?: number;
    hologramColor?: Color;
    enableBlinking?: boolean;
    blinkFresnelOnly?: boolean;
    hologramOpacity?: number;
    blendMode?: Blending;
    side?: Side;
    depthTest?: boolean;
}
declare class HolographicMaterial extends ShaderMaterial {
    clock: Clock;
    /**
     * Create a HolographicMaterial.
     *
     * @param {object} parameters - The parameters to configure the material.
     * @param {number} [parameters.time] - The time uniform representing animation time.
     * @param {number} [parameters.fresnelOpacity] - The opacity for the fresnel effect.
     * @param {number} [parameters.fresnelAmount] - The strength of the fresnel effect.
     * @param {number} [parameters.scanlineSize] - The size of the scanline effect.
     * @param {number} [parameters.hologramBrightness] - The brightness of the hologram.
     * @param {number} [parameters.signalSpeed] - The speed of the signal effect.
     * @param {Color} [parameters.hologramColor] - The color of the hologram.
     * @param {boolean} [parameters.enableBlinking] - Enable/disable blinking effect.
     * @param {boolean} [parameters.blinkFresnelOnly] - Enable blinking only on the fresnel effect.
     * @param {number} [parameters.hologramOpacity] - The opacity of the hologram.
     * @param {number} [parameters.blendMode] - The blending mode. Use `THREE.NormalBlending` or `THREE.AdditiveBlending`.
     * @param {number} [parameters.side] - The rendering side. Use `THREE.FrontSide`,
     *  `THREE.BackSide`, or `THREE.DoubleSide`.
     * @param {boolean} [parameters.depthTest] - Enable or disable depthTest.
     */
    constructor(parameters?: HolographicMaterialParameters);
    update(): void;
}
export default HolographicMaterial;
