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
		margin-top: 2rem;
	}

	.lyrics {
		padding: 1.5rem;
		background: #25282e;
		border-radius: 0.2rem;
		font-size: 1.5rem;
		transition: all 500ms ease;
	}

	.lyrics:hover {
		box-shadow: 0px 0px 12px 3px #040404;
		transform: translateY(-0.5rem);
	}

	.lyrics-line {
		color: #919191;
		transition: all 300ms ease;
		padding-bottom: 1.5rem;
	}

	.lyrics-line:hover {
		color: #fff;
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
