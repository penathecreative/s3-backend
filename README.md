# 📁 AWS S3 File Uploader API

A lightweight Express.js backend for uploading and listing files in an AWS S3 bucket. Built with Node.js, `express-fileupload`, and the AWS SDK v3.

---

## 🚀 Features

- Upload files directly to an AWS S3 bucket
- List uploaded files from a specific S3 folder
- CORS-enabled API for frontend integration
- Securely handles environment variables
- Built-in support for `multipart/form-data`

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [AWS SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/s3-file-uploader.git
cd s3-file-uploader
```


### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file


Add your AWS and server credentials:

```bash
PORT=3000
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_BUCKET_NAME=your-bucket-name
```


### 4. Start the server

```bash
node index.js
```

Server will be running on: http://localhost:3000

## 📂 API Endpoints

- GET /api/files
- POST /api/upload**

## 🛡️ CORS & Security

- CORS is enabled for all origins.
- Preflight (OPTIONS) requests are handled for smooth browser integration.
- AWS credentials are stored securely via .env and never hardcoded.



