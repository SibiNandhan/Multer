const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/single", upload.single("image"), (req, res) => {
  //console.log(req.file);
  res.send("single file upload successfull");
});

app.post("/multiple", upload.array("images", 5), (req, res) => {
  //console.log(req.files);
  res.send("Multiple file upload success");
});

app.listen(8000);
