const express = require('express');
const cors = require('cors');
const productRouter = require('./router/product.router');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use('/api/v1/product', productRouter)

app.get('/', (req, res) => {
    res.send('server is running');
});

module.exports = app