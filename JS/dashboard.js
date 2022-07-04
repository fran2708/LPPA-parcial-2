function obtenerElementos(){
    botonReset = document.getElementById("boton")
}

window.onload = function(){
    obtenerElementos()
    botonReset.onclick = () => {
        localStorage.isLogged = "false"
    }
}