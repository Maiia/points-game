import express from "express";
import dotenv from "dotenv";
import { initRedis } from "./redisClient";
import diceRollRoutes from "./routes/dice-roll";
import liveGameStateRoutes from "./routes/live-game-state";
import http from "http";
import { setupWebsocketServer } from "./websocket/setupWebsocketServer";
import { subscribeToRedis } from "./websocket/subscribeToRedis";

const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    // TODO add logic with credentials
    credentials: false,
  }),
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/dice-roll", diceRollRoutes);
app.use("/live-game-state", liveGameStateRoutes);

const server = http.createServer(app);

initRedis().then(async () => {
  setupWebsocketServer(server);
  await subscribeToRedis();
  server.listen(PORT, () => {
    console.log(`🚀 Game service running on port ${PORT}`);
  });
});
