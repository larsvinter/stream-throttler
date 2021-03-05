/*
 * Copyright 2021 Lars Vinter (C)
 */

"use strict";

import { PassThrough } from "stream";
import * as Types from './types'

class Throttler extends PassThrough {
  bps!: number;
  #totalBytes!: number;
  #startTime!: number;

  constructor(opts: Types.Options) {
    super(opts);

    if (!(this instanceof Throttler)) return new Throttler(opts);
    
    this.#totalBytes = 0;
    this.#startTime = Date.now();

    if (!opts) opts = {};
    if (opts.bps == null)
      throw new Error('You must pass a "bps" (bytes-per-second) option');

    this.bps = opts.bps;
  }

  destroy() {
    this.emit("end");
  }

  _transform(data: any, encoding: string, cb: Function) {
    this.push(data);
    this.#totalBytes += data.length;
    const elapsedSeconds = (Date.now() - this.#startTime) / 1000;
    const currentSeconds = this.#totalBytes / this.bps;
    const delta = currentSeconds - elapsedSeconds;
    if (delta < 0) cb();
    else setTimeout(cb, 1000 * delta);
  }
}

export default Throttler;
