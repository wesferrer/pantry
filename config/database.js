var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/pantry');
var db = mongoose.connect(process.env.DATABASE_URL);

db.connection.on('open', function(){
	console.log(`connected to ${db.connection.name} on ${db.connection.host} ${db.connection.port}`);
});
