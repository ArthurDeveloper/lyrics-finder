<script lang="ts">
	import LoadingDots from '@/components/LoadingDots.vue';
	import SongCard from '@/components/SongCard.vue';

	type Song = {
		SName: string,
		ALink: string,
	}

	export default {
		data() {
			return {
				title: '',
				songs: new Array<Song>(),
				loading: false,
			}
		},
		async mounted() {
			this.loading = true;
			this.songs = [];

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
				`http://localhost:8000/lyrics/${this.title}`, 15000,
				() => {
					aborted = true;
					this.loading = false;
				}
			);

			if (aborted) {
				return;
			}
			const data = await response.json();

			console.log(data);
			if (response.status === 200) {
				if (data.songs) {
					for (const song of data.songs) {
						const titleCase = (str: string) => {
							return str.split(' ').map((part) => {
								return [part[0].toUpperCase(), part.slice(1)].join('')
							}).join(' ');
						}

						song.ALink = titleCase(song.ALink.split('-').join(' ').replaceAll('/', ''));
					}

					this.songs = data.songs.sort((a: Song, b: Song) => a.SName > b.SName ? 1 : -1);
				}
			}

			this.loading = false;
		},
		components: {
			LoadingDots,
			SongCard
		}
	}
</script>

<template>
	<div v-for="song of songs">
		<div @click="() => $router.push(`/lyrics/${song.SName}/${song.ALink}`)">
			<SongCard :author="song.ALink" :name="song.SName" />
		</div>
	</div>

	<LoadingDots v-if="loading"/>
</template>