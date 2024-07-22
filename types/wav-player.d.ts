declare module 'node-wav-player' {
    namespace player {
        export interface WavPlayerOptions {
            path: string;
            sync?: boolean;
            loop?: boolean;
        }

        export interface WavPlayer {
            play(options: WavPlayerOptions): Promise<void>;
            stop(): void;
        }
    }
    const player: player.WavPlayer;
    export = player;
}
