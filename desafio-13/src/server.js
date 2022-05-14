require('dotenv').config()
const express = require('express')
const routes = require('./routes/index.routes')
const http = require('http')
const { Server } = require('socket.io')
const session = require('express-session')
const mongoStore = require('connect-mongo')
import AuthRouter from "./routers/auth.router.js";
import passport from "./utils/passport.util.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))
app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI_SESSION,
            options: {
            userNewUrlParser: true,
            useUnifiedTopology: true,
            },
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            maxAge: 60000 * 10
        }
    }),
);
app.use(routes)
app.use(passport.initialize());
app.use(passport.session());
app.use("/", AuthRouter);
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

app.post('/login', (req, res) => {
    req.session.login = true;
    req.session.user = req.body.nombre
    console.log("Sesión iniciada!");
    res.json({success: 'Sesión iniciada!'})
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            console.log('Sesión cerrada');
            res.json({success: "Salio de la aplicación"});
        } else {
            res.json(err);
        }
    });
})

app.get('/get_session_state', (req, res) => {
    if (req.session.login) {
        console.log("Sesión abierta");
        res.json({login: true, user: req.session.user})
    } else {
        console.log("Sesión cerrada");
        res.json({login: false})
    }
})

server.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))
