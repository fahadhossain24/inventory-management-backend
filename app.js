const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('server is running');
});

module.exports = app