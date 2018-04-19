require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Lien } = require('./models/lien');
const { formatResponse } = require('./utils/formatResponse');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/api/lien', (req, res) => {
  const { titre, url, auteur } = req.body;

	const lien = new Lien({
		titre,
		url,
    auteur
	});

	lien.save().then((doc) => {
		res.send(formatResponse(doc));
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/api/liens', (req, res) => {
	Lien.find({}).then((liens) => {
		res.send({ liens: formatResponse(liens) });
	}, (e) => {
		res.status(400).send(e);
	})
});

app.listen(port, () => {
	console.log(`Started server at http://localhost:${port}`);
});

module.exports = { app };
