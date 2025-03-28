const WebSocket = require('ws');

// Verifica si el servidor WebSocket está iniciando
console.log("🚀 Iniciando servidor WebSocket...");

// Inicia el servidor WebSocket en el puerto 9090
const wss = new WebSocket.Server({ port: 9090, host: '10.0.154.181' });

console.log("✅ Servidor WebSocket corriendo en ws://10.0.154.181:9090");

let count = 0;

wss.on('connection', function connection(ws) {
    console.log("🔗 Nueva conexión establecida con un cliente.");

    // Envía el contador actual al cliente conectado
    ws.send(JSON.stringify({ type: 'count', data: count }));

    ws.on('message', function incoming(message) {
        console.log("📩 Mensaje recibido:", message);
        const data = JSON.parse(message);

        if (data.type === 'increment') {
            count += data.value;
            console.log("🔼 Contador incrementado a:", count);

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'count', data: count }));
                }
            });
        } else if (data.type === 'reset') {
            count = 0;
            console.log("🔄 Contador reiniciado a:", count);

            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'count', data: count }));
                }
            });
        }
    });

    ws.on('close', function () {
        console.log("🔴 Cliente desconectado.");
    });
});
