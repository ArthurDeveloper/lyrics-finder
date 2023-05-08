<style>
	.dots-container {
		display: flex;
		justify-content: center;
	}

	.dots {
		width: 20rem;
		height: 20rem;
		animation: spin 700ms infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg) scale(0.2);
		} to {
			transform: rotate(360deg) scale(0.2);
		}
	}

	.dot {
		position: absolute;
		left: calc(50% - 1rem);
		top: calc(50% - 1rem);
		background: #000;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	.dot:nth-child(1) {
		transform: translateX(10rem);
	}

	.dot:nth-child(2) {
		transform: rotate(45deg) translateX(10rem);
	}

	.dot:nth-child(3) {
		transform: rotate(90deg) translateX(10rem);
	}

	.dot:nth-child(4) {
		transform: rotate(135deg) translateX(10rem);
	}

	.dot:nth-child(5) {
		transform: rotate(180deg) translateX(10rem);
	}

	.dot:nth-child(6) {
		transform: rotate(225deg) translateX(10rem);
	}

	.dot:nth-child(7) {
		transform: rotate(270deg) translateX(10rem);
	}
	
	.dot:nth-child(8) {
		transform: rotate(315deg) translateX(10rem);
	}
</style>

<template>
	<div class="dots-container">
		<div class="dots">
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
	</div>
</template>