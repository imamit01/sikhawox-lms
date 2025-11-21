import Mux from '@mux/mux-node';

const muxTokenId = process.env.MUX_TOKEN_ID;
const muxTokenSecret = process.env.MUX_TOKEN_SECRET;

if (!muxTokenId || !muxTokenSecret) {
    throw new Error('Missing Mux environment variables');
}

export const mux = new Mux({
    tokenId: muxTokenId,
    tokenSecret: muxTokenSecret,
});

export const { video } = mux;
