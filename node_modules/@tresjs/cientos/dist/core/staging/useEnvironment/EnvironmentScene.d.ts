import { Object3D, Scene } from 'three';
declare class EnvironmentScene extends Object3D {
    virtualScene: Scene;
    constructor();
    add(...object: Object3D[]): this;
    dispose(): void;
}
export default EnvironmentScene;
