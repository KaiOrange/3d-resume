import { Camera, Mesh, Scene, WebGLRenderTarget, WebGLRenderer } from 'three';
import { ConvolutionMaterial } from './ConvolutionMaterial';
export interface BlurPassProps {
    resolution: number;
    width?: number;
    height?: number;
    depthEdge0?: number;
    depthEdge1?: number;
    depthScale?: number;
    depthBias?: number;
}
export declare class BlurPass {
    readonly renderTargetA: WebGLRenderTarget;
    readonly renderTargetB: WebGLRenderTarget;
    readonly convolutionMaterial: ConvolutionMaterial;
    readonly scene: Scene;
    readonly camera: Camera;
    readonly screen: Mesh;
    renderToScreen: boolean;
    constructor({ resolution, width, height, depthEdge0, depthEdge1, depthScale, depthBias, }: BlurPassProps);
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget): void;
    dispose(): void;
}
