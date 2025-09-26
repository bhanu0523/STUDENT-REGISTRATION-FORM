const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');  // ✅ Add mongoose
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// File Upload Config
const upload = multer({ dest: 'uploads/' });

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://bhanu_0523:BHAnu0523@cluster0.iajt0w8.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define Schema
const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  dob: String,
  gender: String,
  phone: String,
  course: String,
  skills: [String],
  address: String,
  agree: Boolean,
  photo: String
});

//    Create Model
const Student = mongoose.model("Student", studentSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', upload.single('photo'), async (req, res) => {
  const formData = req.body;
  const uploadedFile = req.file;

  try {
    // ✅ Save data into MongoDB
    const newStudent = new Student({
      fullName: formData.fullName,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      phone: formData.phone,
      course: formData.course,
      skills: Array.isArray(formData.skills) ? formData.skills : [formData.skills],
      address: formData.address,
      agree: formData.agree === "on", // checkbox
      photo: uploadedFile ? uploadedFile.filename : null
    });

    await newStudent.save();

    res.send(`<h2>✅ Thank you, ${formData.fullName}, for registering! Your data is saved in MongoDB.</h2>`);
  } catch (err) {
    console.error("❌ Error saving student:", err);
    res.status(500).send("Error saving student data.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
