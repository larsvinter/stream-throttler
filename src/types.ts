import { TransformOptions } from "stream";

/*
* @param {Number|Object} opts an options object or the "bps" Number value
* @api public
*/
export interface Options extends TransformOptions {
  bps?: number;
} 
