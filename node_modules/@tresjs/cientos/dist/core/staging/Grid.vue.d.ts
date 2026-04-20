import { ColorRepresentation, PlaneGeometry, Side } from 'three';
/**
       Based on
      https://github.com/Fyrestar/THREE.InfiniteGridHelper by https://github.com/Fyrestar
      and https://github.com/threlte/threlte/blob/main/packages/extras/src/lib/components/Grid/Grid.svelte
      by https://github.com/grischaerbe and https://github.com/jerzakm
*/
export interface GridMaterialType {
    /** Cell size, default: 0.5 */
    cellSize?: number;
    /** Cell thickness, default: 0.5 */
    cellThickness?: number;
    /** Cell color, default: black */
    cellColor?: ColorRepresentation;
    /** Section size, default: 1 */
    sectionSize?: number;
    /** Section thickness, default: 1 */
    sectionThickness?: number;
    /** Section color, default: #2080ff */
    sectionColor?: ColorRepresentation;
    /** Follow camera, default: false */
    followCamera?: boolean;
    /** Display the grid infinitely, default: false */
    infiniteGrid?: boolean;
    /** Fade distance, default: 100 */
    fadeDistance?: number;
    /** Fade strength, default: 1 */
    fadeStrength?: number;
    /** Fade from camera (1) or origin (0), or somewhere in between, default: camera */
    fadeFrom?: number;
    /** Material side, default: THREE.BackSide */
    side?: Side;
}
export type GridProps = GridMaterialType & {
    /** Default plane-geometry arguments */
    args?: ConstructorParameters<typeof PlaneGeometry>;
};
declare const _default: import('vue').DefineComponent<GridProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<GridProps> & Readonly<{}>, {
    side: Side;
    cellSize: number;
    cellThickness: number;
    cellColor: ColorRepresentation;
    sectionSize: number;
    sectionThickness: number;
    sectionColor: ColorRepresentation;
    followCamera: boolean;
    infiniteGrid: boolean;
    fadeDistance: number;
    fadeStrength: number;
    fadeFrom: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
