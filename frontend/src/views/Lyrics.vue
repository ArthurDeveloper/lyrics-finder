<script lang="ts">
	import LoadingDots from '@/components/LoadingDots.vue';

	export default {
		data() {
			return {
				lyrics: '',
				translated: '',
				loading: true,
				response: '',
				author: '',
				title: '',
				shouldBeTranslated: false,
				isShowingTranslated: false,
				userLanguage: '',
			}
		},
		async mounted() {
			this.loading = true;
			this.lyrics = '';
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
				`http://localhost:8000/lyrics/${this.title}/${this.author}`, 30000,
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
				this.lyrics = data.Lyric;

				this.response = (this.lyrics as string).split('\n').map((part) => {
					return `<div class="lyrics-line">${part}</div>`;
				}).join('');

				if (navigator.language.includes('pt')) {
					this.userLanguage = 'pt';
				} else {
					this.userLanguage = 'en';
				}

				this.shouldBeTranslated = data.language !== this.userLanguage;
			} else {
				this.response = 'No lyrics found';
			}

			this.loading = false;
		},
		methods: {
			async translate() {
				this.isShowingTranslated = true;

				if (this.translated !== '') {
					this.response = (this.translated as string).split('\n').map((part) => {
						return `<div class="lyrics-line">${part}</div>`;
					}).join('');
					
					return;
				}

				this.loading = true;

				const response = await fetch('http://localhost:8000/lyrics/translate', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						'lyrics': this.lyrics.replaceAll('\n', ' '),
						'to': this.userLanguage
					}),
				});

				const data = await response.json();

				this.translated = data.translated;

				this.response = (this.translated as string).split('\n').map((part) => {
					return `<div class="lyrics-line">${part}</div>`;
				}).join('');

				this.loading = false;

				console.log(data);
			},
			async showOriginal() {
				this.isShowingTranslated = false;

				this.response = (this.lyrics as string).split('\n').map((part) => {
					return `<div class="lyrics-line">${part}</div>`;
				}).join('');
			}
		},
		components: {
			LoadingDots,
		},
	}
</script>

<style>
	.lyrics-container {
		display: flex;
		flex-direction: column;
		align-items: center;
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

	.translate-button {
		background: none;
		border: none;
		color: #555;
		transition: all 200ms ease;
		padding: 0.5rem;
	}

	.translate-button:hover {
		cursor: pointer;
		background: #3335;
	}
</style>

<template>
	<div class="lyrics-container" v-if="response && !loading">
		<button class="translate-button" v-if="shouldBeTranslated" @click="() => {
			isShowingTranslated ? showOriginal() : translate();
		}">
			{{ isShowingTranslated ? $t('message.showOriginalButton') : $t('message.translateButton') }}
		</button>
		<p class="lyrics" v-html="response"></p>
	</div>

	<LoadingDots v-if="loading" />
</template>
