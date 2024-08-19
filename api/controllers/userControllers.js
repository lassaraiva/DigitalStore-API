const { User } = require('../models/user');

const CreateUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário!' });
  }
};

const SearchUserAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários!' });
  }
};

const SearchUserId = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário!' });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });

    if (updated === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado ou sem alterações.' });
    }

    res.status(200).json({ message: 'Usuário atualizado!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário!' });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário!' });
  }
};

module.exports = {
  CreateUser, SearchUserAll, SearchUserId, UpdateUser, DeleteUser
};