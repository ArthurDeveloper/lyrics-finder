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
		background: #fff;
	}

	.song-card:hover {
		cursor: pointer;
		box-shadow: 13px 10px 0px 7px rgba(0,0,0,0.1);
		transform: translate(-0.3rem, -0.3rem);
	}

	.divider {
		width: 5rem;
		height: 1px;
		background: #000;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.song-name {
		font-size: 1.2rem;
	}

	.author-name {
		font-size: 1rem;
		font-weight: 400;
	}
</style>

<template>
	<div class="song-card">
		<h3 class="song-name">{{ name }}</h3>
		<div class="divider"></div>
		<h5 class="author-name">{{ author }}</h5>
	</div>
</template>