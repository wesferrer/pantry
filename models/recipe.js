var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
  name: String,
  amount: Number,
  unit: String
});

var reviewSchema = new Schema ({
	comment: String,
	rating: {
		type: Number,
    default: 3,
		min: 1,
    max: 5
	},
	reviewer: {type: Schema.Types.ObjectId, ref: 'User'}
});

var nutrientSchema = new Schema ({
	title: String,
	amount: Number,
	unit: String
});

var recipeSchema = new Schema({
  title: String,
	recipeId: Number,
	ingredients: [ingredientSchema],
	directions: String,
	nutrients: [nutrientSchema],
	cookingMinutes: Number,
	preparationMinutes: Number,
	readyInMinutes: Number,
	servingSize: Number,
	imageUrl: String,
	reviews: [reviewSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);
