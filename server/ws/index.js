const useWS = (wss) => {
    wss.on('connection', (ws, req) => {

        const userId = req.url.split('?userId=')[1]

        if (userId) {
            const interval = setInterval(() => {
                ws.send('Hello');
            }, 30000);

            ws.on('close', () => {
                clearInterval(interval);
            });
        }
    });
}

module.exports = { useWS }