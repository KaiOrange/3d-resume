import { PositionalAudio } from 'three';
export interface PositionalAudioProps {
    ready: boolean;
    url: string;
    distance?: number;
    helper?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    innerAngle?: number;
    outerAngle?: number;
    outerGain?: number;
}
declare const _default: import('vue').DefineComponent<PositionalAudioProps, {
    instance: import('vue').ShallowRef<PositionalAudio | null, PositionalAudio | null>;
    play: () => void;
    stop: () => void;
    pause: () => void;
    dispose: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    isPlaying: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<PositionalAudioProps> & Readonly<{
    onIsPlaying?: ((...args: any[]) => any) | undefined;
}>, {
    loop: boolean;
    autoplay: boolean;
    distance: number;
    ready: boolean;
    helper: boolean;
    innerAngle: number;
    outerAngle: number;
    outerGain: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
