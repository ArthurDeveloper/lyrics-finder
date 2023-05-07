<script lang="ts">
	import SearchForm from './components/SearchForm.vue';
	import { RouterView } from 'vue-router';

	export default {
		components: {
			SearchForm
		}
	};
</script>


<template>
	<h1>Lyrics finder</h1>
	<SearchForm />

	<RouterView />
</template>

