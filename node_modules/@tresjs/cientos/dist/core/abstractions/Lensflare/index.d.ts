import { TresColor } from '@tresjs/core';
import { Texture } from 'three';
import { default as Lensflare } from './component.vue';
export { Lensflare };
export interface SeedProps {
    texture: string[];
    color: TresColor[];
    distance: [number, number];
    size: [number, number];
    length: [number, number];
    seed?: number;
}
/**
 * To make creating a complex lensflare simpler, the component can generate some or all `LensflareElement` properties.
 * The precendence in creating the final elements' props is as follows:
 *
 * 1. `elements`
 * 2. `userDefaultElement` - `color`, `distance`, `size`, `texture` from component
 * 3. seeded random props - if `seed` and/or `seedProps` is not `undefined`
 * 4. system default
 *
 * @param elements - `undefined` or an array of (potentially) incomplete element props
 * @param userDefaultElement - values to "fill in" missing partial elements fields – or overwrite seeded props
 * @param seed - `undefined` or a number to seed random prop generation
 * @param seedProps - `undefined` or an array of SeedProps for generating random seeded properties
 * @param systemDefaultElement - default values to "fill in" any remaining missing props
 * @returns LensflareElementProps[] - An array of complete props
 */
export declare const partialLensflarePropsArrayToLensflarePropsArray: (elements: Partial<LensflareElementProps>[] | undefined, userDefaultElement: Partial<LensflareElementProps>, seed?: number | undefined, seedProps?: SeedProps[] | undefined, systemDefaultElement?: LensflareElementProps) => LensflareElementProps[];
export interface LensflareElementProps {
    texture: Texture | string;
    size: number;
    distance: number;
    color: TresColor;
}
export declare function filterLensflareElementProps(props: Partial<LensflareElementProps>): Partial<LensflareElementProps>;
