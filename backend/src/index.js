const express = require('express');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.resolve(__dirname, '../lyrics.db'), sqlite3.OPEN_READWRITE);

const app = express();

app.get('/lyrics/:song', (req, res) => {
	console.log(req.params.song);

	db.get('SELECT * FROM lyrics WHERE SName LIKE \'%?%\'', [req.params.song], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}

		return res.json({
			data: rows
		});
	});
});

const port = process.env.PORT ?? '8000';
app.listen(port, () => {
	console.log(`App running on port ${port} 🚀`);
});
