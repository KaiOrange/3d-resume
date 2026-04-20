import { CubeTexture, Texture } from 'three';
import { Ref } from 'vue';
import { EnvironmentOptions } from './const';
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        environmentScene: unknown;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<EnvironmentOptions, {
    texture: Ref<Texture | CubeTexture | null, Texture | CubeTexture | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<EnvironmentOptions> & Readonly<{}>, {
    path: string;
    near: number;
    far: number;
    backgroundIntensity: number;
    background: boolean | string;
    environmentIntensity: number;
    blur: number;
    resolution: number;
    frames: number;
    preset: import('./const').EnvironmentPresetsType;
    files: string | string[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
