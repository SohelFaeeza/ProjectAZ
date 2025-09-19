// app.js
const express = require("express");
const sql = require("mssql");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, images, HTML)
app.use(express.static(__dirname)); 
// If you move HTML/CSS to a 'public' folder, use:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "welcome.html")); // Serve HTML on "/"
});
const connectionString = process.env.DB_CONNECTION;

// Root route
app.get("/", async (req, res) => {
  if (!connectionString) {
    console.log("DB_CONNECTION not set. Serving static HTML.");
    return res.sendFile(path.join(__dirname, "welcome.html"));
  }

  try {
    let pool = await sql.connect(connectionString);
    let result = await pool.request().query("SELECT GETDATE() as CurrentTime");
    console.log("DB connected successfully:", result.recordset[0].CurrentTime);

    // You can still serve the HTML file
    res.sendFile(path.join(__dirname, "welcome.html"));
    
    // Optional: If you want to pass DB info to HTML, consider a template engine (EJS/Pug)
    
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    // Serve HTML even if DB fails
    res.sendFile(path.join(__dirname, "welcome.html"));
  }
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
