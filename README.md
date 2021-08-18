# Spotify Custom Player
This repo is an attempt to create a simple player with changing backgrounds which plays songs from a [Spotify playlist](https://open.spotify.com/playlist/7s6MOTbFPscC1Ls4DrxqdS?si=2148fde688f54219).

## Quirks
1. As far as I am aware there is no way to directly start playing a playlist. Therefore, currenly it is done by getting the playlist tracks and manually adding them to queue. For some reason however, attempt to add the first item to the queue results in API error response. But there is no problem with subsequent additions to queue, which is a weird behaviour.
2. Premium account is required for this to work. There are no error implementations in UI if attempted to access service via non-premium account.

## How it works
There are two main parts to the app.
1. __Device__
Spotify device is registered using Web Playback SDK. This registration basically makes the website a 'device' that can play spotify music.
2. __Play buttons and background image__
This section has all the buttons (play, prev, next) and the background screensaver style images. The images change every 15 seconds independant of  music playback status. 

## Building

Currenly the adaptor-netlify is used.

```bash
npm run build
```

> The built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
