import { Ref } from 'vue';
export declare function useMask(id: Ref<number> | number, inverse?: Ref<boolean> | boolean): {
    stencilWrite: boolean;
    stencilRef: number;
    stencilFunc: 514 | 517;
    stencilFail: 7680;
    stencilZFail: 7680;
    stencilZPass: 7680;
};
