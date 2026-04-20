import { MeshStandardMaterial, MeshStandardMaterialParameters } from 'three';
interface Uniform<T> {
    value: T;
}
export declare class WobbleMaterialImpl extends MeshStandardMaterial {
    _time: Uniform<number>;
    _factor: Uniform<number>;
    constructor(parameters?: MeshStandardMaterialParameters);
    onBeforeCompile(shader: {
        uniforms: {
            time?: Uniform<number>;
            factor?: Uniform<number>;
        };
        vertexShader: string;
    }): void;
    get time(): number;
    set time(v: number);
    get factor(): number;
    set factor(v: number);
}
export {};
