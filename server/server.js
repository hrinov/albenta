const cors = require('cors')
const path = require("path")
const express = require("express");
const { router: signup } = require("./routes/signup.js")
const { router: login } = require("./routes/login.js")
const { router: refreshToken } = require("./routes/refreshToken.js")
const { router: me } = require("./routes/me.js")
const { router: deposit } = require("./routes/deposit.js")
const { router: withdraw } = require("./routes/withdraw.js")
const cookieParser = require("cookie-parser")
const app = express()
const PORT = 3000;

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use(cors());
apiRouter.use(cookieParser());
apiRouter.use(express.json());
apiRouter.use('/signup', signup);
apiRouter.use('/login', login);
apiRouter.use('/refreshToken', refreshToken);
apiRouter.use('/me', me);
apiRouter.use('/deposit', deposit);
apiRouter.use('/withdraw', withdraw);


app.listen(PORT, () => console.log(`server running on port ${PORT}`))