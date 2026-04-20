export interface FBXModelProps {
    /**
     * Path to the FBX file.
     *
     * @type {string}
     * @memberof FBXModelProps
     * @required
     */
    path: string;
    /**
     *
     * Whether to use cast-shadow to the model.
     *
     * @type {boolean}
     * @default false
     * @memberof FBXModelProps
     *
     */
    castShadow?: boolean;
    /**
     *
     * Whether to use receive-shadow to the model.
     *
     * @type {boolean}
     * @default false
     * @memberof FBXModelProps
     *
     */
    receiveShadow?: boolean;
}
declare const _default: import('vue').DefineComponent<{
    path: string;
    castShadow?: boolean;
    receiveShadow?: boolean;
}, {
    instance: import('vue').Ref<any, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    path: string;
    castShadow?: boolean;
    receiveShadow?: boolean;
}> & Readonly<{}>, {
    castShadow: boolean;
    receiveShadow: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
