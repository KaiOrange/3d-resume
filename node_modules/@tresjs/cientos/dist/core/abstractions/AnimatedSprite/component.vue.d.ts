import { TresVector2 } from '@tresjs/core';
import { Atlasish } from './Atlas';
export interface AnimatedSpriteProps {
    /** URL of the image texture or an image dataURL. This prop is not reactive. */
    image: string;
    /**
     * If `string`, the URL of the JSON atlas.
     * If `number`, the number of columns in the texture.
     * If `[number, number]`, the number of columns/rows in the texture.
     * If `AtlasData`, the atlas as a JS object.
     * This prop is not reactive.
     */
    atlas: string | Atlasish;
    /**
    * Specify playback frame order and repeated frames (delays). `definitions` is a record where keys are atlas animation names and values are strings containing an animation definition.
    * A "animation definition" comma-separated string of frame numbers with optional parentheses-surrounded durations.
    * Here is how various definition strings convert to arrays of frames for playback:
    * "0,2,1" - [0,2,1], i.e., play frame 0, 2, then 1.
    * "2(10)" - [2,2,2,2,2,2,2,2,2,2], i.e., play from 2 10 times.
    * "1-4" - [1,2,3,4]
    * "10-5(2)" - [10,10,9,9,8,8,7,7,6,6,5,5]
    * "1-4(3),10(2)" - [1,1,1,2,2,2,3,3,3,4,4,4,10,10]
     */
    definitions?: Record<string, string>;
    /** Desired frames per second of the animation. */
    fps?: number;
    /** Whether or not the animation should loop. */
    loop?: boolean;
    /** If `string`, name of the animation to play. If `[number, number]`, start and end frames of the animation. If `number`, frame number to display. */
    animation?: string | [number, number] | number;
    /** Whether the animation is paused. */
    paused?: boolean;
    /** Whether to play the animation in reverse. */
    reversed?: boolean;
    /** Whether the sprite should be flipped, left to right. */
    flipX?: boolean;
    /** For a non-looping animation, when the animation ends, whether to display the zeroth frame. */
    resetOnEnd?: boolean;
    /** Whether to display the object as a THREE.Sprite. [See THREE.Sprite](https://threejs.org/docs/?q=sprite#api/en/objects/Sprite) */
    asSprite?: boolean;
    /** Anchor point of the object. A value of [0.5, 0.5] corresponds to the center. [0, 0] is left, bottom. */
    center?: TresVector2;
    /** Alpha test value for the material. [See THREE.Material.alphaTest](https://threejs.org/docs/#api/en/materials/Material.alphaTest) */
    alphaTest?: number;
    /** Depth test value for the material. [See THREE.Material.depthTest](https://threejs.org/docs/#api/en/materials/Material.depthTest) */
    depthTest?: boolean;
    /** Depth write value for the material. [See THREE.Material.depthWrite](https://threejs.org/docs/#api/en/materials/Material.depthWrite) */
    depthWrite?: boolean;
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        groupRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Group<import('three').Object3DEventMap>, typeof import('three').Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('@tresjs/core').Mutable<import('@tresjs/core').Overwrite<Partial<import('@tresjs/core').Overwrite<import('three').Group<import('three').Object3DEventMap>, import('@tresjs/core').WithMathProps<import('three').Group<import('three').Object3DEventMap>> & import('@tresjs/core').VueProps & Partial<import('@tresjs/core').EventHandlers>>>, Omit<import('@tresjs/core').InstanceProps<import('three').Group<import('three').Object3DEventMap>, typeof import('three').Group>, "object">>>>, {}, {}, import('vue').ComputedOptions, import('vue').MethodOptions, {}> | null;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<AnimatedSpriteProps, {
    instance: import('vue').ShallowRef<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    loop: (frameName: string) => any;
    frame: (frameName: string) => any;
    end: (frameName: string) => any;
}, string, import('vue').PublicProps, Readonly<AnimatedSpriteProps> & Readonly<{
    onLoop?: ((frameName: string) => any) | undefined;
    onFrame?: ((frameName: string) => any) | undefined;
    onEnd?: ((frameName: string) => any) | undefined;
}>, {
    fps: number;
    loop: boolean;
    animation: string | [number, number] | number;
    paused: boolean;
    reversed: boolean;
    flipX: boolean;
    resetOnEnd: boolean;
    asSprite: boolean;
    center: TresVector2;
    alphaTest: number;
    depthTest: boolean;
    depthWrite: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
