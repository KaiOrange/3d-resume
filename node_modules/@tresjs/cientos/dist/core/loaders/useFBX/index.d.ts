import { Group } from 'three';
/**
 * Loads an FBX file and returns a THREE.Object3D.
 *
 * @export
 * @param {(string | string[])} path
 * @return {*}  {Promise<Group>}
 */
export declare function useFBX<T extends string | string[]>(path: T): Promise<T extends string[] ? Group[] : Group>;
