var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: String,
	favorites: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
	pantry: [String],
	restrictions: [String],
  googleId: String
});

module.exports = mongoose.model('User', userSchema);
