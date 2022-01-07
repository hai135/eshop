const mongoose = require('mongoose');
try {
    console.log('Starting connect to database!!!');
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connect successful');
} catch (e) {
    console.log('Connect failed!!!');
    process.exit(1);
}
