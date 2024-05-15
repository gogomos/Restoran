require('dotenv').config();
const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
// const csrf = require('csurf');
// const bodyParser = require('body-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware setup
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// CSRF protection setup
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

// Pass CSRF token to all views
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing route files
const restaurantRoutes = require('./server/routes/restaurantRoutes');
const repasRoutes = require('./server/routes/repasRoutes');
const employeRoutes = require('./server/routes/employeRoutes');
const categorierepasRoutes = require('./server/routes/categorierepasRoutes');
const abonnenewsletterRoutes = require('./server/routes/abonnenewsletterRoutes');

// Mounting the routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/repas', repasRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/categorierepas', categorierepasRoutes);
app.use('/api/abonnenewsletters', abonnenewsletterRoutes);

// Routes
app.get('/', async (req, res) => {
    try {
        const categories = await prisma.categorierepas.findMany({
            include: { repas: true }
        });

        const categorizedRepas = {
            breakfast: [],
            launch: [],
            dinner: []
        };

        categories.forEach(category => {
            category.repas.forEach(repas => {
                if (category.nom.toLowerCase() === 'breakfast') {
                    categorizedRepas.breakfast.push(repas);
                } else if (category.nom.toLowerCase() === 'launch') {
                    categorizedRepas.launch.push(repas);
                } else if (category.nom.toLowerCase() === 'dinner') {
                    categorizedRepas.dinner.push(repas);
                }
            });
        });

        res.render('index', { categorizedRepas, currentPage: 'home'});
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories: ' + error.message);
    }
});

app.get('/about', (req, res) => {
    res.render('about', { currentPage: 'about'});
});

app.get('/contact', (req, res) => {
    res.render('contact', { currentPage: 'contact'});
});

app.get('/addMeal', async (req, res) => {
    try {
        const categories = await prisma.categorierepas.findMany();
        const restaurants = await prisma.restaurant.findMany();
        res.render('addMeal', { categories, restaurants, currentPage: 'addMeal' });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
