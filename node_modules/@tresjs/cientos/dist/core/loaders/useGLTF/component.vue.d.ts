export interface GLTFModelProps {
    /**
     *
     * The path to the GLTF file.
     *
     * @type {string}
     * @required
     * @memberof GLTFModelProps
     *
     */
    path: string;
    /**
     *
     * Whether to use Draco compression.
     *
     * @type {boolean}
     * @default false
     * @memberof GLTFModelProps
     *
     */
    draco?: boolean;
    /**
     *
     * Whether to use cast-shadow to the model.
     *
     * @type {boolean}
     * @default false
     * @memberof GLTFModelProps
     *
     */
    castShadow?: boolean;
    /**
     *
     * Whether to use receive-shadow to the model.
     *
     * @type {boolean}
     * @default false
     * @memberof GLTFModelProps
     *
     */
    receiveShadow?: boolean;
    /**
     *
     * The path to the Draco decoder.
     *
     * @type {string}
     * @default 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
     * @memberof GLTFModelProps
     *
     */
    decoderPath?: string;
}
declare const _default: import('vue').DefineComponent<{
    path: string;
    draco?: boolean;
    decoderPath?: string;
    castShadow?: boolean;
    receiveShadow?: boolean;
}, {
    instance: import('vue').Ref<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    path: string;
    draco?: boolean;
    decoderPath?: string;
    castShadow?: boolean;
    receiveShadow?: boolean;
}> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
    draco: boolean;
    decoderPath: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
