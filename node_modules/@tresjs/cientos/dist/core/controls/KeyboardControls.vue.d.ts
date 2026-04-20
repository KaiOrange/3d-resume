import { Camera } from 'three';
export interface KeyboardControlsProps {
    /**
     * Whether to make this the default controls.
     *
     * @default true
     * @type {boolean}
     * @memberof KeyboardControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    makeDefault?: boolean;
    /**
     * The camera to control.
     *
     * @default false
     * @type {boolean}
     * @memberof KeyboardControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    camera?: Camera;
    /**
     * The dom element to listen to.
     *
     * @type {HTMLElement}
     * @memberof KeyboardControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    domElement?: HTMLElement;
    /**
     * Indicates the movement speed.
     * @type {number}
     * @default 0.2
     * @memberof KeyboardControlsProps
     *
     */
    moveSpeed?: number;
    /**
     * The trigger id.
     *
     * @type {string}
     * @memberof KeyboardControlsProps
     * @see https://threejs.org/docs/index.html?q=pointe#examples/en/controls/PointerLockControls
     */
    selector?: string;
}
declare const _default: import('vue').DefineComponent<KeyboardControlsProps, {
    instance: import('vue').Ref<import('@tresjs/core').TresControl | null, import('@tresjs/core').TresControl | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    isLock: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<KeyboardControlsProps> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onIsLock?: ((...args: any[]) => any) | undefined;
}>, {
    makeDefault: boolean;
    moveSpeed: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
