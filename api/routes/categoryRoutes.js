const app = require('./server')
const {CreateCategory, SearchCategoryAll, SearchCategoryId, UpdateCategory, DeleteCategory} = require('../controllers/categoryController')

app.post('/category', CreateCategory);
app.get('/category/search', SearchCategoryAll);
app.get('/category/:id', SearchCategoryId);
app.put('/category/:id', UpdateCategory);
app.delete('/category/:id', DeleteCategory);