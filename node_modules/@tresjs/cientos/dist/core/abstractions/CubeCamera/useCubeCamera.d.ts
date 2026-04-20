import { MaybeRefOrGetter } from 'vue';
import { Fog, FogExp2, Scene, Texture, WebGLRenderer, CubeCamera as ThreeCubeCamera, WebGLCubeRenderTarget } from 'three';
export interface CubeCameraOptions {
    /** Resolution of the FBO, 255 */
    resolution?: MaybeRefOrGetter<number>;
    /** Camera near, 0.1 */
    near?: MaybeRefOrGetter<number>;
    /** Camera far, 1000 */
    far?: MaybeRefOrGetter<number>;
    /** Custom environment map that is temporarily set as the scene's background */
    envMap?: MaybeRefOrGetter<Texture>;
    /** Custom fog that is temporarily set as the scene's fog */
    fog?: MaybeRefOrGetter<Fog | FogExp2>;
    /** Renderer */
    renderer?: MaybeRefOrGetter<WebGLRenderer>;
    /** Scene */
    scene?: MaybeRefOrGetter<Scene>;
}
export declare function useCubeCamera(props: CubeCameraOptions): {
    fbo: import('vue').ComputedRef<WebGLCubeRenderTarget>;
    camera: import('vue').ComputedRef<ThreeCubeCamera>;
    update: () => void;
};
