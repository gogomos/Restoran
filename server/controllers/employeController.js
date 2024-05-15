const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('../middleware/multerConfig'); // Adjust the path if necessary

const employeController = {
    // Get all employes
    getAll: async (req, res) => {
        try {
            const employes = await prisma.employe.findMany();
            res.json(employes);
        } catch (error) {
            console.error('Error fetching employes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get employe by ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const employe = await prisma.employe.findUnique({
                where: { id: parseInt(id) }
            });
            if (!employe) {
                return res.status(404).json({ error: 'Employe not found' });
            }
            res.json(employe);
        } catch (error) {
            console.error('Error fetching employe:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Create a new employe
    create: async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            const { nom, poste, restaurant_id } = req.body;
            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }

            try {
                const employe = await prisma.employe.create({
                    data: { nom, poste, restaurant_id: parseInt(restaurant_id), image_url: imageUrl }
                });
                res.status(201).json(employe);
            } catch (error) {
                console.error('Error creating employe:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },

    // Update an employe
    update: async (req, res) => {
        const { id } = req.params;
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err });
            }
            const { nom, poste, restaurant_id } = req.body;
            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }

            try {
                const data = { nom, poste, restaurant_id: parseInt(restaurant_id) };
                if (imageUrl) {
                    data.image_url = imageUrl;
                }
                const updatedEmploye = await prisma.employe.update({
                    where: { id: parseInt(id) },
                    data: data
                });
                res.json(updatedEmploye);
            } catch (error) {
                console.error('Error updating employe:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    },

    // Delete an employe
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.employe.delete({ where: { id: parseInt(id) } });
            res.json({ message: 'Employe deleted successfully' });
        } catch (error) {
            console.error('Error deleting employe:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Upload image for employe
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
                const updatedEmploye = await prisma.employe.update({
                    where: { id: parseInt(id) },
                    data: { image_url: imageUrl }
                });
                res.json(updatedEmploye);
            } catch (error) {
                console.error('Error updating employe:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
};

module.exports = employeController;
