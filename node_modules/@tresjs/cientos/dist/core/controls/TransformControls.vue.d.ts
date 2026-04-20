import { TransformControls } from 'three-stdlib';
import { Camera, Object3D } from 'three';
export interface TransformControlsProps {
    object: Object3D;
    camera?: Camera;
    mode?: string;
    enabled?: boolean;
    axis?: 'X' | 'Y' | 'Z' | 'XY' | 'YZ' | 'XZ' | 'XYZ';
    translationSnap?: number;
    rotationSnap?: number;
    scaleSnap?: number;
    space?: 'local' | 'world';
    size?: number;
    showX?: boolean;
    showY?: boolean;
    showZ?: boolean;
}
declare const _default: import('vue').DefineComponent<TransformControlsProps, {
    instance: import('vue').ShallowRef<TransformControls<Camera> | null, TransformControls<Camera> | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    dragging: (...args: any[]) => void;
    mouseDown: (...args: any[]) => void;
    mouseUp: (...args: any[]) => void;
    objectChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<TransformControlsProps> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onDragging?: ((...args: any[]) => any) | undefined;
    onMouseDown?: ((...args: any[]) => any) | undefined;
    onMouseUp?: ((...args: any[]) => any) | undefined;
    onObjectChange?: ((...args: any[]) => any) | undefined;
}>, {
    enabled: boolean;
    size: number;
    mode: string;
    axis: "X" | "Y" | "Z" | "XY" | "YZ" | "XZ" | "XYZ";
    space: "local" | "world";
    showX: boolean;
    showY: boolean;
    showZ: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
