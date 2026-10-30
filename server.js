const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Отдаем твой HTML файл при заходе на сайт
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Логика чата
io.on('connection', (socket) => {
  console.log('Юзер подключился:', socket.id);

  // Когда кто-то отправляет сообщение
  socket.on('chat message', (msg) => {
    // Рассылаем это сообщение ВСЕМ, кто сейчас в чате
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Юзер отключился');
  });
});

// Render сам подставит нужный порт, не трогай эту часть
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});