const nodemailer = require('nodemailer');

const sendEmailController = async(req, res) => {
    const { My_name, My_mail, subject ,comment } = req.body;
    try {
      
      const transporter = nodemailer.createTransport({
        // host: "smtp.zoho.com",
        service: "gmail",
        port: 465,
        secure: true, // Use true for port 465, false for all other ports
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_PASSWORD,
        },
      });

      await transporter.sendMail({
        from:process.env.ADMIN_EMAIL ,
        to: process.env.ADMIN_EMAIL,
        subject: subject,
        text: `Name: ${My_name}\nEmail: ${My_mail}\nMessage: ${comment}`
      });
      await transporter.sendMail({
        from:process.env.ADMIN_EMAIL,
        to: My_mail,
        subject: "Auto Reply",
        text: "Thank you for contacting us. We will get back to you shortly."
      });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }
module.exports = {
    sendEmailController
};