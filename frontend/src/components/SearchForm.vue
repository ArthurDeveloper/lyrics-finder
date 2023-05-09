<script lang="ts">
	import LoadingDots from './LoadingDots.vue';
	import SongCard from './SongCard.vue';
	import ErrorSnack from './ErrorSnack.vue';

	type Song = {
		ALink: string,
		SName: string,
	}

	export default {
		data() {
			return {
				author: '',
				title: '',
				response: '',
				loading: false,
				songs: new Array<Song>(),
				error: '',
			}
		},
		methods: {
			search(e: Event) {
				e.preventDefault();

				if (!this.title) {
					this.error = 'You need to provide at least a title!';
					setTimeout(() => {
						this.error = '';
					}, 3000);
					return;
				}

				this.$router.push(`/lyrics/${this.title}/${this.author}`);
			}
		},
		components: {
			LoadingDots,
			SongCard,
			ErrorSnack
		},
	}
</script>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	input[type="text"] {
		width: 20rem;
		padding: 0.5rem;
		box-sizing: border-box;
		font-size: 1rem;
		margin-top: 0.5rem;
		border: none;
		border-bottom: 1px solid #999;
		color: #eee;
		border-radius: none;
		background: transparent;
		transition: all 150ms ease;
	}

	input[type="text"]:hover, input[type="text"]:focus {
		border-color: #2ba4f0;
		border-width: 3px;
		outline: none;
	}

	button[type="submit"] {
		position: relative;
		width: 20rem;
		padding: 0.5rem;
		border: none;
		border-bottom: 1px solid #ccc;
		font-size: 1.3rem;
		color: #999;
		background: none;
		transition: all 100ms ease;
		margin-top: 1rem;
		outline: none;
	}

	button[type="submit"]::before {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 0;
		transition: all 200ms ease;	
		content: "";
	}

	button[type="submit"]:hover, button[type="submit"]:focus {
		color: #fff;
		cursor: pointer;
		border-color: #2ba4f0;
	}

	button[type="submit"]:hover::before, button[type="submit"]:focus::before {
		top: 0;
		height: 100%;
		z-index: -1;
		background: #2ba4f0;
		content: "";
	}
</style>

<template>
	<form>
		<input type="text" placeholder="Author (optional)" v-model="author" />
		<input type="text" placeholder="Title" v-model="title" />	
		<button type="submit" @click="search">Search 🔎</button>
	</form>

	<ErrorSnack v-if="error" :message="error" />
</template>