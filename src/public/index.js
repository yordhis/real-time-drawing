const socket = io()
const c = console.log

let click = false
let moving_mouse = false
let x_position = 0
let y_position = 0
let previous_position = null
let color = 'black'

// Obtenemos el canvas id "canvas"
const canvas = document.getElementById('canvas')
// Espesificamos el contexto
const context = canvas.getContext('2d')

const users = document.getElementById('users')

// Almacenamos el ancho del navegador
const width = window.innerWidth
const height = window.innerHeight

// Asignamos ancho y alto a el CANVAS - div
canvas.width = width
canvas.height = height

// Eventos del mouse
// Hace click
canvas.addEventListener('mousedown', ()=>{
    // c('Esta dando click')
    click = true
})
// deja de Hacer click
canvas.addEventListener('mouseup', ()=>{
    // c('No esta dando click')
    click = false
})
// Mueve el mouse
canvas.addEventListener('mousemove', (e)=>{
    // c(e)
    x_position = e.clientX
    y_position = e.clientY
    moving_mouse = true
})

function change_color(c){
    color = c
    context.strokeStyle = color
    context.stroke()
}
function delete_all(){
    socket.emit('delete')
}

function create_drawing(){
    if(click && moving_mouse && previous_position != null){
        let drawing = {
            x_position: x_position, 
            y_position: y_position,
            color: color,
            previous_position: previous_position
        }
        // show_drawing(drawing)
        socket.emit('drawing', drawing)
    }
    previous_position = {x_position: x_position, y_position: y_position}
    setTimeout(create_drawing, 25 )
}

socket.on('users', (number)=>{
    users.innerHTML = `El número de usuarios conectados son: ${number}`
})

// function show_drawing(drawing){

socket.on('show_drawing', (drawing)=>{
    if (drawing != null) {
        context.beginPath()
        // Grosor de la linea
        context.lineWidth = 3
        // Color de la linea
        context.strokeStyle = drawing.color
        // en que posicion va afinalizar la linea
        context.moveTo(drawing.x_position, drawing.y_position)
        // Desde donde se va aempezar a dibujar la linea
        context.lineTo(drawing.previous_position.x_position, drawing.previous_position.y_position)
        context.stroke()
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
})

create_drawing()