const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categorierepasController = {
    // Get all categorierepas
    getAll: async (req, res) => {
        try {
            const categorierepas = await prisma.categorierepas.findMany();
            res.json(categorierepas);
        } catch (error) {
            console.error('Error fetching categorierepas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get categorierepas by ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const categorierepas = await prisma.categorierepas.findUnique({
                where: { id: parseInt(id) }
            });
            if (!categorierepas) {
                return res.status(404).json({ error: 'Categorierepas not found' });
            }
            res.json(categorierepas);
        } catch (error) {
            console.error('Error fetching categorierepas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Create a new categorierepas
    create: async (req, res) => {
        const { nom } = req.body;
        try {
            const categorierepas = await prisma.categorierepas.create({
                data: { nom }
            });
            res.status(201).json(categorierepas);
        } catch (error) {
            console.error('Error creating categorierepas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update a categorierepas
    update: async (req, res) => {
        const { id } = req.params;
        const { nom } = req.body;
        try {
            const updatedCategorierepas = await prisma.categorierepas.update({
                where: { id: parseInt(id) },
                data: { nom }
            });
            res.json(updatedCategorierepas);
        } catch (error) {
            console.error('Error updating categorierepas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // getallrepass: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         const categorierepas = await prisma.categorierepas.findUnique({
    //             where: { id: parseInt(id) },
    //             include: { repas: true }
    //         });
    //         if (!categorierepas) {
    //             return res.status(404).json({ error: 'Categorierepas not found' });
    //         }
    //         res.json(categorierepas.repas);
    //     } catch (error) {
    //         console.error('Error fetching categorierepas:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // },

    // Delete a categorierepas
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.categorierepas.delete({ where: { id: parseInt(id) } });
            res.json({ message: 'Categorierepas deleted successfully' });
        } catch (error) {
            console.error('Error deleting categorierepas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = categorierepasController;
