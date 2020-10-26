node-wav-player
===============

The node-wav-player is a Node.js module which allows you to play a wav file on the host computer. It supports Windows 10, MacOS X, and some Linux distros.

This module can plays a wav file on:

* Windows
  * A wav file is played using [SoundPlayer Class of .NET Framework](https://msdn.microsoft.com/en-us/library/system.media.soundplayer.aspx) through PowerShell. This module was tested on Windows 10.
* Mac OS X
  * A wav file is played using `afplay` command.
* Linux
  * A wav file is played using [Alsa `aplay`](https://alsa.opensrc.org/Aplay) command. This module was tested on:
    * [Ubuntu Desktop](https://www.ubuntu.com/desktop)
    * [Fedora Workstation](https://getfedora.org/en/workstation/)
    * [Raspbian Strech with Desktop](https://www.raspberrypi.org/downloads/raspbian/)

Basically you don't have to install any additional libraries in most environments.

Though this module is intended to play a wav file, it probably can play some audio formats. That depends on the OS. For example, a mp3 file could be played on Mac OS X. But at least on Windows, the supported audio format is only wav.

## Dependencies

* [Node.js](https://nodejs.org/en/) 4 +
  * Though the node-wav-player works on Node 4 for now, it is strongly recommended to use Node 6 or newer. The node-wav-player will not support Node 4 in the future.

## Installation

```
$ cd ~
$ npm install node-wav-player
```

---------------------------------------
## Table of Contents

* [Quick Start](#Quick-Start)
* [`WavPlayer` object](#WavPlayer-object)
  * [play() method](#WavPlayer-play-method)
  * [stop() method](#WavPlayer-stop-method)
* [Release Note](#Release-Note)
* [References](#References)
* [License](#License)

---------------------------------------
## <a id="Quick-Start">Quick Start</a>

The code blow plays a wav file:

```JavaScript
const player = require('node-wav-player');
player.play({
  path: './speech.wav',
}).then(() => {
  console.log('The wav file started to be played successfully.');
}).catch((error) => {
  console.error(error);
});
```

That's it. If this code is run successfully, you will hear the audio from your computer. 

---------------------------------------
## <a id="WavPlayer-object">`WavPlayer` object</a>

In order to use the node-wav-player, you have to load the node-wav-player module as follows:

```JavaScript
const player = require('node-wav-player');
```

In the code snippet above, the variable `player` is a `WavPlayer` object. The `WavPlayer` object has methods as described in sections below.

### <a id="WavPlayer-play-method">play() method</a>

The `play()` method plays a wav file specified to the `path` parameter. This method returns a `Promise` object.

This method takes a hash object containing the properties as follows:

Property | Type    | Required | Description
:--------|:--------|:---------|:-------------------------
`path`   | String  | Required | Path of a wav file (e.g., `"./speech.wav"`)
`loop`   | Boolean | Optional | If `true`, the wave file will be played repeatedly until the [`stop()`](#WavPlayer-stop-method") method is called. The default value is `false`.
`sync`   | Boolean | Optional | If `true`, this method calls the `resove()` after finishing to play the wav file. Otherwise, if `false`, this method calles the `resolve()` immediately after starting to play the wav file. The default value is `false`. If the `loop` is set to `true`, this parameter is ignored (i.e., this parameter is set to the default value `false` ).

If you want to wait for the end of the audio, you can set the `sync` to `true` as follows:

```JavaScript
const player = require('node-wav-player');
player.play({
  path: './speech.wav',
  sync: true
}).then(() => {
  console.log('The wav file was played through.');
}).catch((error) => {
  console.error(error);
});
```

### <a id="WavPlayer-stop-method">stop() method</a>

The `stop()` method stops playing the wav file. This method returns nothing. Note that this method is *not* asynchronous but synchronous.

The code blow starts to play a wav file. Then it stops playing the wav file in 1 second.

```JavaScript
const player = require('node-wav-player');
player.play({
  path: './speech.wav',
}).then(() => {
  console.log('The wav file started to be played successfully.');
}).catch((error) => {
  console.error(error);
});

setTimeout(() => {
  player.stop();
  console.log('Stopped.')
}, 1000);
```

---------------------------------------
## <a id="Release-Note">Release Note</a>

* v0.2.0 (2020-10-27)
  Added error catching to spawn child process (Thanks to [@Tmp2k](https://github.com/Tmp2k), [#7](https://github.com/futomi/node-wav-player/pull/7))
* v0.1.0 (2018-10-26)
  * Added the `loop` parameter to the [`play()`](#WavPlayer-play-method) method. (Thanks to [@TmpR](https://github.com/TmpR), [#3](https://github.com/futomi/node-wav-player/issues/3))
* v0.0.2 (2018-10-21)
  * Fixed the bug on Win7 + PowerShell. (Thanks to [@Joe-Kerr](https://github.com/Joe-Kerr), [#1](https://github.com/futomi/node-wav-player/issues/1), [#2](https://github.com/futomi/node-wav-player/pull/2))
* v0.0.1 (2018-01-03)
  * First public release

---------------------------------------
## <a id="References">References</a>

* [Alsa aplay](https://alsa.opensrc.org/Aplay)
* [Microsoft MSDN .NET Framework Class Library - SoundPlayer Class](https://msdn.microsoft.com/en-us/library/system.media.soundplayer.aspx)

---------------------------------------
## <a id="License">License</a>

The MIT License (MIT)

Copyright (c) 2018 - 2020 Futomi Hatano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
