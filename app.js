require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const requestLogger = require("./server/middleware/requestLogger");

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use the logging middleware
app.use(requestLogger);

// CSRF protection setup
const csrfProtection = csrf({ cookie: true });

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing route files
const restaurantRoutes = require("./server/routes/restaurantRoutes");
const repasRoutes = require("./server/routes/repasRoutes");
const employeRoutes = require("./server/routes/employeRoutes");
const categorierepasRoutes = require("./server/routes/categorierepasRoutes");
const abonnenewsletterRoutes = require("./server/routes/abonnenewsletterRoutes");
const sendEmailController = require("./server/routes/contactUsRoutes");

// Mounting the routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/repas", repasRoutes);
app.use("/api/employes", employeRoutes);
app.use("/api/categorierepas", categorierepasRoutes);
app.use("/api/abonnenewsletters", abonnenewsletterRoutes);
app.use("/api/sendEmail", sendEmailController);

//used_Data

// Routes
app.get("/", csrfProtection, async (req, res) => {
  try {
    const categories = await prisma.categorierepas.findMany({
      include: { repas: true },
    });
    const teamMembers = await prisma.employe.findMany();
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt("1") },
    });

    const categorizedRepas = {
      breakfast: [],
      launch: [],
      dinner: [],
    };

    categories.forEach((category) => {
      category.repas.forEach((repas) => {
        if (category.nom.toLowerCase() === "breakfast") {
          categorizedRepas.breakfast.push(repas);
        } else if (category.nom.toLowerCase() === "launch") {
          categorizedRepas.launch.push(repas);
        } else if (category.nom.toLowerCase() === "dinner") {
          categorizedRepas.dinner.push(repas);
        }
      });
    });

    res.render("index", {
      categorizedRepas,
      teamMembers,
      restaurant,
      csrfProtection: req.csrfToken(),
      currentPage: "home",
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories: " + error.message);
  }
});

app.get("/about", csrfProtection, async (req, res) => {
  const teamMembers = await prisma.employe.findMany();
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: parseInt("1") },
  });
  res.render("about", {
    restaurant,
    teamMembers,
    csrfProtection: req.csrfToken(),
    currentPage: "about",
  });
});

app.get("/contact", csrfProtection, async (req, res) => {
  const teamMembers = await prisma.employe.findMany();
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: parseInt("1") },
  });
  res.render("contact", {
    restaurant,
    teamMembers,
    csrfProtection: req.csrfToken(),
    currentPage: "contact",
  });
});

app.get("/addMeal",csrfProtection, async (req, res) => {
  try {
    const categories = await prisma.categorierepas.findMany();
    const restaurants = await prisma.restaurant.findMany();
    res.render("addMeal", { categories, restaurants,csrfProtection: req.csrfToken(), currentPage: "addMeal" });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories: " + error.message);
  }
});

// Include your routes here
app.get("/addEmploye",csrfProtection, async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    const teamMembers = await prisma.employe.findMany();
    res.render("addEmploye", {
      restaurants,
      teamMembers,
      currentPage: "addEmploye",
      csrfProtection: req.csrfToken()
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).send("Error fetching restaurants: " + error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
