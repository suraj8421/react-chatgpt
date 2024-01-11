const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middelwares/errorMiddelware");

//dot env config
dotenv.config()
//mongo configuration
connectDB()


//res object
const app = express();
//middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler)

const PORT =process.env.PORT || 8080;
//api routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

//listen server
app.listen(PORT, () => {
  console.log(`server running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
});
