const express = require("express");
const app = express();
// Import Cookieparser - Make a Generate Token
const cookieParser = require("cookie-parser");
// Import Dotenv - Store Hidden Data
const dotenv = require("dotenv");
dotenv.config();
// Import Cors - Connect Client
const cors = require("cors");
// Authentication Router
const authRoute = require("./routes/AuthRoute");
// User Router
const userRoute = require('./routes/UserRoute');
// Interview Router
const interviewRoute = require('./routes/InterviewRoute');
// Generate-Question Router
const questionRoute = require('./routes/QuestionRoute');
// Connect Database
const ConnectDatabase = require("./config/DataBase");

const port = process.env.PORT;

app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/interview", interviewRoute);
app.use("/api/question", questionRoute);

app.listen(port, () => {
    ConnectDatabase();
    console.log(`Your App Running In Port Number ${port}...`);
}) 