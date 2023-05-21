const express = require('express');
const path = require('path');
const cors = require('cors');
const { translate } = require('@vitalets/google-translate-api');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.resolve(__dirname, '../lyrics.db'), sqlite3.OPEN_READWRITE);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/lyrics/:song', (req, res) => {
	const song = `${req.params.song}%`;
	db.all('SELECT * FROM lyrics WHERE SName LIKE ? LIMIT 20', [song], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}

		return res.json({
			songs: rows
		});
	});
});

app.get('/lyrics/:song/:author', (req, res) => {
	const song = `${req.params.song}%`;
	const author = `/%${req.params.author.toLowerCase().split(' ').join('-')}%/`;
	console.log(author);
	db.get('SELECT * FROM lyrics WHERE SName LIKE ? AND ALink LIKE ? LIMIT 20', [song, author], (err, row) => {
		if (err) {
			return console.error(err.message);
		}

		return res.json(row);
	});
});

app.post('/lyrics/translate', async (req, res) => {
	const { lyrics, to } = req.body;
	console.log(req.body);

	const { text } = await translate(lyrics, { to });

	const splitSentences = (string) => {
		const words = string.split(' ');
		const sentences = [];
		let currentSentence = '';

		for (const word of words) {
			const firstLetter = word[0];
			if (firstLetter === firstLetter.toLowerCase() && firstLetter !== firstLetter.toUpperCase()) {
				currentSentence += word + ' ';
			} else {
				sentences.push(currentSentence);
				currentSentence = word + ' ';
			}
		}

		return sentences;
	}

	const translated = splitSentences(text).join('\n').trimStart();
	console.log(translated);

	return res.json({
		translated
	});
});

const port = process.env.PORT ?? '8000';
app.listen(port, () => {
	console.log(`App running on port ${port} 🚀`);
});
