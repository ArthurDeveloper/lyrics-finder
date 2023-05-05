<script lang="ts">
	import LoadingDots from './LoadingDots.vue';

	export default {
		data() {
			return {
				author: '',
				title: '',
				response: '',
				loading: false,
			}
		},
		methods: {
			async search(e: Event) {
				e.preventDefault();
				this.loading = true;
				this.response = '';

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
					`http://localhost:8000/lyrics/${this.title}/${this.author}`, 10000,
					() => {
						aborted = true;
						this.loading = false;
						this.response = 'No lyrics found';
					}
				);
				
				if (aborted) {
					return;
				}
				const data = await response.json();

				console.log(data);
				if (response.status === 200) {
					if (data.songs) {
						this.response = data.songs[0].Lyric.replaceAll('\n', '<br>')
					} else {
						this.response = data.Lyric.replaceAll('\n', '<br>');
					}
				} else {
					this.response = 'No lyrics found';
				}

				this.loading = false;
			}
		},
		components: {
			LoadingDots,
		}
	}
</script>

<template>
	<form>
		<input type="text" placeholder="Author" aria-placeholder="Author" v-model="author" />
		<input type="text" placeholder="Title" aria-placeholder="Title" v-model="title" />	
		<button type="submit" @click="search">Search 🔎</button>

		<h2 v-html="response"></h2>

		<LoadingDots v-if="loading"/>
	</form>
</template>