var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/pantry');
mongoose.connect(process.env.DATABASE_URL);
