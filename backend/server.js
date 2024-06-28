//import express
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const connect_database = require("./config/db");
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth.routes.js")
const managerRoutes = require("./routes/manager.routes.js");
const userRoutes=require("./routes/user.routes.js");
// Configure environment variables
dotenv.config();

//database connect
connect_database();


// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)




  //Adding a middleware for setting headers in api requests for allowing its execution to from another server when using browsers
  app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});





//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v2/manager",managerRoutes);
app.use("/api/v1/user",userRoutes);


app.listen(PORT, () => {
    console.log(`Node Server Running on Port ${PORT}`);
  });