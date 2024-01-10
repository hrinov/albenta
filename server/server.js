const cors = require('cors')
const path = require("path")
const express = require("express");
const useragent = require('express-useragent');
const { useWS } = require('./ws');
const { router: signup } = require("./routes/signup.js")
const { router: login } = require("./routes/login.js")
const { router: refreshToken } = require("./routes/refreshToken.js")
const { router: me } = require("./routes/me.js")
const { router: deposit } = require("./routes/deposit.js")
const { router: withdraw } = require("./routes/withdraw.js")
const { router: activity } = require("./routes/activity.js")
const { router: updateUser } = require("./routes/updateUser.js")
const { router: avatar } = require("./routes/avatar.js")

const http = require('http');
const WebSocket = require('ws');

const cookieParser = require("cookie-parser")
const app = express()
const PORT = 3000;

const apiRouter = express.Router();
app.use(useragent.express());
app.use('/api', apiRouter);

apiRouter.use(cors());
apiRouter.use(cookieParser());
apiRouter.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

apiRouter.use('/signup', signup);
apiRouter.use('/login', login);
apiRouter.use('/refreshToken', refreshToken);
apiRouter.use('/me', me);
apiRouter.use('/deposit', deposit);
apiRouter.use('/withdraw', withdraw);
apiRouter.use('/activity', activity);
apiRouter.use('/update-user', updateUser);
apiRouter.use('/avatar', avatar);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

useWS(wss)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));