The `Throttler` class extends Nodejs PassThrough stream.
It is quite similar, however allows you to specify a `bps` "bytes per
second" option cause data to be restricted to this rate.

You can invoke with just a `bps` Number and get the rest of the default
options. This should be more common:

You can pass an `options` Object with a `bps` value specified along with
other options:

```js
const t = new Throttler({ bps: 16 * 1024 * 1024 });
```
