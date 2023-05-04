const express = require('express');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.resolve(__dirname, '../lyrics.db'), sqlite3.OPEN_READWRITE);

const app = express();

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
	db.all('SELECT * FROM lyrics WHERE SName LIKE ? AND ALink LIKE ? LIMIT 20', [song, author], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}

		return res.json({
			songs: rows
		});
	});
});

const port = process.env.PORT ?? '8000';
app.listen(port, () => {
	console.log(`App running on port ${port} 🚀`);
});
