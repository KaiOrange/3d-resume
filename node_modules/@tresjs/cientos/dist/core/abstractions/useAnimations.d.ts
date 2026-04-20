import { AnimationMixer, AnimationAction, AnimationClip, Object3D, Scene } from 'three';
import { Ref } from 'vue';
/**
 * Creates an AnimationMixer and returns it.
 *
 * @export
 * @template T
 * @param {T[]} animations
 * @param {(Scene | Ref<Object3D | undefined | null>)} [modelRef]
 * @return {*}
 */
export declare function useAnimations<T extends AnimationClip>(animations: T[], modelRef?: Scene | Ref<Object3D | undefined | null>): {
    actions: import('vue').ShallowReactive<{
        [key: string]: AnimationAction;
    }>;
    mixer: AnimationMixer;
};
