The `StreamThrottler` class extends Nodejs PassThrough stream.
It is quite similar, however allows you to specify a `bps` "bytes per
second" option cause data to be restricted to this rate.

## Install

```
yarn add stream-throttler
```

## Quick Start

```js
import StreamThrottler from "stream-throttler";

const throttler = new StreamThrottler({ bps: 16 * 1024 * 1024 });

process.stdin.pipe(throttler).pipe(process.stdout);
```

## API

<a name='constructor'></a>

#### `new StreamThrottler(opts): PassthroughStream`

You pass an `options` Object with a `bps` value specified. This is the
desired max bytes per second.

Nodejs will automatically handle backpressure, so you can use this with
any Nodejs stream.

You may also use this with a 'pipeline'.

Options:

- `bps: number`, the bytes-per-second to limit the stream at.

## License

MIT
