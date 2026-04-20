import { Lensflare } from 'three-stdlib';
import { TresColor } from '@tresjs/core';
import { Texture } from 'three';
import { LensflareElementProps, SeedProps } from '.';
export interface LensflareProps {
    /**
     * scale of the lensflare
     */
    scale?: number;
    /**
     * array of lensflare element properties
     */
    elements?: Partial<LensflareElementProps>[];
    /**
     * random seed for generating random seeded elements
     */
    seed?: number;
    /**
     * specifications for generating random seeded elements
     */
    seedProps?: SeedProps[];
    /**
     * default color of lensflare elements
     */
    color?: TresColor;
    /**
     *  default distance of lensflare elements from flare center
     */
    distance?: number;
    /**
     *  default size of lensflare elements
     */
    size?: number;
    /**
     * default texture of lensflare elements
     */
    texture?: Texture | string;
}
declare const _default: import('vue').DefineComponent<LensflareProps, {
    instance: import('vue').ShallowRef<Lensflare | undefined, Lensflare | undefined>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<LensflareProps> & Readonly<{}>, {
    texture: Texture | string;
    color: TresColor;
    elements: Partial<LensflareElementProps>[];
    scale: number;
    size: number;
    distance: number;
    seed: number;
    seedProps: SeedProps[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
