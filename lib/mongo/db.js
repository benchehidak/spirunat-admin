//setup a mongo connection
let mongoose = require('mongoose');
let config = 
{
    mongo: {
        uri: 'mongodb://localhost:27017/test',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}
let db = mongoose.connection;
mongoose.connect(config.mongo.uri);
mongoose.connection.on('connected', () => {
    console.log('Database connected');
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('MongoDB connection successful');
}
);
module.exports = db;
