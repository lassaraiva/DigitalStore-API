const { Product, ProductImage, ProductOption } = require('../models/product');
const { Category } = require('../models/category');

const CreateProduct = async (req, res) => {
    try {
        const { category_ids, images, options, ...productData } = req.body;
        const product = await Product.create(productData);

        if (category_ids && Array.isArray(category_ids)) {
            await product.addCategories(category_ids);
        }

        if (images && Array.isArray(images)) {
            await ProductImage.bulkCreate(
                images.map((image) => ({
                    product_id: product.id,
                    path: image.content,
                    enabled: image.enabled
                }))
            );
        }

        if (options && Array.isArray(options)) {
            await ProductOption.bulkCreate(
                options.map((option) => ({
                    product_id: product.id,
                    title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    value: option.value
                }))
            );
        }

        const responseBody = {
            ...product.toJSON(),
            category_ids,
            images: images || [],
            options: options ? options.map(option => ({
                title: option.title,
                shape: option.shape,
                radius: option.radius,
                type: option.type,
                value: option.value.replace(/[{}]/g, '').split(',')
            })) : []
        };

        res.status(201).json(responseBody);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o produto!' });
    }
};

const SearchProductAll = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 30);
        const offset = (page - 1) * limit;
        const fields = req.query.fields || '';
        let attributes = fields.split(',').filter(field => field !== 'images' && field !== 'options' && field !== 'categories');

        const includeImages = !fields || fields.includes('images');
        const includeOptions = !fields || fields.includes('options');
        const includeCategories = !fields || fields.includes('categories');

        const { rows: products, count: total } = await Product.findAndCountAll({
            offset,
            limit,
            attributes: attributes.length > 0 ? attributes : undefined
        });

        const data = await Promise.all(products.map(async product => {
            let productData = product.toJSON();

            if (includeImages) {
                const images = await ProductImage.findAll({
                    where: { product_id: product.id }
                });
                productData.images = images.map(image => image.toJSON());
            }

            if (includeCategories) {
                const categories = await product.getCategories();
                productData.categories = categories.map(category => category.toJSON());
            }

            if (includeOptions) {
                const options = await ProductOption.findAll({
                    where: { product_id: product.id }
                });
                productData.options = options.map(option => ({
                    ...option.toJSON(),
                    value: option.value.replace(/[{}]/g, '').split(',')
                }));
            }

            return productData;
        }));

        res.status(200).json({ data, total, page, limit });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao visualizar produtos!' });
    }
};

const SearchProductId = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id },
            include: [{ model: Category, through: { attributes: [] } }]
        });

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado!' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto!' });
    }
};

const UpdateProduct = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Produto não encontrado!' });
        }

        const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto!' });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Produto não encontrado!' });
        }

        res.status(200).json({ message: 'Produto deletado!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto!' });
    }
};

module.exports = {
    CreateProduct, SearchProductAll, SearchProductId, UpdateProduct, DeleteProduct
};