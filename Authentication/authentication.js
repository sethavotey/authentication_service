
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());


const PersonModel = require('./person_schema.js');
const dbconnect = require('./dbconnect.js');

// LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await PersonModel.findOne({ emailid: email, pass: password, role });

    if (!user) {
      return res.status(400).send("Invalid user");
    }

    // Sign token with unique user info (id, email, role)
    const token = jwt.sign(
      { id: user._id, email: user.emailid, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(5002, () => {
  console.log('Authentication Service Server is running on PORT NO: 5002');
});
