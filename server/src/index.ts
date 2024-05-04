/// <reference path="types/env.d.ts" />
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
import { useWS } from "./ws";
import { Server as WebSocketServer } from "ws";

const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const apiRouter = express.Router();
const cookieParser = require("cookie-parser");
const useragent = require("express-useragent");

const app = express();
app.use(useragent.express());
app.use("/api", apiRouter);

apiRouter.use(cors());
apiRouter.use(cookieParser());
apiRouter.use(express.json());

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

server.listen(8080, () => console.log(`Server running on port 8080`));
