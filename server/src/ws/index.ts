import { findAll } from "../db/queries/depositQueries";
import { Server as WebSocketServer, WebSocket as WebSocketType } from "ws";

const useWS = (wss: WebSocketServer) => {
  wss.on("connection", async (ws: WebSocketType, req: WebSocketRequest) => {
    const userId = req.url?.split("?userId=")[1];
    if (!userId) return;
    let deposits: Deposit[] = await findAll(+userId);

    const getData = async () => {
      const currentDate = new Date();

      let activeDeposits = deposits.filter((deposit: Deposit) => {
        const createdAt = new Date(deposit.created_at!);
        const endDate = new Date(
          createdAt.getTime() + deposit.hours! * 60 * 60 * 1000
        );
        return endDate.getTime() > currentDate.getTime();
      });

      const getTimeToEnd = (end_date: Date): string => {
        const differenceMs = end_date.getTime() - Date.now();
        const totalHours = Math.floor(differenceMs / (1000 * 60 * 60));
        const hours = Math.floor(totalHours);
        let minutes: number | string = Math.floor(
          (differenceMs / (1000 * 60)) % 60
        );
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutes}`;
      };

      activeDeposits = activeDeposits.map((deposit: Deposit) => {
        const endDate = new Date(
          new Date(deposit.created_at!).getTime() +
            deposit.hours! * 60 * 60 * 1000
        );
        return {
          percent: deposit.percent,
          timeToEnd: getTimeToEnd(endDate),
        };
      });

      return activeDeposits;
    };

    const sendData = async () => {
      const data = await getData();
      ws.send(JSON.stringify(data));
    };

    if (userId) {
      await sendData();
      const interval = setInterval(async () => {
        await sendData();
      }, 30000);

      ws.on("close", () => {
        clearInterval(interval);
      });
    }
  });
};

export { useWS };
