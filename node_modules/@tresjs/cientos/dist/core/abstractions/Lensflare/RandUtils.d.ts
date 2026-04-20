/**
 * Seedable pseudorandom number tools
 */
export default class RandUtils {
    private _getNext;
    private _getGenerator;
    /**
     * Create a new seeded pseudorandom number generator.
     * @param [seed] - the seed for the generator
     * @param [getSeededRandomGenerator] - a function that returns a pseudorandom number generator
     * @constructor
     */
    constructor(seed?: number, getSeededRandomGenerator?: (seed: number) => () => number);
    /**
     * Reseed the pseudorandom number generator
     */
    seed(s: number): void;
    /**
     * Return the next pseudorandom number in the interval [0, 1]
     */
    rand(): number;
    /**
     * Random float from <low, high> interval
     * @param low - Low value of the interval
     * @param high - High value of the interval
     */
    float(low: number, high: number): number;
    /**
     * Random float from <-range/2, range/2> interval
     * @param range - Interval range
     */
    floatSpread(range: number): number;
    /**
     * Random integer from <low, high> interval
     * @param low Low value of the interval
     * @param high High value of the interval
     */
    int(low: number, high: number): number;
    /**
     * Choose an element from an array.
     * @param array The array to choose from
     * @returns An element from the array or null if the array is empty
     */
    choice<T>(array: T[]): T | null;
    /**
     * Choose an element from an array or return defaultValue if array is empty.
     * @param array The array to choose from
     * @param defaultValue The value to return if the array is empty
     * @returns An element from the array or defaultValue if the array is empty
     */
    defaultChoice<T>(array: T[], defaultValue: T): T;
    /**
     * Return n elements from an array.
     * @param array The array to sample
     * @param sampleSizeMin The minimum sample size
     * @param sampleSizeMax The maximum sample size
     */
    sample<T>(array: T[], sampleSizeMin: number, sampleSizeMax?: number): T[];
    /**
     * Shuffle an array. Not in-place.
     * @param array The array to shuffle
     */
    shuffle<T>(array: T[]): T[];
    /**
     * The default pseudorandom generator.
     */
    private getMulberry32;
}
