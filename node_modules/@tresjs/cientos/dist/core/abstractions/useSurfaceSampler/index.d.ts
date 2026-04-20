import { Color, InterleavedBuffer, Object3D, Vector3, InstancedMesh, Mesh } from 'three';
export interface useSurfaceSamplerProps {
    transform?: TransformFn;
    weight?: string;
    count?: number;
    mesh?: Mesh;
    instanceMesh?: InstancedMesh | null;
}
interface SamplePayload {
    /**
     * The position of the sample.
     */
    position: Vector3;
    /**
     * The normal of the mesh at the sampled position.
     */
    normal: Vector3;
    /**
     * The vertex color of the mesh at the sampled position.
     */
    color: Color;
}
type TransformPayload = SamplePayload & {
    /**
     * The dummy object used to transform each instance.
     * This object's matrix will be updated after transforming & it will be used
     * to set the instance's matrix.
     */
    dummy: Object3D;
    /**
     * The mesh that's initially passed to the sampler.
     * Use this if you need to apply transforms from your mesh to your instances
     * or if you need to grab attributes from the geometry.
     */
    sampledMesh: Mesh;
};
export type TransformFn = (payload: TransformPayload, i: number) => void;
export declare const useSurfaceSampler: (mesh: Mesh, count?: number, instanceMesh?: InstancedMesh | null, weight?: string, transform?: TransformFn) => {
    buffer: import('vue').Ref<{
        readonly isInterleavedBuffer: true;
        array: {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Int8Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Int8Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => any, thisArg?: any) => Int8Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Int8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Int8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => number, thisArg?: any) => Int8Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Int8Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Int8Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Int8Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Int8Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Int8Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Int8Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Int8Array<ArrayBuffer>;
            with: (index: number, value: number) => Int8Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Int8Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint8Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => any, thisArg?: any) => Uint8Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => number, thisArg?: any) => Uint8Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint8Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint8Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint8Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint8Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array<ArrayBuffer>;
            with: (index: number, value: number) => Uint8Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint8ClampedArray<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint8ClampedArray<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => any, thisArg?: any) => Uint8ClampedArray<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint8ClampedArray<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint8ClampedArray<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => number, thisArg?: any) => Uint8ClampedArray<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint8ClampedArray<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint8ClampedArray<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8ClampedArray<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint8ClampedArray<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint8ClampedArray<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint8ClampedArray<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8ClampedArray<ArrayBuffer>;
            with: (index: number, value: number) => Uint8ClampedArray<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8ClampedArray";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Int16Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Int16Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => any, thisArg?: any) => Int16Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Int16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Int16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => number, thisArg?: any) => Int16Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Int16Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Int16Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Int16Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Int16Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Int16Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Int16Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Int16Array<ArrayBuffer>;
            with: (index: number, value: number) => Int16Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Int16Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint16Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint16Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => any, thisArg?: any) => Uint16Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => number, thisArg?: any) => Uint16Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint16Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint16Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint16Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint16Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint16Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint16Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint16Array<ArrayBuffer>;
            with: (index: number, value: number) => Uint16Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint16Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Int32Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Int32Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => any, thisArg?: any) => Int32Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Int32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Int32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => number, thisArg?: any) => Int32Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Int32Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Int32Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Int32Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Int32Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Int32Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Int32Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Int32Array<ArrayBuffer>;
            with: (index: number, value: number) => Int32Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Int32Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint32Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint32Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => any, thisArg?: any) => Uint32Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => number, thisArg?: any) => Uint32Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint32Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint32Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint32Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint32Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint32Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint32Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint32Array<ArrayBuffer>;
            with: (index: number, value: number) => Uint32Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint32Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Float32Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Float32Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => any, thisArg?: any) => Float32Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Float32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Float32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => number, thisArg?: any) => Float32Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Float32Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Float32Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Float32Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Float32Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Float32Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Float32Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Float32Array<ArrayBuffer>;
            with: (index: number, value: number) => Float32Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Float32Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Float64Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Float64Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => any, thisArg?: any) => Float64Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Float64Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Float64Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => number, thisArg?: any) => Float64Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Float64Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Float64Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Float64Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Float64Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Float64Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Float64Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Float64Array<ArrayBuffer>;
            with: (index: number, value: number) => Float64Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Float64Array";
        };
        stride: number;
        usage: import('three').Usage;
        updateRanges: {
            start: number;
            count: number;
        }[];
        version: number;
        count: number;
        needsUpdate: boolean;
        uuid: string;
        onUploadCallback: () => void;
        onUpload: (callback: () => void) => InterleavedBuffer;
        set: (value: ArrayLike<number>, offset: number) => InterleavedBuffer;
        setUsage: (value: import('three').Usage) => InterleavedBuffer;
        addUpdateRange: (start: number, count: number) => void;
        clearUpdateRanges: () => void;
        copy: (source: InterleavedBuffer) => InterleavedBuffer;
        copyAt: (index1: number, attribute: import('three').InterleavedBufferAttribute, index2: number) => InterleavedBuffer;
        clone: (data: {}) => InterleavedBuffer;
        toJSON: (data: {}) => {
            uuid: string;
            buffer: string;
            type: string;
            stride: number;
        };
    }, InterleavedBuffer | {
        readonly isInterleavedBuffer: true;
        array: {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Int8Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Int8Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => any, thisArg?: any) => Int8Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Int8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Int8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => number, thisArg?: any) => Int8Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Int8Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Int8Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Int8Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Int8Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Int8Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Int8Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Int8Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Int8Array<ArrayBuffer>;
            with: (index: number, value: number) => Int8Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Int8Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint8Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => any, thisArg?: any) => Uint8Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint8Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => number, thisArg?: any) => Uint8Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint8Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint8Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint8Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint8Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint8Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint8Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array<ArrayBuffer>;
            with: (index: number, value: number) => Uint8Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint8ClampedArray<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint8ClampedArray<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => any, thisArg?: any) => Uint8ClampedArray<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint8ClampedArray<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint8ClampedArray<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => number, thisArg?: any) => Uint8ClampedArray<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8ClampedArray<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint8ClampedArray<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint8ClampedArray<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8ClampedArray<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint8ClampedArray<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint8ClampedArray<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint8ClampedArray<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint8ClampedArray<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8ClampedArray<ArrayBuffer>;
            with: (index: number, value: number) => Uint8ClampedArray<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint8ClampedArray";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Int16Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Int16Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => any, thisArg?: any) => Int16Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Int16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Int16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => number, thisArg?: any) => Int16Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Int16Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Int16Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Int16Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Int16Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Int16Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Int16Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Int16Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Int16Array<ArrayBuffer>;
            with: (index: number, value: number) => Int16Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Int16Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint16Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint16Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => any, thisArg?: any) => Uint16Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint16Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => number, thisArg?: any) => Uint16Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint16Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint16Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint16Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint16Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint16Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint16Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint16Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint16Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint16Array<ArrayBuffer>;
            with: (index: number, value: number) => Uint16Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint16Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Int32Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Int32Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => any, thisArg?: any) => Int32Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Int32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Int32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => number, thisArg?: any) => Int32Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Int32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Int32Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Int32Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Int32Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Int32Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Int32Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Int32Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Int32Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Int32Array<ArrayBuffer>;
            with: (index: number, value: number) => Int32Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Int32Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Uint32Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Uint32Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => any, thisArg?: any) => Uint32Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Uint32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Uint32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => number, thisArg?: any) => Uint32Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Uint32Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Uint32Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint32Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Uint32Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Uint32Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Uint32Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Uint32Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint32Array<ArrayBuffer>;
            with: (index: number, value: number) => Uint32Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Uint32Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Float32Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Float32Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => any, thisArg?: any) => Float32Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Float32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Float32Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => number, thisArg?: any) => Float32Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float32Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Float32Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Float32Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Float32Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Float32Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Float32Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Float32Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Float32Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Float32Array<ArrayBuffer>;
            with: (index: number, value: number) => Float32Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Float32Array";
        } | {
            [x: number]: number;
            readonly BYTES_PER_ELEMENT: number;
            readonly buffer: {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => ArrayBuffer;
                readonly maxByteLength: number;
                readonly resizable: boolean;
                resize: (newByteLength?: number) => void;
                readonly detached: boolean;
                transfer: (newByteLength?: number) => ArrayBuffer;
                transferToFixedLength: (newByteLength?: number) => ArrayBuffer;
                readonly [Symbol.toStringTag]: string;
            } | {
                readonly byteLength: number;
                slice: (begin?: number, end?: number) => SharedArrayBuffer;
                readonly growable: boolean;
                readonly maxByteLength: number;
                grow: (newByteLength?: number) => void;
                readonly [Symbol.species]: SharedArrayBuffer;
                readonly [Symbol.toStringTag]: "SharedArrayBuffer";
            };
            readonly byteLength: number;
            readonly byteOffset: number;
            copyWithin: (target: number, start: number, end?: number) => Float64Array<ArrayBufferLike>;
            every: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            fill: (value: number, start?: number, end?: number) => Float64Array<ArrayBufferLike>;
            filter: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => any, thisArg?: any) => Float64Array<ArrayBuffer>;
            find: (predicate: (value: number, index: number, obj: Float64Array<ArrayBufferLike>) => boolean, thisArg?: any) => number | undefined;
            findIndex: (predicate: (value: number, index: number, obj: Float64Array<ArrayBufferLike>) => boolean, thisArg?: any) => number;
            forEach: (callbackfn: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => void, thisArg?: any) => void;
            indexOf: (searchElement: number, fromIndex?: number) => number;
            join: (separator?: string) => string;
            lastIndexOf: (searchElement: number, fromIndex?: number) => number;
            readonly length: number;
            map: (callbackfn: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => number, thisArg?: any) => Float64Array<ArrayBuffer>;
            reduce: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reduceRight: {
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number): number;
                (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => number, initialValue: number): number;
                <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Float64Array<ArrayBufferLike>) => U, initialValue: U): U;
            };
            reverse: () => Float64Array<ArrayBufferLike>;
            set: (array: ArrayLike<number>, offset?: number) => void;
            slice: (start?: number, end?: number) => Float64Array<ArrayBuffer>;
            some: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any) => boolean;
            sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Float64Array<ArrayBufferLike>;
            subarray: (begin?: number, end?: number) => Float64Array<ArrayBufferLike>;
            toLocaleString: {
                (): string;
                (locales: string | string[], options?: Intl.NumberFormatOptions): string;
            };
            toString: () => string;
            valueOf: () => Float64Array<ArrayBufferLike>;
            entries: () => ArrayIterator<[number, number]>;
            keys: () => ArrayIterator<number>;
            values: () => ArrayIterator<number>;
            includes: (searchElement: number, fromIndex?: number) => boolean;
            at: (index: number) => number | undefined;
            findLast: {
                <S extends number>(predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => value is S, thisArg?: any): S | undefined;
                (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any): number | undefined;
            };
            findLastIndex: (predicate: (value: number, index: number, array: Float64Array<ArrayBufferLike>) => unknown, thisArg?: any) => number;
            toReversed: () => Float64Array<ArrayBuffer>;
            toSorted: (compareFn?: ((a: number, b: number) => number) | undefined) => Float64Array<ArrayBuffer>;
            with: (index: number, value: number) => Float64Array<ArrayBuffer>;
            [Symbol.iterator]: () => ArrayIterator<number>;
            readonly [Symbol.toStringTag]: "Float64Array";
        };
        stride: number;
        usage: import('three').Usage;
        updateRanges: {
            start: number;
            count: number;
        }[];
        version: number;
        count: number;
        needsUpdate: boolean;
        uuid: string;
        onUploadCallback: () => void;
        onUpload: (callback: () => void) => InterleavedBuffer;
        set: (value: ArrayLike<number>, offset: number) => InterleavedBuffer;
        setUsage: (value: import('three').Usage) => InterleavedBuffer;
        addUpdateRange: (start: number, count: number) => void;
        clearUpdateRanges: () => void;
        copy: (source: InterleavedBuffer) => InterleavedBuffer;
        copyAt: (index1: number, attribute: import('three').InterleavedBufferAttribute, index2: number) => InterleavedBuffer;
        clone: (data: {}) => InterleavedBuffer;
        toJSON: (data: {}) => {
            uuid: string;
            buffer: string;
            type: string;
            stride: number;
        };
    }>;
};
export {};
