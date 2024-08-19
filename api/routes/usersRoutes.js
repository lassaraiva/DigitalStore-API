const app = require('./server')
const {CreateUser, SearchUserAll, SearchUserId, UpdateUser, DeleteUser} = require('../controllers/userControllers')

app.post('/user', CreateUser);
app.get('/user', SearchUserAll);
app.get('/user/:id', SearchUserId);
app.put('/user/:id', UpdateUser);
app.delete('/user/:id', DeleteUser);