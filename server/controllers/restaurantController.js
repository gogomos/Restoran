const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const restaurantController = {
    // Get all restaurants
    getAll: async (req, res) => {
        try {
            const restaurants = await prisma.restaurant.findMany();
            res.json(restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get restaurant by ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: { id: parseInt(id) }
            });
            if (!restaurant) {
                return res.status(404).json({ error: 'Restaurant not found' });
            }
            res.json(restaurant);
        } catch (error) {
            console.error('Error fetching restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Create a new restaurant
    create: async (req, res) => {
        const { nom, adresse, telephone, email, newsletter_abonnement } = req.body;
        try {
            const restaurant = await prisma.restaurant.create({
                data: { nom, adresse, telephone, email, newsletter_abonnement: Boolean(newsletter_abonnement) }
            });
            res.status(201).json(restaurant);
        } catch (error) {
            console.error('Error creating restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update a restaurant
    update: async (req, res) => {
        const { id } = req.params;
        const { nom, adresse, telephone, email, newsletter_abonnement } = req.body;
        try {
            const updatedRestaurant = await prisma.restaurant.update({
                where: { id: parseInt(id) },
                data: { nom, adresse, telephone, email, newsletter_abonnement: Boolean(newsletter_abonnement) }
            });
            res.json(updatedRestaurant);
        } catch (error) {
            console.error('Error updating restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Delete a restaurant
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.restaurant.delete({ where: { id: parseInt(id) } });
            res.json({ message: 'Restaurant deleted successfully' });
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = restaurantController;
