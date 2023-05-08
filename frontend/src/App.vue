<script lang="ts">
	import SearchForm from './components/SearchForm.vue';
	import { RouterView } from 'vue-router';

	export default {
		components: {
			SearchForm
		}
	};
</script>

<style>
	body {
		background: #0d0e0f;
		overflow-x: hidden;
	}

	h1 {
		text-align: center;
		margin-bottom: 4rem;
	}
</style>

<template>
	<h1>Lyrics finder</h1>
	<SearchForm />

	<RouterView />
</template>

