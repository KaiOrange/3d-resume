import { DataTexture } from 'three';
import { MaybeRef, Ref } from 'vue';
import { GradientScalar, GradientTresColor, GradientVectorFlexibleParams } from './../../../utils/Gradient';
export type CanvasGradientRenderer<T> = (g: CanvasGradient, entry: ShaderDataEntry<T>) => void;
export declare class ShaderData {
    private entries;
    private resolution;
    constructor(entries: ShaderDataEntry<any>[], resolution: number);
    useTexture(): {
        texture: import('vue').ShallowRef<DataTexture, DataTexture>;
        dispose: () => void;
        yFor: Record<string, number>;
    };
}
export declare class ShaderDataEntry<T> {
    data: T;
    ref: Ref<T> | null;
    name: string;
    valueMin: number;
    valueMax: number;
    suffix: string;
    renderToCanvasGradient: CanvasGradientRenderer<T>;
    constructor(data: MaybeRef<T>, name: string, valueMin: number, valueMax: number, suffix: string, renderToCanvasGradient: (gradient: CanvasGradient, data: ShaderDataEntry<T>) => void);
}
export declare class ShaderDataEntryTresColorGradient extends ShaderDataEntry<GradientTresColor> {
    constructor(data: MaybeRef<GradientTresColor>, name?: string, valueMin?: number, valueMax?: number, suffix?: string, renderToCanvasGradient?: typeof GradientTresColorRenderToCanvasGradient);
}
export declare class ShaderDataEntryScalarGradient extends ShaderDataEntry<GradientScalar> {
    constructor(data: MaybeRef<GradientScalar>, name?: string, valueMin?: number, valueMax?: number, suffix?: string, renderToCanvasGradient?: typeof GradientScalarRenderToCanvasGradient);
}
export declare class ShaderDataEntryXyzGradient extends ShaderDataEntry<GradientVectorFlexibleParams> {
    constructor(data: MaybeRef<GradientVectorFlexibleParams>, name?: string, valueMin?: number, valueMax?: number, suffix?: string, renderToCanvasGradient?: typeof GradientXyzRenderToCanvasGradient);
}
declare function GradientTresColorRenderToCanvasGradient(g: CanvasGradient, entry: ShaderDataEntryTresColorGradient): void;
declare function GradientScalarRenderToCanvasGradient(g: CanvasGradient, entry: ShaderDataEntryScalarGradient): void;
declare function GradientXyzRenderToCanvasGradient(g: CanvasGradient, entry: ShaderDataEntryXyzGradient): void;
export {};
