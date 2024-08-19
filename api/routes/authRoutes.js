const app = require('./server');
const { login } = require('../controllers/authController');
const {authenticateToken} = require('../middleware/authMiddleware')

app.post('/user/login', login);
app.get('/user/meus-pedidos', authenticateToken , (req, res) => {
    res.json({ user: req.user })});

