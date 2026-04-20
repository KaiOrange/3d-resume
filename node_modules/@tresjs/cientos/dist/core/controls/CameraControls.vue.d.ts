import { default as CameraControls } from 'camera-controls';
import { Object3D, OrthographicCamera, PerspectiveCamera } from 'three';
export interface CameraControlsProps {
    /**
     * Whether to make this the default controls.
     *
     * @default false
     * @type {boolean}
     * @memberof CameraControlsProps
     */
    makeDefault?: boolean;
    /**
     * The camera to control.
     *
     * @type {PerspectiveCamera | OrthographicCamera}
     * @memberof CameraControlsProps
     */
    camera?: PerspectiveCamera | OrthographicCamera;
    /**
     * The dom element to listen to.
     *
     * @type {HTMLElement}
     * @memberof CameraControlsProps
     */
    domElement?: HTMLElement;
    /**
     * Minimum vertical angle in radians.
     * The angle has to be between `0` and `.maxPolarAngle` inclusive.
     *
     * @default 0
     * @type {number}
     * @memberof CameraControlsProps
     */
    minPolarAngle?: number;
    /**
     * Maximum vertical angle in radians.
     * The angle has to be between `.maxPolarAngle` and `Math.PI` inclusive.
     *
     * @default Math.PI
     * @type {number}
     * @memberof CameraControlsProps
     */
    maxPolarAngle?: number;
    /**
     * Minimum horizontal angle in radians.
     * The angle has to be less than `.maxAzimuthAngle`.
     *
     * @default -Infinity
     * @type {number}
     * @memberof CameraControlsProps
     */
    minAzimuthAngle?: number;
    /**
     * Maximum horizontal angle in radians.
     * The angle has to be greater than `.minAzimuthAngle`.
     *
     * @default Infinity
     * @type {number}
     * @memberof CameraControlsProps
     */
    maxAzimuthAngle?: number;
    /**
     * Current disatnce.
     *
     * @type {number}
     * @memberof CameraControlsProps
     */
    distance?: number;
    /**
     * Minimum distance for dolly. The value must be higher than `0`.
     * PerspectiveCamera only.
     *
     * @default Number.EPSILON
     * @type {number}
     * @memberof CameraControlsProps
     */
    minDistance?: number;
    /**
     * Maximum distance for dolly. The value must be higher than `minDistance`.
     * PerspectiveCamera only.
     *
     * @default Infinity
     * @type {number}
     * @memberof CameraControlsProps
     */
    maxDistance?: number;
    /**
     * `true` to enable Infinity Dolly for wheel and pinch. Use this with `minDistance` and `maxDistance`.
     * If the Dolly distance is less (or over) than the `minDistance` (or `maxDistance`),
     * `infinityDolly` will keep the distance and pushes the target position instead.
     *
     * @default false
     * @type {boolean}
     * @memberof CameraControlsProps
     */
    infinityDolly?: boolean;
    /**
     * Minimum camera zoom.
     *
     * @default 0.01
     * @type {number}
     * @memberof CameraControlsProps
     */
    minZoom?: number;
    /**
     * Maximum camera zoom.
     *
     * @default Infinity
     * @type {number}
     * @memberof CameraControlsProps
     */
    maxZoom?: number;
    /**
     * Approximate time in seconds to reach the target. A smaller value will reach the target faster.
     *
     * @default 0.25
     * @type {number}
     * @memberof CameraControlsProps
     */
    smoothTime?: number;
    /**
     * The smoothTime while dragging.
     *
     * @default 0.125
     * @type {number}
     * @memberof CameraControlsProps
     */
    draggingSmoothTime?: number;
    /**
     * Max transition speed in unit-per-seconds.
     *
     * @default Infinity
     * @type {number}
     * @memberof CameraControlsProps
     */
    maxSpeed?: number;
    /**
     * Speed of azimuth (horizontal) rotation.
     *
     * @default 1.0
     * @type {number}
     * @memberof CameraControlsProps
     */
    azimuthRotateSpeed?: number;
    /**
     * Speed of polar (vertical) rotation.
     *
     * @default 1.0
     * @type {number}
     * @memberof CameraControlsProps
     */
    polarRotateSpeed?: number;
    /**
     * Speed of mouse-wheel dollying.
     *
     * @default 1.0
     * @type {number}
     * @memberof CameraControlsProps
     */
    dollySpeed?: number;
    /**
     * `true` to invert direction when dollying or zooming via drag.
     *
     * @default false
     * @type {boolean}
     * @memberof CameraControlsProps
     */
    dollyDragInverted?: boolean;
    /**
     * Speed of drag for truck and pedestal.
     *
     * @default 2.0
     * @type {number}
     * @memberof CameraControlsProps
     */
    truckSpeed?: number;
    /**
     * `true` to enable Dolly-in to the mouse cursor coords.
     *
     * @default false
     * @type {boolean}
     * @memberof CameraControlsProps
     */
    dollyToCursor?: boolean;
    /**
     * @default false
     * @type {boolean}
     * @memberof CameraControlsProps
     */
    dragToOffset?: boolean;
    /**
     * The same as `.screenSpacePanning` in three.js's OrbitControls.
     *
     * @default false
     * @type {boolean}
     * @memberof CameraControlsProps
     */
    verticalDragToForward?: boolean;
    /**
     * Friction ratio of the boundary.
     *
     * @default 0.0
     * @type {number}
     * @memberof CameraControlsProps
     */
    boundaryFriction?: number;
    /**
     * Controls how soon the `rest` event fires as the camera slows.
     *
     * @default 0.01
     * @type {number}
     * @memberof CameraControlsProps
     */
    restThreshold?: number;
    /**
     * An array of Meshes to collide with the camera.
     * Be aware colliderMeshes may decrease performance.
     * The collision test uses 4 raycasters from the camera since the near plane has 4 corners.
     *
     * @default []
     * @type {Object3D[]}
     * @memberof CameraControlsProps
     */
    colliderMeshes?: Object3D[];
    /**
     * User's mouse input config.
     *
     * | Button to assign        | Options                                                        | Default                                                         |
     * | ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
     * | `mouseButtons.left`     | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `ROTATE`                                                        |
     * | `mouseButtons.right`    | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `TRUCK`                                                         |
     * | `mouseButtons.wheel` ¹  | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `DOLLY` for Perspective camera, `ZOOM` for Orthographic camera. |
     * | `mouseButtons.middle` ² | `ROTATE` \| `TRUCK` \| `OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE` | `DOLLY`                                                         |
     *
     * 1. Mouse wheel event for scroll "up/down", on mac "up/down/left/right".
     * 2. Mouse wheel "button" click event.
     *
     * > **_NOTE:_** `DOLLY` can't be set when camera is Orthographic.
     *
     * @default See description
     * @memberof CameraControlsProps
     */
    mouseButtons?: Partial<CameraControls['mouseButtons']>;
    /**
     * User's touch input config.
     *
     * | Fingers to assign | Options                                                                                                                                                                                                                                 | Default                                                                                |
     * | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
     * | `touches.one`     | `TOUCH_ROTATE` \| `TOUCH_TRUCK` \| `TOUCH_OFFSET` \| `DOLLY` \| `ZOOM` \| `NONE`                                                                                                                                                        | `TOUCH_ROTATE`                                                                         |
     * | `touches.two`     | `TOUCH_DOLLY_TRUCK` \| `TOUCH_DOLLY_OFFSET` \| `TOUCH_DOLLY_ROTATE` \| `TOUCH_ZOOM_TRUCK` \| `TOUCH_ZOOM_OFFSET` \| `TOUCH_ZOOM_ROTATE` \| `TOUCH_DOLLY` \| `TOUCH_ZOOM` \| `TOUCH_ROTATE` \| `TOUCH_TRUCK` \| `TOUCH_OFFSET` \| `NONE` | `TOUCH_DOLLY_TRUCK` for Perspective camera, `TOUCH_ZOOM_TRUCK` for Othographic camera. |
     * | `touches.three`   | `TOUCH_DOLLY_TRUCK` \| `TOUCH_DOLLY_OFFSET` \| `TOUCH_DOLLY_ROTATE` \| `TOUCH_ZOOM_TRUCK` \| `TOUCH_ZOOM_OFFSET` \| `TOUCH_ZOOM_ROTATE` \| `TOUCH_ROTATE` \| `TOUCH_TRUCK` \| `TOUCH_OFFSET` \| `NONE`                                  | `TOUCH_TRUCK`                                                                          |
     *
     * > **_NOTE:_** `TOUCH_DOLLY_TRUCK` and `TOUCH_DOLLY` can't be set when camera is Orthographic.
     *
     * @default See description
     * @memberof CameraControlsProps
     */
    touches?: Partial<CameraControls['touches']>;
}
export { default as BaseCameraControls } from 'camera-controls';
declare const _default: import('vue').DefineComponent<CameraControlsProps, {
    instance: import('vue').ShallowRef<(import('three').EventDispatcher<{}> & {
        enabled: boolean;
    } & CameraControls) | null, (import('three').EventDispatcher<{}> & {
        enabled: boolean;
    } & CameraControls) | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    end: (...args: any[]) => void;
    start: (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<CameraControlsProps> & Readonly<{
    onEnd?: ((...args: any[]) => any) | undefined;
    onStart?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    maxDistance: number;
    distance: number;
    mouseButtons: Partial<CameraControls["mouseButtons"]>;
    touches: Partial<CameraControls["touches"]>;
    makeDefault: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    minDistance: number;
    infinityDolly: boolean;
    minZoom: number;
    maxZoom: number;
    smoothTime: number;
    draggingSmoothTime: number;
    maxSpeed: number;
    azimuthRotateSpeed: number;
    polarRotateSpeed: number;
    dollySpeed: number;
    dollyDragInverted: boolean;
    truckSpeed: number;
    dollyToCursor: boolean;
    dragToOffset: boolean;
    verticalDragToForward: boolean;
    boundaryFriction: number;
    restThreshold: number;
    colliderMeshes: Object3D[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
