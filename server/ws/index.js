const { findAll } = require("../db/queries/depositQueries");

const useWS = (wss) => {

    wss.on('connection', async (ws, req) => {

        const userId = req.url.split('?userId=')[1]
        let deposits = await findAll(userId)

        const getData = async () => {
            const currendDate = new Date()

            let activeDeposits = deposits.filter(deposit => {
                const createdAt = new Date(deposit.created_at);
                const endDate = new Date(createdAt.getTime() + deposit.hours * 60 * 60 * 1000);
                return endDate.getTime() > currendDate.getTime()
            })

            const getTimeToEnd = (end_date) => {
                const currentDate = new Date();
                const differenceMs = end_date.getTime() - currentDate.getTime();
                const totalHours = Math.floor(differenceMs / (1000 * 60 * 60));
                const hours = Math.floor(totalHours);
                let minutes = Math.floor((differenceMs / (1000 * 60)) % 60);
                minutes = (minutes < 10) ? `0${minutes}` : minutes;
                return `${hours}:${minutes}`;
            }

            activeDeposits = activeDeposits.map(deposit => {
                const endDate = new Date(new Date(deposit.created_at).getTime() + deposit.hours * 60 * 60 * 1000)
                return {
                    percent: deposit.percent,
                    timeToEnd: getTimeToEnd(endDate)
                }
            })
            console.log(activeDeposits)
            return activeDeposits
        }

        const sendData = async () => {
            const data = await getData()
            ws.send(JSON.stringify(data));
        }

        if (userId) {
            await sendData()
            const interval = setInterval(async () => {
                sendData()
            }, 30000);

            ws.on('close', () => {
                clearInterval(interval);
            });
        }
    });
}

module.exports = { useWS }