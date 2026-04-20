import { AnimationClip, Object3D } from 'three';
interface gltfExporterOptions {
    fileName?: string;
    trs?: boolean;
    onlyVisible?: boolean;
    binary?: boolean;
    maxTextureSize?: number;
    animations?: AnimationClip[];
    includeCustomExtensions?: boolean;
}
export declare function useGLTFExporter(object3D: Object3D | Object3D[], options?: gltfExporterOptions): Promise<void>;
export {};
