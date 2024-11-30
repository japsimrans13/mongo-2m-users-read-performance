const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const User  = require("./models/User");
const { performance } = require("perf_hooks");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL, {});

const app = express();
const port = 3000;
app.use(express.json());


// Endpoint to get user from User model where count of users is 200
app.get("/User/indexed", async (req, res) => {
  const { email } = req.query;

  try {
    const start = performance.now();
    const user = await User.findOne({ indexedEmail: email });
    const end = performance.now();

    const readTime = (end - start).toFixed(2);

    const total = await User.countDocuments();
    res.json({ readTime: `${readTime} ms`, user, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint to get user by non-indexed email
app.get("/User/non-indexed", async (req, res) => {
  const { email } = req.query;

  try {
    const start = performance.now();
    const user = await User.findOne({ nonIndexedEmail: email });
    const end = performance.now();

    const readTime = (end - start).toFixed(2);
    const total = await User.countDocuments();
    res.json({ readTime: `${readTime} ms`, user, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint to add new users
app.post("/users", async (req, res) => {
  const { count } = req.body;
  //   add bulk users
  // get total users in db
  const total = await User.countDocuments();
  // create promises array to add users
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(
      User.create({
        name: `User ${total + i + 1}`,
        indexedEmail: `user${total + i + 1}`,
        nonIndexedEmail: `user${total  + i + 1}`,
      })
    );
  }
  try {
    await Promise.all(promises);
    const newTotal = await User.countDocuments();
    res
      .status(201)
      .json({
        message: "Users added successfully",
        newTotal,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint to delete all users
app.delete("/users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
