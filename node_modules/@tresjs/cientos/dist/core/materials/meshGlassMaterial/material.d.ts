import { MeshStandardMaterialParameters, Color, MeshStandardMaterial, Vector2 } from 'three';
declare class MeshGlassMaterial extends MeshStandardMaterial {
    isMeshPhysicalMaterial: boolean;
    clearcoatMap: null;
    clearcoatRoughness: number;
    clearcoatRoughnessMap: null;
    clearcoatNormalScale: Vector2;
    clearcoatNormalMap: null;
    ior: number;
    transmissionMap: null;
    thickness: number;
    thicknessMap: null;
    attenuationDistance: number;
    attenuationColor: Color;
    specularIntensity: number;
    specularIntensityMap: null;
    specularColor: Color;
    specularColorMap: null;
    _clearcoat: number;
    _transmission: number;
    constructor(parameters?: MeshStandardMaterialParameters);
    get clearcoat(): number;
    set clearcoat(value: number);
    get transmission(): number;
    set transmission(value: number);
    copy(source: any): this;
}
export default MeshGlassMaterial;
