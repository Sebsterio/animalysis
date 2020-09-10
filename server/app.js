const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");

const userRoutes = require("./routes/api/user");
const clinicRoutes = require("./routes/api/clinic");
const petRoutes = require("./routes/api/pet");
const reportRoutes = require("./routes/api/report");
const surveyRoutes = require("./routes/api/survey");

dotenv.config();

const app = express();

// -------------- Middleware -------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
	app.use(compression());
}

// ---------------- Mongo ----------------

const db = process.env.MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

// --------------- Routing ---------------

app.use("/api/user", userRoutes);
app.use("/api/clinic", clinicRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/survey", surveyRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "..", "client", "build", "index.html")
		);
	});
}

// ---------------- Listen ----------------

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`Server started on PORT ${port}`);
});

// -----------------

module.exports = app;
