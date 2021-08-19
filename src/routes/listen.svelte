<script>
	import { onMount } from 'svelte';
	import Device from '../__components/Device.svelte';
	import Spinner from '../__components/Spinner.svelte';
	import { getPlaylist, addPlaylistToQueue, transferPlayback } from '../__components/helpers';

	let token = null;
	let tracks = [];
	let loading = true;

	onMount(() => {
		token = window.location.hash.split('&')[0].split('=')[1];

		getPlaylist(token).then((resp) => {
			for (let item of resp.tracks.items) {
				tracks.push(item.track.uri);
			}
			tracks = [...tracks.reverse()];
		});
	});

	async function addToPlayList(event) {
		await transferPlayback(token, event.detail);
		let tracksAfterFirst = tracks.slice(1);
		await addPlaylistToQueue(token, tracksAfterFirst, event.detail);
	}

	function loaded() {
		loading = false;
	}
</script>

{#if tracks && tracks.length}
	{#if loading}
		<div class="spinner">
			<Spinner />
		</div>
	{/if}
	<Device {loading} {token} {tracks} on:ready={addToPlayList} on:loaded={loaded} />
{/if}

<style>
	.spinner {
		position: absolute;
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}
</style>
