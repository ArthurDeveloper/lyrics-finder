<script lang="ts">
	export default {
		props: {
			author: String,
			name: String,
			timeout: Number,
		},
		data() {
			return {
				animation: '',
				translation: '',
			}
		},
		mounted() {
			this.translation = '-300%';
			setTimeout(() => {
				this.animation = `slide-in ${this.timeout}ms ease`;
				this.translation = '0%';
			}, this.timeout);
		}
	};
</script>

<style>
	.song-card {
		display: flex;
		direction: row;
		align-items: center;
		border: 1px solid #999;
		padding-left: 1.5rem;
		transition: all 100ms ease;
		background: #0d0e0f;
		margin-top: 2rem;
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
		from {
			transform: translateX(-100%) scale(1.2);
			opacity: 0;
		} to {
			transform: translateX(0) scale(1);
			opacity: 1;
		}
	}
</style>

<template>
	<div class="song-card" v-bind:style="{ animation, transform: `translateX(${translation})` }">
		<h3 class="song-name">{{ name }}</h3>
		<div class="divider"></div>
		<h5 class="author-name">{{ author }}</h5>
	</div>
</template>