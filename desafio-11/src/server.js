require('dotenv').config()
const express = require('express')
const routes = require('./routes/index.routes')
const http = require('http')
const { Server } = require('socket.io')

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))
app.use(routes)
const server  = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log("Nuevo usuario conectado");
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    socket.on('newMessage', (data) => {
        console.log(data);
        io.sockets.emit('newMessage', data)
    })
})

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

server.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))
