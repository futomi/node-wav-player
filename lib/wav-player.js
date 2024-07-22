/* ------------------------------------------------------------------
* node-wav-player - wav-player.js
*
* Copyright (c) 2018 - 2024, Futomi Hatano, All rights reserved.
* Released under the MIT license
* Date: 2024-07-22
* ---------------------------------------------------------------- */
'use strict';
const mFs = require('fs');
const mSpawn = require('child_process').spawn;

class WavPlayer {
    /* ------------------------------------------------------------------
    * Constructor: WavPlayer()
    * ---------------------------------------------------------------- */
    constructor() {
        this._OS = process.platform;
        this._proc = null;
        this._called_stop = false;
    }

    /* ------------------------------------------------------------------
    * play(params)
    * - params  | Object  | Required |
    *   - path  | String  | Required | Path of a wav file
    *   - sync  | Boolean | Optional | Default is `false`
    *   - loop  | Boolean | Optional | Default is `false`
    * ---------------------------------------------------------------- */
    async play(params) {
        this._called_stop = false;

        if (!params || typeof (params) !== 'object') {
            throw new Error('The `path` is required.');
        }
        let path = '';
        if ('path' in params) {
            path = params['path'];
        } else {
            throw new Error('The `path` is required.');
        }
        if (typeof (path) !== 'string' || path === '') {
            throw new Error('The `path` must be a non-empty string.');
        }
        if (!mFs.existsSync(path)) {
            throw new Error('The file of the `path` was not found.');
        }

        let sync = false;
        if ('sync' in params) {
            sync = params['sync'];
        }
        if (typeof (sync) !== 'boolean') {
            throw new Error('The `sync` must be a boolean.');
        }

        let loop = false;
        if ('loop' in params) {
            loop = params['loop'];
        }
        if (typeof (loop) !== 'boolean') {
            throw new Error('The `loop` must be a boolean.');
        }
        if (loop) {
            sync = false;
        }

        await this._play({
            path: path,
            sync: sync,
            loop: loop
        });
    }

    _play(params) {
        return new Promise((resolve, reject) => {
            const path = params.path;
            const loop = params.loop;
            const sync = params.sync;
            const os = this._OS;

            if (os === 'win32') {
                this._proc = mSpawn('powershell', [
                    '-c',
                    '(New-Object System.Media.SoundPlayer "' + path + '").PlaySync();'
                ]);
                this._proc.stdin.end();
            } else if (os === 'darwin') {
                this._proc = mSpawn('afplay', [path]);
            } else if (os === 'linux') {
                this._proc = mSpawn('aplay', [path]);
            } else {
                reject(new Error('The wav file can not be played on this platform.'));
            }

            let timer = null;
            if (!sync) {
                timer = setTimeout(() => {
                    if (!loop) {
                        this._proc.removeAllListeners('close');
                    }
                    resolve();
                }, 500);
            }

            this._proc.on('error', function (err) {
                reject(new Error('Failed to play the wav file (' + err + ')'));
            });

            this._proc.on('close', (code) => {
                if (timer) {
                    clearTimeout(timer);
                }
                if (this._called_stop === true) {
                    resolve();
                } else {
                    if (code === 0) {
                        if (sync) {
                            resolve();
                        } else if (loop) {
                            this._play(params);
                        }
                    } else {
                        reject(new Error('Failed to play the wav file (' + code + ')'));
                    }
                }
            });
        });
    };

    stop() {
        this._called_stop = true;
        this._proc.removeAllListeners('close');
        if (this._proc) {
            this._proc.kill();
        }
    }

}

module.exports = new WavPlayer();
