const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('../middleware/multerConfig'); // Adjust the path if necessary
const { repasSchema } = require('../helpers/validators');

const repasController = {
    // Get all repas
    getAll: async (req, res) => {
        try {
            const repas = await prisma.repas.findMany();
            res.json(repas);
        } catch (error) {
            console.error('Error fetching repas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get repas by ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const repas = await prisma.repas.findUnique({
                where: { id: parseInt(id) },
                include: { categorierepas: true, restaurant: true }
            });
            if (!repas) {
                return res.status(404).json({ error: 'Repas not found' });
            }
            res.json(repas);
        } catch (error) {
            console.error('Error fetching repas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Create a new repas
    create: async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            const { nom, description, prix, categorie_id, restaurant_id } = req.body;
            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }
            const {error , value} = repasSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    errors: error.details.map(detail => detail.message)
                });
            }

            try {
                const repas = await prisma.repas.create({
                    data: { 
                        nom, 
                        description, 
                        prix: parseFloat(prix), 
                        categorie_id: parseInt(categorie_id), 
                        restaurant_id: parseInt(restaurant_id),
                        image_url: imageUrl
                    }
                });
                // res.status(201).json(repas);
                res.redirect('/');
            } catch (error) {
                console.error('Error creating repas:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },

    // Update a repas
    update: async (req, res) => {
        const { id } = req.params;
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            const { nom, description, prix, categorie_id, restaurant_id } = req.body;
            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }

            try {
                const data = { 
                    nom, 
                    description, 
                    prix: parseFloat(prix), 
                    categorie_id: parseInt(categorie_id), 
                    restaurant_id: parseInt(restaurant_id) 
                };
                if (imageUrl) {
                    data.image_url = imageUrl;
                }
                const updatedRepas = await prisma.repas.update({
                    where: { id: parseInt(id) },
                    data: data
                });
                res.json(updatedRepas);
            } catch (error) {
                console.error('Error updating repas:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },

    // Delete a repas
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.repas.delete({ where: { id: parseInt(id) } });
            res.json({ message: 'Repas deleted successfully' });
        } catch (error) {
            console.error('Error deleting repas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Upload image for repas
    uploadImage: async (req, res) => {
        const { id } = req.params;
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            if (req.file == undefined) {
                return res.status(400).json({ message: 'No file selected' });
            }

            const imageUrl = `/uploads/${req.file.filename}`;

            try {
                const updatedRepas = await prisma.repas.update({
                    where: { id: parseInt(id) },
                    data: { image_url: imageUrl }
                });
                res.json(updatedRepas);
            } catch (error) {
                console.error('Error updating repas:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
};

module.exports = repasController;
