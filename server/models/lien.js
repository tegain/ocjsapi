const mongoose = require('mongoose');

// @validators: http://mongoosejs.com/docs/validation.html
const Lien = mongoose.model('Lien', {
	titre: {
		type: String,
		minLength: 2,
		trim: true
	},
	url: {
		type: String,
    trim: true,
		default: null
	},
	auteur: {
		type: String,
    trim: true,
		default: null
	}
});

module.exports = { Lien };
