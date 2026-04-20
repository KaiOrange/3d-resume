export interface AudioProps {
    /**
     * Path to your audio file.
     * @type {string}
     * @memberof AudioProps
     *
     */
    src: string;
    /**
     * Id of the DOM element that trigger the play/pause state.
     * @type {string}
     * @memberof AudioProps
     * @default renderer.domElement
     *
     */
    playTrigger?: string;
    /**
     * Id of the DOM element that trigger the stop state.
     * @type {string}
     * @memberof AudioProps
     * @default
     *
     */
    stopTrigger?: string;
    /**
     * If the audio must be replayed when ends.
     * @type {boolean}
     * @memberof AudioProps
     * @default false
     *
     */
    loop?: boolean;
    /**
     * Volume of the audio.
     * @type {number}
     * @memberof AudioProps
     * @default 0.5
     *
     */
    volume?: number;
    /**
     * PlaybackRate of the audio.
     * @type {number}
     * @memberof AudioProps
     * @default 1
     *
     */
    playbackRate?: number;
}
export declare const GlobalAudio: import('vue').DefineComponent<AudioProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<AudioProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
