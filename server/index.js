const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EmployeeModel = require('./models/Employee');
const CreateEmployeeModel = require('./models/create');

const app = express();
app.use(express.json());
app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// Endpoint to get all employees
app.get('/employees', async (req, res) => {
  try {
      const employees = await CreateEmployeeModel.find();
      res.json(employees);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Create Employee Route
app.post('/create-employee', upload.single('image'), async (req, res) => {
  const { name, email, mobileNumber, designation, gender, course } = req.body;
  
  let coursesArray = [];
  try {
      coursesArray = JSON.parse(course || '[]');
  } catch (err) {
      return res.status(400).json({ message: 'Invalid course format' });
  }

  try {
      const newEmployee = new CreateEmployeeModel({
          name,
          email,
          mobileNumber,
          designation,
          gender,
          course: coursesArray,
          image: req.file ? req.file.filename : null
      });

      await newEmployee.save();
      res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
      console.error('Error saving employee:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log("MongoDB connected successfully");
      app.listen(3001, () => {
          console.log("Server running on http://localhost:3001");
      });
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Register Route
//commenting it as it is not needed for the requirement
/*app.post('/register', async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});*/

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login with email: ${email} and password: ${password}`);

    try {
        const user = await EmployeeModel.findOne({ email });
        if (user) {
            console.log("User found:", user);
            // Assuming password is not hashed
            if (user.password === password) {
                res.json({ message: "Login successful", user });
            } else {
                res.status(401).json({ message: "Password incorrect" });
            }
        } else {
            res.status(404).json({ message: "No user found" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const updatedEmployee = await CreateEmployeeModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(updatedEmployee);
  } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
app.get('/employees/:id', async (req, res) => {
  const { id } = req.params; // Get employee ID from the URL parameters
  try {
      const employee = await CreateEmployeeModel.findById(id);
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
  } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

