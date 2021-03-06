The `StreamThrottler` class extends Nodejs PassThrough stream.
It is quite similar, however allows you to specify a `bps` "bytes per
second" option cause data to be restricted to this rate.

You can pass an `options` Object with a `bps` value specified. This is the
desired max bytes per second.

Nodejs will automatically handle backpressure, so you can use this with
any Nodejs stream, i.e.:

```js
import StreamThrottler from "stream-throttler";

const throttler = new StreamThrottler({ bps: 16 * 1024 * 1024 });

process.stdin.pipe(throttler).pipe(process.stdout);
```

You may also use this with a 'pipeline'.
