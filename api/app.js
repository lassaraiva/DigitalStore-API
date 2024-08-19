require('dotenv').config();

const port = process.env.PORT || 3000;
const app = require('./routes/server')

require('./routes/authRoutes')
require('./routes/usersRoutes')
require('./routes/categoryRoutes')
require('./routes/productRoutes')

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });