const cors = require('cors')
const path = require("path")
const express = require("express");
const { router: userRouter } = require("./routes/userRoute.js")
const cookieParser = require("cookie-parser")
const app = express()
const PORT = 3000;

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use("/", express.static(path.join(__dirname)))
app.use("/", userRouter);



app.listen(PORT, () => console.log(`server running on port ${PORT}`))