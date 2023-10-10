const express = require('express');
const cors = require('cors');
const productRouter = require('./router/product.router');
const bandRouter = require('./router/brand.route');
const categoryRouter = require('./router/category.route');
const storeRouter = require('./router/store.router');
const supplierRouter = require('./router/supplier.route');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use('/api/v1/product', productRouter);
app.use('/api/v1/brand', bandRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/supplier', supplierRouter)

app.get('/', (req, res) => {
    res.send('server is running');
});

module.exports = app