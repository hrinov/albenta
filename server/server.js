const cors = require('cors')
const path = require("path")
const express = require("express");
const { router: signup } = require("./routes/signup.js")
const { router: login } = require("./routes/login.js")
const { router: refreshToken } = require("./routes/refreshToken.js")
const cookieParser = require("cookie-parser")
const app = express()
const PORT = 3000;

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use("/", express.static(path.join(__dirname)))
app.use("/api", signup);
app.use("/api", login);
app.use("/api", refreshToken);



app.listen(PORT, () => console.log(`server running on port ${PORT}`))