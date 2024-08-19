const { Category } = require('../models/category');

const CreateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'O campo "name" é obrigatório.' });
        }

        const result = await Category.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar categoria!' });
    }
};

const SearchCategoryAll = async (req, res) => {
    try {
        const result = await Category.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias!' });
    }
};

const SearchCategoryId = async (req, res) => {
    try {
        const result = await Category.findOne({ where: { id: req.params.id } });

        if (!result) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categoria!' });
    }
};

const UpdateCategory = async (req, res) => {
    try {
        const [updated] = await Category.update(req.body, { where: { id: req.params.id } });

        if (updated === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada ou sem alterações.' });
        }

        res.status(200).json({ message: 'Categoria atualizada!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar categoria!' });
    }
};

const DeleteCategory = async (req, res) => {
    try {
        const deleted = await Category.destroy({ where: { id: req.params.id } });

        if (deleted === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada!' });
        }

        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar categoria!' });
    }
};

module.exports = {
    CreateCategory, SearchCategoryAll, SearchCategoryId, UpdateCategory, DeleteCategory,
};