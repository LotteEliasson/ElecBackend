const orderModel = require('../models/orderModel');

const nodemailer = require('nodemailer')
require('dotenv').config();


const sendEmail = async (req, res) => { 

  const { 
    to, 
    users, 
    message, 
    component_id, 
    username, 
    userEmail, 
    componentName, 
    componentDescription, 
    componentItemId 
  } = req.body;  // Destructure the incoming data

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail email address
      pass: process.env.EMAIL_PASS,  // The 16-character App Password
    },
    logger: true,  // Enable detailed logging
    debug: true    // Enable debug mode
  });

  // Define the email options (to, subject, text)
  let mailOptions = {
    from: process.env.EMAIL_USER,   // Sender address
    to: to,                        // Recipient address (from the request)
    subject: `New Order for Component: ${componentName}`,  // Subject
    text: `User Id: ${users} \n\nUser Name: ${username} \n\nUser Email: ${userEmail} \n\nComponent Id: ${component_id} \n\nComponent Name: ${componentName} \n\nComponent Description: ${componentDescription} \n\nComponent Item Id: ${componentItemId} \n\nMessage: ${message} `,          // Email message body
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Send a success response back to the client
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email: ', error);

    // Send an error response back to the client
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }


}

module.exports =  {
  sendEmail,
}
