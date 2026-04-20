import { Vector3 } from 'three';
import { Sky as SkyImpl } from 'three-stdlib';
export interface SkyProps {
    /**
     * Haziness
     * @param {number} turbidity
     */
    turbidity?: number;
    /**
     * [Rayleigh scattering](https://en.wikipedia.org/wiki/Rayleigh_scattering)
     */
    rayleigh?: number;
    /**
     * [Mie scattering](https://en.wikipedia.org/wiki/Mie_scattering) amount
     */
    mieCoefficient?: number;
    /**
     * [Mie scattering](https://en.wikipedia.org/wiki/Mie_scattering) direction
     */
    mieDirectionalG?: number;
    /**
     * Sun's elevation from the horizon, in degrees
     */
    elevation?: number;
    /**
     * Sun's [azimuth angle](https://en.wikipedia.org/wiki/Solar_azimuth_angle), in degrees – its horizontal coordinate on the horizon
     */
    azimuth?: number;
    /**
     * Sky box scale
     */
    distance?: number;
}
declare const _default: import('vue').DefineComponent<SkyProps, {
    instance: import('vue').ShallowRef<SkyImpl | undefined, SkyImpl | undefined>;
    sunPosition: Vector3;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SkyProps> & Readonly<{}>, {
    distance: number;
    turbidity: number;
    rayleigh: number;
    mieCoefficient: number;
    mieDirectionalG: number;
    elevation: number;
    azimuth: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
