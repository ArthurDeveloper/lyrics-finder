<script lang="ts">
	export default {
		props: {
			author: String,
			name: String,
		},
	};
</script>

<style>
	.song-card {
		display: flex;
		direction: row;
		align-items: center;
		border: 1px solid #999;
		padding-left: 1.5rem;
		transition: all 100ms ease-in-out;
		background: #0d0e0f;
		animation-name: slide-in;
		animation-duration: 300ms;
		animation-timing-function: ease-in;
	}

	.song-card:hover {
		cursor: pointer;
		box-shadow: 13px 10px 0px 7px #000;
		transform: translate(-0.3rem, -0.3rem);
	}

	.divider {
		width: 5rem;
		height: 1px;
		background: #fff;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.song-name {
		font-size: 1.2rem;
		color: #fff;
	}

	.author-name {
		font-size: 1rem;
		font-weight: 400;
		color: #fff;
	}

	@keyframes slide-in {
		0% { transform: translateX(-30rem) scale(2); opacity: 0; }
		80% { transform: translateX(-2rem) scale(1); opacity: 1; }
		100% { transform: translateX(0); opacity: 1; }
	}
</style>

<template>
	<div class="song-card">
		<h3 class="song-name">{{ name }}</h3>
		<div class="divider"></div>
		<h5 class="author-name">{{ author }}</h5>
	</div>
</template>