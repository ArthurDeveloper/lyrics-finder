import { createRouter, createWebHistory } from 'vue-router';
import Lyrics from '../views/Lyrics.vue';

const routes = [
	{
		path: '/lyrics/:title/:author',
		name: 'lyrics',
		component: Lyrics
	},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
