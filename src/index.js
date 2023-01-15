const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const cors = require("cors")
const app = express()
const c = console.log


const server = http.createServer(app)
const io = socketio(server)
require('./socket')(io)

app.set('title', "Paint Icss")
// El process.env.Port toma un puerto por defecto si lo hay disponible y sino se asigna el 5000
app.set('port', process.env.PORT || 5000)
app.use(express.static(path.join(__dirname, 'public')))
// ESTE ES UN MIDDLEWARE QUE NOS PERMITE HACER PETICIONES Y NO NOS BLOQUEA EL SERVIDOR
app.use(cors())

server.listen(app.get('port'), ()=>{
    c(`${app.get('title')} link: http://localhost:${app.get('port')}`)
})

