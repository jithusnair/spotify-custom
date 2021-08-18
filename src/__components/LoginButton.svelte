<button on:click>
	Login with Spotify
	<img src="/spotify.svg" alt="Spotify Icon" />
</button>

<style>
	button {
		outline: none;
		border: none;
		background-color: transparent;
		width: fit-content;
		font-weight: 700;
		font-size: 16px;
		display: grid;
		grid-template-columns: auto auto;
		column-gap: 10px;
		align-items: center;
		padding: 10px 15px;
		border-radius: 6px;
		box-shadow: rgb(0 0 0 / 30%) 3px 3px 11px 4px;
		transition: all 0.3s ease;
	}

	button:hover {
		cursor: pointer;
		box-shadow: rgb(0 0 0 / 30%) 3px 3px 3px -2px;
	}

	img {
		width: 32px;
	}
</style>
