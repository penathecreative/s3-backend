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
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
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
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);
    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
