require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

require("./routes/authRoutes")(app);

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = { app, server };