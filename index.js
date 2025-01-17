const express = require("express");
const fileUpload = require("express-fileupload");
const {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Custom CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight requests
  }

  next();
});

app.use(fileUpload());

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// List all objects
app.get("/api/files", async (req, res) => {
  try {
    const folder = req.query.folder || "";
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: folder,
    });
    const response = await s3Client.send(command);
    res.json(response.Contents || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload object
app.post("/api/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;
    console.log("Received file:", file); // For debugging

    // Adding the folder prefix to the file key
    const fileKey = `original-images/${file.name}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file.data,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);
    res.json({ message: "File uploaded successfully", fileKey });
  } catch (error) {
    console.error("Error uploading file:", error); // For debugging
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
