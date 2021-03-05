/**
 * The `Throttler` class extends Nodejs PassThrough stream.
 * It is quite similar, however allows you to specify a `bps` "bytes per
 * second" option cause data to be restricted to this rate.
 *
 * You can invoke with just a `bps` Number and get the rest of the default
 * options. This should be more common:
 *
 * ``` js
 * process.stdin.pipe(new Throttler(100 * 1024)).pipe(process.stdout);
 * ```
 *
 * Or you can pass an `options` Object in, with a `bps` value specified along with
 * other options:
 *
 * ``` js
 * const t = new Throttler({ bps: 100 * 1024 });
 * ```
 *
 * @param {Number|Object} opts an options object or the "bps" Number value
 * @api public
 *
 * Copyright 2021 Lars Vinter (C)
 */

"use strict";

import { PassThrough } from "stream";

class Throttler extends PassThrough {
  constructor(opts) {
    super(opts);

    if (!(this instanceof Throttler)) return new Throttler(opts);

    if (typeof opts == "number") opts = { bps: opts };

    if (!opts) opts = {};
    if (opts.bps == null)
      throw new Error('must pass a "bps" bytes-per-second option');

    this.bps = opts.bps;
    this.totalBytes = 0;
    this.startTime = Date.now();
  }

  destroy() {
    this.emit("end");
  }

  _transform(data, encoding, cb) {
    this.push(data);
    this.totalBytes += data.length;
    const elapsedSeconds = (Date.now() - this.startTime) / 1000;
    const currentSeconds = this.totalBytes / this.bps;
    const delta = currentSeconds - elapsedSeconds;
    if (delta < 0) cb();
    else setTimeout(cb, 1000 * delta);
  }
}

export default Throttler;
