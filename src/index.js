const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Fake user database
const users = [
  { id: 1, email: "ajaykumar1071999@gmail.com", name: "Ajay Kumar" },
];

// const sendMail = (res) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     service: "gmail",
//     secure: true,
//     port: 465,
//     auth: {
//       user: "ajaykumar1071999@gmail.com",
//       pass: "acrwxyahsrfbrown",
//     },
//   });

//   const mailOptions = {
//     from: {
//       address: "ajaykumar1071999@gmail.com",
//       name: "Ajay umar",
//     },
//     to: "ajaykumar1071999@gmail.com",
//     subject: "Sending Email using Node.js",
//     text: "That was easy!",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//       res.send({ status: 500, message: error });
//     } else {
//       res.send({ status: 200, message: "Link Sent" });
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// app.post("/request-login", (req, res) => {
//   sendMail(res);
// });

// Function to send email with login link
const sendLoginLink = async (email, token, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "ajaykumar1071999@gmail.com",
      pass: "acrwxyahsrfbrown",
    },
  });

  const mailOptions = {
    from: {
      address: "ajaykumar1071999@gmail.com",
      name: "Ajay Kumar",
    },
    to: "ajaykumar1071999@gmail.com",
    subject: "Login Link",
    text: "That was easy!",
    text: `Click on the following link to login: http://localhost:${port}/login?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Login link sent to email");
    res.status(200).send({
      token: token,
      message: "Link sent successfully !",
      data: {
        link: `http://localhost:${port}/login?token=${token}`,
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ status: 500, message: error });
  }
};

// Endpoint to request the login link
app.post("/request-login", (req, res) => {
  const { email } = req.body;
  console.log("email", email);

  // Find the user by email (you can replace this with a real database query)
  const user = users.find((u) => u.email === email);
  console.log("user", user);
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Create a JWT token for the user
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log("token", token);
  // Send login link via email
  sendLoginLink(email, token, res);
});

// Endpoint to handle login via token
app.get("/login", (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Token is required");
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid or expired token");
    }

    // Log the user in (you can create a session or send a JWT)
    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Example: Send back the user's information or create a session
    res.send(`Welcome ${user.name}, you are successfully logged in!`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
