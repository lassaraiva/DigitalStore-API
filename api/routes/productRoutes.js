const app = require('./server')
const {CreateProduct, SearchProductAll, SearchProductId, UpdateProduct, DeleteProduct} = require('../controllers/productController')

app.post('/product', CreateProduct);
app.get('/product/search', SearchProductAll);
app.get('/product/:id', SearchProductId);
app.put('/product/:id', UpdateProduct);
app.delete('/product/:id', DeleteProduct);