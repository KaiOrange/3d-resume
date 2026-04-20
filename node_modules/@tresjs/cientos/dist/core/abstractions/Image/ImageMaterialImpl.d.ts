/**
 * NOTE: Source:
 * https://threejs.org/docs/?q=material#api/en/materials/Material.transparent
 */
declare const imageMaterialImpl: typeof import('three').ShaderMaterial & {
    key: string;
};
export default imageMaterialImpl;
