import { MaybeRef } from 'vue';
import { ShaderData, CanvasGradientRenderer, ShaderDataEntry } from './ShaderData';
import { GradientScalar, GradientTresColor, GradientVectorFlexibleParams } from './../../../utils/Gradient';
type rgbaSuffixes = ['r', 'rg', 'rgb', 'rgba'];
type xyzwSuffixes = ['x', 'xy', 'xyz', 'xyzw'];
type ShaderSuffix = (rgbaSuffixes)[number] | (xyzwSuffixes)[number];
export default class ShaderDataBuilder {
    private entries;
    private resolution;
    constructor(resolution?: number);
    withResolution(resolution: number): this;
    get add(): ShaderDataBuilderAdd;
    build(): ShaderData;
    private onAdd;
}
declare class ShaderDataEntryBuilder<T> {
    private entry;
    private parent;
    constructor(entry: ShaderDataEntry<T>, parent: ShaderDataBuilder);
    id(s: string): this;
    range(min: number, max: number): this;
    suffix(s: ShaderSuffix): this;
    canvasGradientRenderer(fn: CanvasGradientRenderer<T>): this;
    /**
     * Add another entry to the ShaderDataBuilder
     */
    get add(): ShaderDataBuilderAdd;
    /**
     * Finalize the ShaderDataBuilder
     * @returns ShaderData
     */
    build(): ShaderData;
}
declare class ShaderDataBuilderAdd {
    private onAdd;
    constructor(onAdd: (entry: ShaderDataEntry<any>) => ShaderDataEntryBuilder<any>);
    GradientTresColor(data: MaybeRef<GradientTresColor>): ShaderDataEntryBuilder<any>;
    Gradient01(data: MaybeRef<GradientScalar>): ShaderDataEntryBuilder<any>;
    GradientScalar(data: MaybeRef<GradientScalar>, min: number, max: number): ShaderDataEntryBuilder<any>;
    GradientXyz(data: MaybeRef<GradientVectorFlexibleParams>, min: number, max: number): ShaderDataEntryBuilder<any>;
}
export {};
