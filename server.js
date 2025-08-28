const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', upload.single('photo'), (req, res) => {
  const formData = req.body;
  const uploadedFile = req.file;

  console.log("📥 Received Registration:");
  console.log("Full Name:", formData.fullName);
  console.log("Email:", formData.email);
  console.log("DOB:", formData.dob);
  console.log("Gender:", formData.gender);
  console.log("Phone:", formData.phone);
  console.log("Course:", formData.course);
  console.log("Skills:", Array.isArray(formData.skills) ? formData.skills.join(", ") : formData.skills);
  console.log("Address:", formData.address);
  console.log("Agreed to Terms:", formData.agree);
  console.log("Uploaded File:", uploadedFile?.originalname || "No file uploaded");

  res.send(`<h2>Thank you, ${formData.fullName}, for registering!</h2>`);
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
