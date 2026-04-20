/**
 * Expand an animation definition string into an array of numbers.
 * @param definitionStr - A comma-separated string of frame numbers with optional parentheses-surrounded durations.
 * @example - expand("0,2") === [0,2]
 * @example - expand("2(10)") === [2,2,2,2,2,2,2,2,2,2]
 * @example - expand("1-4") === [1,2,3,4]
 * @example - expand("10-5(2)") === [10,10,9,9,8,8,7,7,6,6,5,5]
 * @example - expand("1-4(3),10(2)") === [1,1,1,2,2,2,3,3,3,4,4,4,10,10]
 */
export declare function expand(definitionStr: string): number[];
