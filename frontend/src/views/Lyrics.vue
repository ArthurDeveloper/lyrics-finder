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

			console.log(this.$route.params);

			this.author = (this.$route.params.author as string).trimStart().trimEnd();
			this.title = (this.$route.params.title as string).trimStart().trimEnd();

			console.log(this.author);
			console.log(this.title);

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
				this.response = data.Lyric.replaceAll('\n', '<br>');
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

<template>
	<p v-html="response"></p>

	<LoadingDots v-if="loading" />
</template>
