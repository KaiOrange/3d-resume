export interface StatsGlProps {
    logsPerSecond?: number;
    samplesLog?: number;
    samplesGraph?: number;
    precision?: number;
    horizontal?: boolean;
    minimal?: boolean;
    mode?: number;
}
export declare const StatsGl: import('vue').DefineComponent<StatsGlProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<StatsGlProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
