<script lang="ts">
	import LoadingDots from '@/components/LoadingDots.vue';

	export default {
		data() {
			return {
				lyrics: '',
				loading: true,
				response: '',
				author: '',
				title: ''
			}
		},
		async mounted() {
			this.loading = true;
			this.response = '';

			this.author = (this.$route.params.author as string).trimStart().trimEnd();
			this.title = (this.$route.params.title as string).trimStart().trimEnd();

			async function fetchWithTimeout(resource: string, timeout: number, action: Function) {
				const controller = new AbortController();
				const id = setTimeout(() => {
					controller.abort();
					action();
				}, timeout);

				const response = await fetch(resource, {
					signal: controller.signal
				});
				clearTimeout(id);

				return response;
			}

			let aborted = false;
			const response = await fetchWithTimeout(
				`http://localhost:8000/lyrics/${this.title}/${this.author}`, 15000,
				() => {
					aborted = true;
					this.loading = false;
					this.response = 'No lyrics found';
				}
			);

			if (aborted) {
				this.response = 'No lyrics found';
				return;
			}
			const data = await response.json();

			if (response.status === 200) {
				this.response = (data.Lyric as string).split('\n').map((part) => {
					return `<div class="lyrics-line">${part}</div>`;
				}).join('');
			} else {
				this.response = 'No lyrics found';
			}

			this.loading = false;
		},
		components: {
			LoadingDots,
		}
	}
</script>

<style>
	.lyrics-container {
		display: flex;
		justify-content: center;
	}

	.lyrics {
		padding: 1.5rem;
		border: 1px solid #eee;
		font-size: 1.5rem;
	}

	.lyrics-line {
		color: #555;
		transition: all 300ms ease;
		margin-bottom: 1.5rem;
	}

	.lyrics-line:hover {
		color: #000;
		cursor: pointer;
		transform: scale(1.2) translateX(3rem);
	}
</style>

<template>
	<div class="lyrics-container" v-if="response">
		<p class="lyrics" v-html="response"></p>
	</div>

	<LoadingDots v-if="loading" />
</template>
