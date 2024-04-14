import path from "path";
import { useWS } from "./ws";
import {
  me,
  login,
  signup,
  avatar,
  income,
  deposit,
  withdraw,
  activity,
  updateUser,
  refreshToken,
} from "./routes";
import { Server as WebSocketServer } from "ws";

const PORT = 3000;
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");

const app = express();

const apiRouter = express.Router();
app.use(useragent.express());
app.use("/api", apiRouter);

apiRouter.use(cors());
apiRouter.use(cookieParser());
apiRouter.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

apiRouter.use("/me", me);
apiRouter.use("/login", login);
apiRouter.use("/signup", signup);
apiRouter.use("/avatar", avatar);
apiRouter.use("/income", income);
apiRouter.use("/deposit", deposit);
apiRouter.use("/withdraw", withdraw);
apiRouter.use("/activity", activity);
apiRouter.use("/update-user", updateUser);
apiRouter.use("/refreshToken", refreshToken);

const server = http.createServer(app);
const wss: WebSocketServer = new WebSocket.Server({ server });

useWS(wss);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
