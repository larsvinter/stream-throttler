/// <reference types="node" />
import { PassThrough } from "stream";
import * as Types from './types';
declare class Throttler extends PassThrough {
    #private;
    bps: number;
    constructor(opts: Types.Options);
    destroy(): void;
    _transform(data: any, encoding: string, cb: Function): void;
}
export default Throttler;
