const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');


const abonnenewsletterController = {
  // Get all abonnenewsletters
  getAll: async (req, res) => {
    try {
      const abonnenewsletters = await prisma.abonnenewsletter.findMany();
      res.json(abonnenewsletters);
    } catch (error) {
      console.error("Error fetching abonnenewsletters:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get abonnenewsletter by ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const abonnenewsletter = await prisma.abonnenewsletter.findUnique({
        where: { id: parseInt(id) },
      });
      if (!abonnenewsletter) {
        return res.status(404).json({ error: "Abonnenewsletter not found" });
      }
      res.json(abonnenewsletter);
    } catch (error) {
      console.error("Error fetching abonnenewsletter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Create a new abonnenewsletter
  create: async (req, res) => {
    const { email } = req.body;
    try {
      const existemail = await prisma.abonnenewsletter.findFirst({
        where: { email },
      });

      if (existemail) {
        return res.render('index', { errorMessage: 'Email already exists' });
      }
      const abonnenewsletter = await prisma.abonnenewsletter.create({
        data: { email },
      });

      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true, // Use true for port 465, false for all other ports
        auth: {
          user: "aprenant2@talents4starups.com",
          pass: "jBmm!mx8",
        },
      });

      await transporter.sendMail({
        from: "aprenant2@talents4starups.com",
        to: abonnenewsletter.email,
        subject: "Welcome to our Newsletter!",
        text: "Thank you for subscribing to our newsletter. You will now receive regular updates from us.",
      });

    //   await prisma.abonnenewsletter.update({
    //     where: { id: abonnenewsletter.id },
    //     data: { lastSentAt: new Date() },
    //   });

      // res.send(abonnenewsletter);
      res.redirect('/');
    } catch (error) {
      console.error("Error creating abonnenewsletter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Update an abonnenewsletter
  update: async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const updatedAbonnenewsletter = await prisma.abonnenewsletter.update({
        where: { id: parseInt(id) },
        data: { email },
      });
      res.json(updatedAbonnenewsletter);
    } catch (error) {
      console.error("Error updating abonnenewsletter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete an abonnenewsletter
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.abonnenewsletter.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Abonnenewsletter deleted successfully" });
    } catch (error) {
      console.error("Error deleting abonnenewsletter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = abonnenewsletterController;
