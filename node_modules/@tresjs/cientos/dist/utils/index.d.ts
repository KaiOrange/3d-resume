import { Vector3 } from 'three';
/**
 * Update the function signature to explicitly specify the type of the props parameter
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj
 * @param {K[]} props
 * @return {*}  {Pick<T, K>}
 */
export declare function pick<T extends object, K extends keyof T>(obj: T, props: K[]): Pick<T, K>;
/**
 * Check if the object has a setter for the given property
 *
 * @export
 * @param {*} obj
 * @param {string} prop
 * @return {*}  {boolean}
 */
export declare function hasSetter(obj: any, prop: string): boolean;
export declare function extractBindingPosition(binding: any): Vector3;
