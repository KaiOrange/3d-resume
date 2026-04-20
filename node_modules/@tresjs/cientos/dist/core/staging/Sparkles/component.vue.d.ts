import { Object3D, Points, ShaderMaterial, Blending, BufferGeometry, Texture } from 'three';
import { TresColor, VectorFlexibleParams } from '@tresjs/core';
import { Gradient } from '../../../utils/Gradient';
interface SparkleProps {
    /**
     * Texture or image path for individual sparkles
     */
    map?: Texture | string;
    /**
     * Vertices of the geometry will be used to emit sparkles. Geometry normals are used for sparkles' traveling direction and for responding to the directional light prop.
     *
     * - If provided, the component will use the passed geometry.
     * - If no geometry is provided, the component will try to make a copy of the parent object's geometry.
     * - If no parent geometry exists, the component will create and use an IcosphereGeometry.
     */
    geometry?: Object3D | BufferGeometry;
    /**
     * Particles "light up" when their normal "faces" the light. If no `directionalLight` is provided, the default "up" vector will be used.
     */
    directionalLight?: Object3D;
    /**
     * Particle lifetime in seconds
     */
    lifetimeSec?: number;
    /**
     * Particle cooldown in seconds – time between lifetime end and respawn
     */
    cooldownSec?: number;
    /**
     * Number from 0-1 indicating how closely the particle needs to be faced towards the light to "light up". (Lower == more flexible)
     */
    normalThreshold?: number;
    /**
     * Scale of the noise period (lower == more slowly cycling noise)
     */
    noiseScale?: number;
    /**
     * Noise coefficient applied to particle scale
     */
    scaleNoise?: number;
    /**
     * Noise coefficient applied to particle offset
     */
    offsetNoise?: number;
    /**
     * Noise coefficient applied to particle lifetime
     */
    lifetimeNoise?: number;
    /**
     * Particle scale multiplier
     */
    size?: number;
    /**
     * Opacity multiplier
     */
    alpha?: number;
    /**
     * Offset multiplier
     */
    offset?: number;
    /**
     * Surface distance multiplier
     */
    surfaceDistance?: number;
    /**
     * '*Sequence' props: specify how a particle changes as it "progresses". See also "mix*" props.
     *
     * Color sequence as particles progress
     */
    sequenceColor?: Gradient<TresColor>;
    /**
     * Opacity sequence as particles progress
     */
    sequenceAlpha?: Gradient<number>;
    /**
     * Distance sequence as particles progress
     */
    sequenceOffset?: Gradient<VectorFlexibleParams>;
    /**
     * Noise sequence as particles progress
     */
    sequenceNoise?: Gradient<VectorFlexibleParams>;
    /**
     * Size sequence as particles progress
     */
    sequenceSize?: Gradient<number>;
    /**
     * Distance from surface (along normal) as particles progress
     */
    sequenceSurfaceDistance?: Gradient<number>;
    /**
     * 'mix*' props: A particle "progresses" with a mix of two factors:
     *
     * its normal "facing" the directionalLight
     * its lifetime
     *
     * 'mix*' props specify the relationship between the two factors.
     *
     * How is a particle's progress for color calculated? (0: normal, 1: particle lifetime)
     */
    mixColor?: number;
    /**
     * How is a particle's progress for alpha calculated? (0: normal, 1: particle lifetime)
     */
    mixAlpha?: number;
    /**
     * How is a particle's progress for offset calculated? (0: normal, 1: particle lifetime)
     */
    mixOffset?: number;
    /**
     * How is a particle's progress for size calculated? (0: normal, 1: particle lifetime)
     */
    mixSize?: number;
    /**
     * How is a particle's progress for surface distance calculated? (0: normal, 1: particle lifetime)
     */
    mixSurfaceDistance?: number;
    /**
     * How is a particle's progress for lifetime calculated? (0: normal, 1: particle lifetime)
     */
    mixNoise?: number;
    /**
     * Material blending
     */
    blending?: Blending;
    /**
     * Material transparency
     */
    transparent?: boolean;
    /**
     * Material depth write
     */
    depthWrite?: boolean;
}
declare const _default: import('vue').DefineComponent<SparkleProps, {
    instance: Points<BufferGeometry<import('three').NormalOrGLBufferAttributes>, ShaderMaterial, import('three').Object3DEventMap>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SparkleProps> & Readonly<{}>, {
    map: Texture | string;
    depthWrite: boolean;
    directionalLight: Object3D;
    offset: number;
    geometry: Object3D | BufferGeometry;
    blending: Blending;
    transparent: boolean;
    size: number;
    alpha: number;
    lifetimeSec: number;
    cooldownSec: number;
    normalThreshold: number;
    noiseScale: number;
    scaleNoise: number;
    offsetNoise: number;
    lifetimeNoise: number;
    surfaceDistance: number;
    sequenceColor: Gradient<TresColor>;
    sequenceAlpha: Gradient<number>;
    sequenceOffset: Gradient<VectorFlexibleParams>;
    sequenceNoise: Gradient<VectorFlexibleParams>;
    sequenceSize: Gradient<number>;
    sequenceSurfaceDistance: Gradient<number>;
    mixColor: number;
    mixAlpha: number;
    mixOffset: number;
    mixSize: number;
    mixSurfaceDistance: number;
    mixNoise: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
