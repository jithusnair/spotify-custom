# Spotify Custom Player
This repo is an attempt to create a simple player with changing backgrounds which plays songs from a [Spotify playlist](https://open.spotify.com/playlist/7s6MOTbFPscC1Ls4DrxqdS?si=2148fde688f54219).

## Quirks
1. As far as I am aware there is no way to directly start playing a playlist. Therefore, currenly it is done by getting the playlist tracks and manually adding them to queue. For some reason however, attempt to add the first item to the queue results in API error response. But there is no problem with subsequent additions to queue, which is a weird behaviour.
2. Premium account is required for this to work. There are no error implementations in UI if 

## Building

Currenly the adaptor-netlify is used.

```bash
npm run build
```

> The built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
