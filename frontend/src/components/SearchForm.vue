<script lang="ts">
	export default {
		data() {
			return {
				author: '',
				title: '',
				response: ''
			}
		},
		methods: {
			async search(e: Event) {
				e.preventDefault();

				const response = await fetch(`http://localhost:8000/lyrics/${this.title}/${this.author}`);
				const data = await response.json();

				if (response.status === 200) {
					this.response = data.Lyric.replaceAll('\n', '<br>');
				} else {
					this.response = 'No lyrics found';
				}
			}
		}
	}
</script>

<template>
	<form>
		<input type="text" placeholder="Author" aria-placeholder="Author" v-model="author" />
		<input type="text" placeholder="Title" aria-placeholder="Title" v-model="title" />	
		<button type="submit" @click="search">Search 🔎</button>

		<h2 v-html="response"></h2>
	</form>
</template>