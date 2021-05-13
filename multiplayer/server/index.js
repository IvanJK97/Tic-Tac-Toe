const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client")));
app.use("/api", require("./routes/games"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
