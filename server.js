// const express = require("express");
// const sqlite3 = require("sqlite3").verbose();
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static("public")); // serve your frontend files
// app.use("/uploads", express.static("uploads")); // serve uploaded files

// // Setup DB
// const db = new sqlite3.Database("./database.db");

// db.run(`CREATE TABLE IF NOT EXISTS projects (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     studentName TEXT,
//     mentorName TEXT,
//     projectName TEXT,
//     photo TEXT,
//     report TEXT,
//     video TEXT
// )`);

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Register a new project
// app.post("/projects", upload.fields([
//   { name: "photo", maxCount: 1 },
//   { name: "report", maxCount: 1 },
//   { name: "video", maxCount: 1 }
// ]), (req, res) => {
//   const { studentName, mentorName, projectName } = req.body;
//   const photo = req.files["photo"] ? req.files["photo"][0].filename : null;
//   const report = req.files["report"] ? req.files["report"][0].filename : null;
//   const video = req.files["video"] ? req.files["video"][0].filename : null;

//   db.run(`INSERT INTO projects (studentName, mentorName, projectName, photo, report, video)
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [studentName, mentorName, projectName, photo, report, video],
//           function (err) {
//             if (err) return res.status(500).send(err.message);
//             res.send({ success: true, id: this.lastID });
//           });
// });

// // Fetch all projects
// app.get("/projects", (req, res) => {
//   db.all("SELECT * FROM projects", [], (err, rows) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(rows);
//   });
// });

// // Project details
// app.get("/project/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   db.get("SELECT * FROM projects WHERE id = ?", [id], (err, project) => {
//     if (err) return res.status(500).send(err.message);
//     if (!project) return res.send("Project not found");

//     res.send(`
//       <div style="max-width:600px; margin:auto; padding:20px; border:1px solid #ccc; background:#fff;">
//         ${project.photo ? `<img src="/uploads/${project.photo}" style="width:100%; height:auto; margin-bottom:10px;">` : ""}
//         <h1>${project.projectName}</h1>
//         <p><b>Student Name:</b> ${project.studentName}</p>
//         <p><b>Mentor Name:</b> ${project.mentorName}</p>

//         <h3>Files</h3>
//         <ul>
//           ${project.report ? `<li><a href="/uploads/${project.report}" target="_blank">Report</a></li>` : ""}
//           ${project.video ? `<li><a href="/uploads/${project.video}" target="_blank">Video</a></li>` : ""}
//         </ul>

//         <a href="/">← Back to Projects</a>
//       </div>
//     `);
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
