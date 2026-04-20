import { Euler, Vector2, Texture } from 'three';
import { TresColor } from '@tresjs/core';
export interface MeshReflectionMaterialProps {
    /** Length in pixels of one side of the square reflective textures. */
    resolution?: number;
    /** Overall strength of the reflection. */
    mix?: number;
    /** Strength of the sharp reflection on smooth surfaces. */
    sharpMix?: number;
    /** Sharp reflection can be faded out by depth – distance from the reflective surface. Performance note: if the value is greater than `0`, a depth texture will be created. */
    sharpDepthScale?: number;
    /** Sharp reflection depth falloff bias. */
    sharpDepthBias?: number;
    /** Sharp reflection depth falloff start. */
    sharpDepthEdgeMin?: number;
    /** Sharp reflection depth falloff end. */
    sharpDepthEdgeMax?: number;
    /** Strength of the blurred reflection on smooth surfaces. */
    blurMixSmooth?: number;
    /** Strength of the blurred reflection on rough surfaces. */
    blurMixRough?: number;
    /** Blurred reflection can spread out by depth – distance from the reflective surface. Performance note: if the value is greater than `0`, depth texture will be rendered. */
    blurDepthScale?: number;
    /** Blurred reflection depth spread bias. */
    blurDepthBias?: number;
    /** Blurred reflection depth spread start. */
    blurDepthEdgeMin?: number;
    /** Blurred reflection depth spread end. */
    blurDepthEdgeMax?: number;
    /** Size of the blur. If `[number, number]`, first number is width, second is height. Performance note: if other than `[0, 0]` or `0`, a blur texture will be rendered. */
    blurSize?: [number, number] | number;
    /** Texture for offsetting the reflection. */
    distortionMap?: Texture;
    /** Influence of `distortionMap`. */
    distortion?: number;
    /** Offsets the reflection. */
    reflectorOffset?: number;
    color?: TresColor;
    roughness?: number;
    metalness?: number;
    map?: Texture;
    lightMap?: Texture;
    lightMapIntensity?: number;
    aoMap?: Texture | null;
    aoMapIntensity?: number;
    emissive?: TresColor;
    emissiveIntensity?: number;
    emissiveMap?: Texture;
    bumpMap?: Texture;
    bumpScale?: number;
    normalMap?: Texture;
    normalMapType?: number;
    normalScale?: Vector2;
    displacementMap?: Texture;
    displacementScale?: number;
    displacementBias?: number;
    roughnessMap?: Texture | null;
    metalnessMap?: Texture | null;
    alphaMap?: Texture | null;
    envMap?: Texture | null;
    envMapRotation?: Euler;
    envMapIntensity?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    flatShading?: boolean;
    fog?: boolean;
}
declare const _default: import('vue').DefineComponent<MeshReflectionMaterialProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<MeshReflectionMaterialProps> & Readonly<{}>, {
    color: TresColor;
    fog: boolean;
    lightMapIntensity: number;
    aoMapIntensity: number;
    envMapRotation: Euler;
    wireframe: boolean;
    wireframeLinewidth: number;
    wireframeLinecap: string;
    wireframeLinejoin: string;
    displacementScale: number;
    displacementBias: number;
    bumpScale: number;
    emissive: TresColor;
    emissiveIntensity: number;
    flatShading: boolean;
    normalMapType: number;
    normalScale: Vector2;
    roughness: number;
    metalness: number;
    roughnessMap: Texture | null;
    envMapIntensity: number;
    resolution: number;
    mix: number;
    sharpMix: number;
    sharpDepthScale: number;
    sharpDepthBias: number;
    sharpDepthEdgeMin: number;
    sharpDepthEdgeMax: number;
    blurMixSmooth: number;
    blurMixRough: number;
    blurDepthScale: number;
    blurDepthBias: number;
    blurDepthEdgeMin: number;
    blurDepthEdgeMax: number;
    blurSize: [number, number] | number;
    distortion: number;
    reflectorOffset: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
