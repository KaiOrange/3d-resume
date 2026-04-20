import { WebGLRenderTarget, RenderTargetOptions } from 'three';
import { Ref } from 'vue';
export interface FboOptions {
    width?: number;
    height?: number;
    depth?: boolean;
    settings?: RenderTargetOptions;
    /**
     * Whether to automatically render the FBO on the default scene.
     *
     *  @default true
     *  @type {boolean}
     *  @memberof FboProps
     */
    autoRender?: boolean;
}
export declare function useFBO(options: FboOptions): Ref<WebGLRenderTarget<import('three').Texture> | null, WebGLRenderTarget<import('three').Texture> | null>;
