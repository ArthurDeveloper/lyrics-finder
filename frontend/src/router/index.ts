import { createRouter, createWebHistory } from 'vue-router';
import Lyrics from '../views/Lyrics.vue';
import SongList from '../views/SongList.vue';

const routes = [
	{
		path: '/lyrics/:title',
		name: 'songlist',
		component: SongList
	},
	{
		path: '/lyrics/:title/:author',
		name: 'lyrics',
		component: Lyrics
	}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
