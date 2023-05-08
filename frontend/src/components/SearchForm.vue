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
			search(e: Event) {
				e.preventDefault();
				this.$router.push(`/lyrics/${this.title}/${this.author}`);
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
		
	</form>
</template>