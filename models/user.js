var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shoppingSchema = new Schema ({
	recipe: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
	grocery: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}]
});

var userSchema = new Schema({
	name: String,
	email: String,
	favorites: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
	pantry: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
	restrictions: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
	shoppingList: [shoppingSchema],
  googleId: String
});

module.exports = mongoose.model('User', userSchema);
