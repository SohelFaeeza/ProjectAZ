const express = require("express");
const sql = require("mssql");

const path = require("path");          // Add this at the top if not already there
app.use(express.static(__dirname, welcome.html));  
const port = process.env.PORT || 3000;

// Get DB connection string from environment variable (Key Vault injects it)
const connectionString = process.env.dbconnection;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "welcome.html"));  // Serve your HTML file
});


app.listen(port, () => console.log(`App listening on port ${port}`));
