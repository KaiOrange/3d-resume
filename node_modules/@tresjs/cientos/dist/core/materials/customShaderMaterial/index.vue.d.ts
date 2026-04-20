import { Fn } from '@vueuse/core';
interface CustomShaderMaterialProps {
    baseMaterial: Fn;
    vertexShader?: string;
    fragmentShader?: string;
    silent?: boolean;
    uniforms?: {
        [uniform: string]: any;
    };
}
declare const _default: import('vue').DefineComponent<CustomShaderMaterialProps, {
    instance: import('vue').ShallowRef<null, null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<CustomShaderMaterialProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
