const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config()

// server port
const port = process.env.PORT || 5000;


// database connection
mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log('Database successfully connected');
        // express server listen
        app.listen(port, () => {
            console.log('Server listing on port', port);
        })
    })
    .catch(err => {
        console.log('database connection error', err)
    })



