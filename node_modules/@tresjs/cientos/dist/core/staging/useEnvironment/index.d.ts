import { CubeTexture, Texture, WebGLCubeRenderTarget } from 'three';
import { Ref } from 'vue';
import { EnvironmentOptions } from './const';
/**
 * Component that loads an environment map and sets it as the scene's background and environment.
 *
 * @export
 * @param {Partial<EnvironmentOptions>} options - The options for the environment map
 *   files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
 *   blur = 0,
 *   background = false,
 *   path = undefined,
 *   preset = undefined,
 *   colorSpace = 'srgb',
 *   backgroundIntensity = 1,
 *   environmentIntensity = 1,
 *   backgroundRotation = [0, 0, 0],
 *   environmentRotation = [0, 0, 0],
 *   syncMaterials = false,
 * @param {Ref<WebGLCubeRenderTarget | null>} fbo - The framebuffer object
 * @return {Promise<Ref<Texture | CubeTexture | null>>} The loaded texture
 */
export declare function useEnvironment(options: Partial<EnvironmentOptions>, fbo: Ref<WebGLCubeRenderTarget | null>): Promise<Ref<Texture | CubeTexture | null>>;
