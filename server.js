//Dependencies
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//sets static path
app.use(express.static(path.join(__dirname, "public")));

// Use api router
app.use("/api/notes", require("./routes/api/index"));

//use html router
app.use("/", require("./routes/html/index"));

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
