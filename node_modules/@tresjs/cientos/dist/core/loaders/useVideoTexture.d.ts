import { VideoTexture } from 'three';
interface VideoTextureProps extends HTMLVideoElement {
    unsuspend?: 'canplay' | 'canplaythrough' | 'loadstart' | 'loadedmetadata';
    start?: boolean;
}
/**
 * Composable for loading video textures.
 *
 * ```ts
 * import { ref } from 'vue'
 * import { useVideoTexture } from '@tresjs/cientos'
 * import MyVideo from 'MyVideo.mp4'
 *
 * const texture = ref()
 * texture.value = await useVideoTexture(MyVideo)
 * ```
 * Then you can use the texture in your material.
 *
 * ```vue
 * <TresMeshBasicMaterial :map="texture" />
 * ```
 * @see https://threejs.org/docs/index.html?q=video#api/en/textures/VideoTexture
 * @export
 * @param {HTMLVideoElement} src
 * @return {VideoTexture}  {VideoTexture}
 */
export declare function useVideoTexture(src: string | MediaStream, options?: Partial<VideoTextureProps>): Promise<void | VideoTexture>;
export {};
