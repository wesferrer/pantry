var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema ({
	comment: String,
	rating: {
		type: Number,
    default: 3,
		min: 1,
    max: 5
	},
	reviewer: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var recipeSchema = new Schema({
  title: String,
	recipeId: Number,
	ingredients: [],
	directions: String,
	calories: {value: Number, unit: String}, //virtual property
	sodium: {value: Number, unit: String},
	fat: {value: Number, unit: String},
	protein: {value: Number, unit: String},
	carbs: {value: Number, unit: String},
	fiber: {value: Number, unit: String},
	cookingMinutes: Number,
	preparationMinutes: Number,
	servingSize: Number,
	imageUrl: String,
	review: [reviewSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);
