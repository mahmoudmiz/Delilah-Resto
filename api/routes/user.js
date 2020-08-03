const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userServices = require("./../../utils/users-service");
const userAuth = require("./../middleware/user-auth");
require("dotenv").config();

// signup new user
router.post("/signup", async (req, res, next) => {
  try {
    const user = await userServices.checkUser(req);
    if (user) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      const userCreated = await userServices.createUser(req);
      if (userCreated) {
        res.status(201).json({ message: "User created" });
      }
    }
  } catch (err) {
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// signin user
router.post("/signin", async (req, res) => {
  try {
    const user = await userServices.findUser(req);

    if (user) {
      const match = await userServices.checkUserPassword(req, user);
      if (match) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Auth successful",
          token,
        });
      } else {
        res.status(400).json({
          message: "Email or password are incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "Email or password are incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:userId", userAuth, async (req, res, next) => {
  try {
    const userData = await userServices.identifyUser(req);
    // users can only delete themselves
    if (req.params.userId == userData.id) {
      const result = await userServices.deleteUser(req);
      if (result) {
        res.status(200).json({ message: "User deleted" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(403).json({ message: "unauthorized" });
    }
  } catch (err) {
    if (err.errors && err.errors[0].message) {
      return res.status(500).json({ message: err.errors[0].message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
