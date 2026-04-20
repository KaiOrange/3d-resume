import { Color, CubeTexture, Matrix3, Matrix4, Quaternion, Texture, Vector2, Vector3, Vector4, ShaderMaterial } from 'three';
export declare function shaderMaterial(uniforms: {
    [name: string]: CubeTexture | Texture | Int32Array | Float32Array | Matrix4 | Matrix3 | Quaternion | Vector4 | Vector3 | Vector2 | Color | number | boolean | Array<any> | null;
}, vertexShader: string, fragmentShader: string, onInit?: (material?: ShaderMaterial) => void): typeof ShaderMaterial & {
    key: string;
};
