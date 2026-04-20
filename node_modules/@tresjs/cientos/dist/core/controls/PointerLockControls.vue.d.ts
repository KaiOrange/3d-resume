import { Camera } from 'three';
export interface PointerLockControlsProps {
    /**
     * Whether to make this the default controls.
     *
     * @default false
     * @type {boolean}
     * @memberof PointerLockControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    makeDefault?: boolean;
    /**
     * The camera to control.
     *
     * @default false
     * @type {boolean}
     * @memberof PointerLockControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    camera?: Camera;
    /**
     * The dom element to listen to.
     *
     * @type {HTMLElement}
     * @memberof PointerLockControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    domElement?: HTMLElement;
    /**
     * The trigger id.
     *
     * @type {string}
     * @memberof PointerLockControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    selector?: string;
}
declare const _default: import('vue').DefineComponent<PointerLockControlsProps, {
    instance: import('vue').Ref<import('@tresjs/core').TresControl | null, import('@tresjs/core').TresControl | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    isLock: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<PointerLockControlsProps> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onIsLock?: ((...args: any[]) => any) | undefined;
}>, {
    makeDefault: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
