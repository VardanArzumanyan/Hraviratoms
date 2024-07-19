const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app and public directory
app.use(express.static(path.join(__dirname, "hraviratoms", "build")));
app.use("/data", express.static(path.join(__dirname, "public", "data")));

// Endpoint to handle form submissions
app.post("/submit", (req, res) => {
  const { firstName, lastName, guestCount } = req.body;

  // Path to the data.json file
  const dataPath = path.join(
    __dirname,
    "hraviratoms",
    "public",
    "data",
    "data.json"
  );

  console.log("Attempting to read data from:", dataPath);

  // Read existing data from the file
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data file:", err.message);
      return res.status(500).json({ error: "Error reading data file" });
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing data file:", parseError.message);
      return res.status(500).json({ error: "Error parsing data file" });
    }

    // Add new data to the existing data
    const newData = {
      firstName,
      lastName,
      guestCount,
    };
    jsonData.push(newData);

    // Write updated data back to the file
    fs.writeFile(
      dataPath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeError) => {
        if (writeError) {
          console.error("Error writing data file:", writeError.message);
          return res.status(500).json({ error: "Error writing data file" });
        }

        res.status(200).json({ message: "Data saved successfully" });
      }
    );
  });
});

// Fallback to React's index.html for unknown routes (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "hraviratoms", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
