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

	.logo-container {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
		margin-bottom: 4rem;
		padding: 5px;
	}

	.logo {
		transition: all 200ms ease;
	}

	.logo:hover {
		filter: brightness(2);
		cursor: pointer;
	}
</style>

<template>
	<div class="logo-container">
		<img class="logo" src="./assets/logo.png" />
	</div>
	<SearchForm />

	<RouterView />
</template>

