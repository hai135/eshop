const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./src/database/connectdb');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan('dev'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

require('./src/routes/index')(app);

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});
