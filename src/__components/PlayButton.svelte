<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { debounce } from './helpers.js';

	export let play = false;
	export let seed = '';
	export let height = 2000;
	export let width = 3000;
	export let loading = true;

	let firstLoad = true;

	let dispatch = createEventDispatcher();

	let hideCursor = false;

	let backgroundBlur = true;

	let timer = null;
	
	

	let randomValue = 0; // to trigger #key and load new image
	let src = '';

	timer = setInterval(() => (randomValue = Math.random()), 15000);

	function debouncedCall() {
		debounce(mouseStop, 300);
	}

	function mouseMove(event) {
		if (width < 500) return;
		hideCursor = false;
		backgroundBlur = true;
		debouncedCall();
	}

	function mouseStop() {
		if (width < 500) return;
		hideCursor = true;
		backgroundBlur = false;
	}

	function toggleBackgroundBlur() {
		if (width < 500) backgroundBlur = !backgroundBlur;
	}

	function playPause() {
		if (width < 500) {
			if (backgroundBlur) {
				dispatch('click');
			} else {
				toggleBackgroundBlur();
			}
		} else {
			dispatch('click');
		}
	}

	function loadedImgs() {
		if (firstLoad) {
			dispatch('loaded');
			firstLoad = false;
		}
	}

	// to prevent browser from caching the images
	// the link needs to change every time
	// hence date.now() query param is added
	function preload(source) {
		src = source+ `?${Date.now()}`;
		
		return new Promise(function (resolve) {
			let img = new Image();
			img.onload = () => {
				resolve();
				loadedImgs();
			};
			img.src = src;
		});
	}
</script>

{#key randomValue}
	<div transition:fade={{ duration: 1000, delay: 2000 }} class="backgroundImg">
		{#await preload(`https://picsum.photos/${width}/${height}`) then _}
			<img {src} alt="changing background wallpapers" />
		{/await}
	</div>
{/key}

{#if !loading}
	<div
		transition:fade
		class="btn"
		on:click|stopPropagation={playPause}
		class:visibility={backgroundBlur}
	>
		<div class="btnImages">
			<img
				on:click={() => dispatch('previous')}
				class="playPause"
				src="./previous.svg"
				alt="Previous icon"
			/>
			{#if play}
				<img class="playPause" src="./pause.svg" alt="Play icon" />
			{:else}
				<img class="playPause" src="./play.svg" alt="Pause icon" />
			{/if}
			<img on:click={() => dispatch('next')} class="playPause" src="./next.svg" alt="Next icon" />
		</div>
	</div>

	<div
		class="glassLayer"
		transition:fade
		on:click|stopPropagation={toggleBackgroundBlur}
		class:mouseMoveEffect={backgroundBlur}
		class:mouseEffect={hideCursor}
	/>
{/if}

<svelte:body on:mousemove={mouseMove} />

<style>
	.glassLayer {
		position: absolute;
		top: 0;
		background: transparent;
		width: 100%;
		height: 100%;
		transition: all 1s ease;
	}

	.backgroundImg {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.5s ease;
	}

	.btn {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		width: max-content;
		height: max-content;
		outline: none;
		border: none;
		background: transparent;
		opacity: 0;
		transition: all 0.5s ease;
	}

	.btnImages {
		z-index: 1;
		display: grid;
		grid-template-columns: auto auto auto;
		column-gap: 50px;
		z-index: 2;
	}

	.playPause {
		width: 64px;
		height: 64px;
		background: transparent;
	}

	.visibility {
		opacity: 1;
	}

	.btn:hover {
		cursor: pointer;
		opacity: 1;
	}

	.mouseEffect {
		cursor: none;
	}

	.btn:hover + div,
	.mouseMoveEffect {
		backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.1);
	}

	:global(::before) {
		background-color: transparent;
	}
</style>
