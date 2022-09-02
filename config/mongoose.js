const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;
// mongoose.connect('mongodb://localhost/contacts_list_db');
mongoose.connect(mongo_uri);



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to DB'));
db.once('open', function(){
    console.log('Successfully connected to the Database');
});



