import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';

import './assets/main.css'

const messages = {
	en: {
		message: {
			authorPlaceholder: 'Author (optional)',
			titlePlaceholder: 'Title',
			searchButton: 'Search 🔎',
		}
	},
	pt: {
		message: {
			authorPlaceholder: 'Autor (opcional)',
			titlePlaceholder: 'Título',
			searchButton: 'Buscar 🔎',
		}
	}
}

const i18n = createI18n({
	locale: navigator.language,
	fallbackLocale: 'en',
	messages
});
createApp(App).use(router).use(i18n).mount('#app');
