<script lang="ts">
	import LoadingDots from './LoadingDots.vue';
	import SongCard from './SongCard.vue';

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
			}
		},
		methods: {
			async search(e: Event) {
				e.preventDefault();
				this.loading = true;
				this.response = '';
				this.songs = [];

				this.author = this.author.trimStart().trimEnd();
				this.title = this.title.trimStart().trimEnd();

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
			SongCard,
		},
	}
</script>

<template>
	<form>
		<input type="text" placeholder="Author (optional)" v-model="author" />
		<input type="text" placeholder="Title" v-model="title" />	
		<button type="submit" @click="search">Search 🔎</button>

		<h2 v-html="response"></h2>
		<div v-for="song of songs">
			<SongCard :author="song.ALink" :name="song.SName" />
		</div>

		<LoadingDots v-if="loading"/>
	</form>
</template>