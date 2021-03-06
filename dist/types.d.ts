/// <reference types="node" />
import { TransformOptions } from "stream";
export interface Options extends TransformOptions {
    bps?: number;
}
