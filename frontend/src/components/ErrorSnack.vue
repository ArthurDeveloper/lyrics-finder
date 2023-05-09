<script lang="ts">
	export default {
		props: {
			message: String,
		}
	}
</script>

<style>
	.snack {
		position: fixed;
		top: 80vh;
		left: 50vw;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background: #f53737;
		padding-right: 4rem;
		padding-left: 4rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		border-radius: 0.5rem;
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
		animation-name: shake;
		animation-duration: 250ms;
		animation-iteration-count: 3;
	}

	@keyframes shake {
		0% { transform: translateX(-60%); }
		25% { transform: translateX(-40%); }
		50% { transform: translateX(-60%); }
		75% { transform: translateX(-40%); }
		100% { transform: translateX(-50%); }
	}
</style>

<template>
	<div class="snack">
		{{ message }}
	</div>
</template>