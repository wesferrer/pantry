var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema ({
	comment: String,
	rating: Number,
	reviewer: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var recipeSchema = new Schema({
	ingredients: [],
	directions: String,
	email: String,
	calories: Number,
	sodium: Number,
	fat: Number,
	protein: Number,
	carbs: Number,
	fiber: Number,
	unit: String,
	cookingMinutes: Number,
	preparationMinutes: Number,
	servingSize: Number,
	_id: Number,
	image: String,
	review: [reviewSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);