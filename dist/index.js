"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _totalBytes, _startTime;
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class Throttler extends stream_1.PassThrough {
    constructor(opts) {
        super(opts);
        _totalBytes.set(this, void 0);
        _startTime.set(this, void 0);
        if (!(this instanceof Throttler))
            return new Throttler(opts);
        __classPrivateFieldSet(this, _totalBytes, 0);
        __classPrivateFieldSet(this, _startTime, Date.now());
        if (!opts)
            opts = {};
        if (opts.bps == null)
            throw new Error('You must pass a "bps" (bytes-per-second) option');
        this.bps = opts.bps;
    }
    destroy() {
        this.emit("end");
    }
    _transform(data, encoding, cb) {
        this.push(data);
        __classPrivateFieldSet(this, _totalBytes, __classPrivateFieldGet(this, _totalBytes) + data.length);
        const elapsedSeconds = (Date.now() - __classPrivateFieldGet(this, _startTime)) / 1000;
        const currentSeconds = __classPrivateFieldGet(this, _totalBytes) / this.bps;
        const delta = currentSeconds - elapsedSeconds;
        if (delta < 0)
            cb();
        else
            setTimeout(cb, 1000 * delta);
    }
}
_totalBytes = new WeakMap(), _startTime = new WeakMap();
exports.default = Throttler;
