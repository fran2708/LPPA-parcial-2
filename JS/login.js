function obtenerElementos(){
    email = document.getElementById("txt-email")
    pass = document.getElementById("txt-pass")
    submit = document.getElementById("btn-submit")
    lblError = document.getElementById("error-login")
    lblErrorMail = document.getElementById("error-mail")
    lblErrorPass = document.getElementById("error-pass")
}

window.onload = () => {
    comprobarSesion()
    obtenerElementos()
    submit.onclick = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            lblError.classList.toggle("hidden",true)
            requestAPI()
        }
    }
}

function comprobarSesion(){
    if (localStorage.isLogged == "true") {
        location = "./dashboard.html"
    }
}

function validarCampos(){
    var validacion = true
    if (pass.value.length < 6) {
        lblErrorPass.classList.toggle("hidden",false)
        validacion = false
    }
    if (!email.value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        lblErrorMail.classList.toggle("hidden",false)
        validacion = false
    }
    return validacion
}

function requestAPI(){
    fetch("https://basic-server-one.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
        email: email.value,
        password: pass.value
        })
    })
        .then(response => response.json())
        .then(data => login(data))
        .catch(error => console.log(error))
}

function login(data){
    if (data.error == false) {
        localStorage.isLogged = "true"
        location = "./dashboard.html"
    }else {
        lblError.classList.toggle("hidden", false)
    }
}