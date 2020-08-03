const express = require("express");
const app = express();
const db = require("./config/database");
const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/user");
const orderRoutes = require("./api/routes/orders");

app.use(express.json());

//connectin to the database
db.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

//db.sync({ force: true });

// user routes
app.use("/users", userRoutes);

// products routes
app.use("/products", productRoutes);

// orders routes
app.use("/orders", orderRoutes);

app.listen(3000, () => console.log("server running"));
