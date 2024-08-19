const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const { User } = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'A configuração do servidor está incorreta!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor!' });
  }
};

module.exports = {
  login,
};