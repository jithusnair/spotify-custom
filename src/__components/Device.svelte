<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import PlayButton from './PlayButton.svelte';
	// import { deviceId } from './store.js';

	export let token = '';
	export let tracks = null;
	export let loading;

	let dispatch = createEventDispatcher();
	let player = null;
	let ready = false;
	let notPlayedYet = true;
	let playButton = false;

	let width = null;
	let height = null;

	onMount(async () => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			player = new Spotify.Player({
				name: 'Jithu Player',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 1
			});

			// Error handling
			player.addListener('initialization_error', ({ message }) => {
				console.error(message);
			});
			player.addListener('authentication_error', ({ message }) => {
				console.error(message);
			});
			player.addListener('account_error', ({ message }) => {
				console.error(message);
			});
			player.addListener('playback_error', ({ message }) => {
				console.error(message);
			});

			// Playback status updates
			player.addListener('player_state_changed', (state) => {
				if (state && state.paused) {
					playButton = false;
				} else if (state && !state.paused) {
					playButton = true;
				}
			});

			// Ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				player._options.id = device_id;

				ready = true;

				dispatch('ready', device_id);
			});

			// Not Ready
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			// Connect to the player!
			player.connect();
		};

		await import('https://sdk.scdn.co/spotify-player.js');
	});

	function play({
		spotify_uri,
		playerInstance: {
			_options: { getOAuthToken, id }
		}
	}) {
		getOAuthToken((access_token) => {
			fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
				method: 'PUT',
				body: JSON.stringify({ uris: [spotify_uri] }),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				}
			});
		});
	}

	function toggleTrack() {
		if (notPlayedYet) {
			// player.nextTrack().then(() => {
			// 	console.log('Skipped to next track!');
			// });
			notPlayedYet = false;

			play({
				spotify_uri: tracks[0],
				playerInstance: player
			});
		}
		player.togglePlay().then(() => {
			console.log('Toggled playback!');
		});
	}

	function playNext() {
		player.nextTrack().then(() => {
			console.log('Skipped to next track!');
		});
	}

	function playPrevious() {
		player.nextTrack().then(() => {
			console.log('Set to previous track!');
		});
	}
</script>

<div bind:clientHeight={height} bind:clientWidth={width}>
	{#if ready}
		<PlayButton
			{loading}
			{width}
			{height}
			play={playButton}
			on:click={toggleTrack}
			on:next={playNext}
			on:previous={playPrevious}
			on:loaded
		/>
	{/if}
</div>

<style>
	div {
		height: 100vh;
	}
</style>
