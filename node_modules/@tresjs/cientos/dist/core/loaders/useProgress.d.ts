import { Ref } from 'vue';
export declare function useProgress(): Promise<{
    hasFinishLoading: Ref<boolean>;
    progress: Ref<number>;
    items: Ref<string[]>;
}>;
