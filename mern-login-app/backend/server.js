const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Create an Express application
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/rash", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema and Model for Students
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("Users", UserSchema);

// User Schema and Model for Teachers
const UserSchemaT = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserT = mongoose.model("Teachers", UserSchemaT);

// Register Route for Users
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route for Users
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "VDHVFDKCFM", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register Route for Teachers
app.post("/api/teacher/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await UserT.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserT = new UserT({ email, password: hashedPassword });
    await newUserT.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Student Route
app.put("/students/:id", async (req, res) => {
  console.log(req.body);

  try {
    const { name, class: className, parent_email, rollno } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, class: className, parent_email, rollno },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send(error);
  }
});

// Login Route for Teachers
app.post("/api/teacher/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userT = await UserT.findOne({ email });

    if (!userT) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userT.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userT._id }, "VDHVFDKCFM", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  parent_name: { type: String, required: true },
  parent_email: { type: String, required: true },
  attendance: { type: String, default: "Absent" },
  attendance_info: { type: String, default: "" },
  overall_ranking: { type: String, default: "" },
  mathematics_marks: { type: String, default: "" },
  physics_marks: { type: String, default: "" },
  chemistry_marks: { type: String, default: "" },
  social_marks: { type: String, default: "" },
  english_marks: { type: String, default: "" },
});

const Student = mongoose.model("students", studentSchema);

// Add Student Route
app.post("/students", async (req, res) => {
  try {
    const {
      rollno,
      name,
      class: className,
      parent_name,
      parent_email,
      attendance,
      attendance_info,
      overall_ranking,
      mathematics_marks,
      physics_marks,
      chemistry_marks,
      social_marks,
      english_marks,
    } = req.body;

    const studentExists = await Student.findOne({ rollno });
    if (studentExists) {
      return res
        .status(400)
        .json({ message: "Student with this roll number already exists." });
    }

    const newStudent = new Student({
      rollno,
      name,
      class: className,
      parent_name,
      parent_email,
      attendance,
      attendance_info,
      overall_ranking,
      mathematics_marks,
      physics_marks,
      chemistry_marks,
      social_marks,
      english_marks,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all student names (and rollno)
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, "name rollno");
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }
    res.json(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get student details by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get students by parent's email
app.get("/api/students/parent/:parentEmail", async (req, res) => {
  try {
    const email = req.params.parentEmail;

    // Find students associated with the parent email
    const students = await Student.find({ parent_email: email });

    // Check if students exist
    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this parent email" });
    }

    // Return the students as JSON
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      message: "Server error fetching students",
      error: error.message,
    });
  }
});

// Announcement Schema
const AnnouncementSchema = new mongoose.Schema(
  {
    info: { type: String, required: true },
  },
  { collection: "Announcements" }
);

const Announcement = mongoose.model("Announcements", AnnouncementSchema);

app.post("/announcement", async (req, res) => {
  try {
    const { info } = req.body;
    const newAnnouncement = new Announcement({ info });
    await newAnnouncement.save();
    res.status(200).json(newAnnouncement);
  } catch (error) {
    console.error("Detailed error adding announcement:", error); // Log error details
    res.status(500).json({ message: "Error adding announcement" });
  }
});

app.get("/api/announcements", async (req, res) => {
  try {
    const announcements = await Announcement.find(); // Fetch all announcements
    res.status(200).json(announcements); // Send announcements as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements" });
  }
});

app.delete("/announcements/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Student Route
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student and all related data deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
