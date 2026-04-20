import { Texture } from 'three';
export declare function getTextureAndAtlasAsync(imagePathOrImageData: string, atlasPathOrAtlasish: string | Atlasish): Promise<[Texture | Texture[], Atlas]>;
export interface AtlasFrame {
    name: string;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    repeatX: number;
    repeatY: number;
}
export interface Atlas {
    frames: AtlasFrame[];
    animations: Record<string, AtlasFrame[]>;
}
export declare function getAtlas(atlasish: Atlasish, textureWidth: number, textureHeight: number): Atlas;
export declare function getAtlasFrames(atlas: Atlas, animationNameOrFrameNumber: string | number | [number, number], reversed: boolean): AtlasFrame[];
export declare function getNullAtlasFrame(): AtlasFrame;
export type AtlasData = TexturePackerFrameDataArray | TexturePackerFrameDataObject;
export type Atlasish = AtlasData | [number, number] | number;
interface TexturePackerFrameData {
    filename: string;
    frame: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
interface TexturePackerFrameDataArray {
    frames: TexturePackerFrameData[];
}
interface TexturePackerFrameDataObject {
    frames: Record<string, TexturePackerFrameData>;
}
export declare function setAtlasDefinitions(atlas: Atlas, definitions?: Record<string, string>): void;
export {};
