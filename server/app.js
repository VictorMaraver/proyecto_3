
require("dotenv/config");

require("./db");


const express = require("express");

const app = express();

require("./config")(app);
require("./config/session.config")(app)
require("./config/cors.config")(app);

const allRoutes = require("./routes");
app.use("/api", allRoutes);


app.use((req, res) => res.sendFile(__dirname + "/public/index.html"));

module.exports = app;
