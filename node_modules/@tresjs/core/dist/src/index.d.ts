import { App } from 'vue';
import { disposeObject3D as dispose } from './utils';
import { normalizeColor, normalizeVectorFlexibleParam } from './utils/normalize';
import { default as templateCompilerOptions } from './utils/template-compiler-options';
export * from './components';
export * from './composables';
export * from './core/catalogue';
export * from './core/loop';
export * from './directives';
export * from './types';
export interface TresOptions {
    extends?: Record<string, unknown>;
}
export interface TresPlugin {
    [key: string]: any;
    install: (app: App, options?: TresOptions) => void;
}
declare const plugin: TresPlugin;
export default plugin;
export { dispose, normalizeColor, normalizeVectorFlexibleParam, templateCompilerOptions, };
export type { VectorFlexibleParams } from './utils/normalize';
