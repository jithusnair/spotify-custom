<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import LoginButton from '../__components/LoginButton.svelte';

	let fadeIn = false;

	let clientId = '278f855addc745289bd594a5a1e650eb';

	setTimeout(() => (fadeIn = true), 1000);

	function login() {
		let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURI(
			process.env.REDIRECT_URI
		)}&scope=${encodeURIComponent(
			'user-read-email user-read-private user-library-modify user-library-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative app-remote-control user-read-recently-played user-top-read user-read-playback-position  streaming user-read-playback-state user-modify-playback-state user-read-currently-playing'
		)}&response_type=token`;
		goto(url);
	}
</script>

{#if fadeIn}
	<div transition:fade>
		<LoginButton on:click={login} />
	</div>
{/if}

<style>
	div {
		height: 100vh;
		display: grid;
		place-items: center;
	}
</style>
