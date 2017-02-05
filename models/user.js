var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shoppingSchema = new Schema ({
	recipe: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
	grocery: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
});

var userSchema = new Schema({
	name: String,
	email: String,
	favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
	pantry: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
	restrictions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
	shoppingList: [shoppingSchema]
});

module.exports = mongoose.model('User', userSchema);