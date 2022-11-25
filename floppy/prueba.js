var context =  document.getElementById("lienzo")
var ctx = context.getContext("2d");
var width = 300;
var height = 530;
var canvas_width = 300;
var canvas_height = 530;
context.width = width;
context.height = height;

var personaje = {
    x:50, y: 150, weight:50, height:50
}

var pipelines = new Array();
pipelines[0] = {
    x: context.width, y:0 
}


//AUDIOS
var punto = new Audio()
punto.src = "audios/punto.mp3"

var gameOver = new Audio()
gameOver.src = "audios/gameOver.mp3"

//IMAGENES
var bird = new Image()
bird.src = "imagenes/bird.png"

var background = new Image()
background.src = "imagenes/background.png"

var floor= new Image()
floor.src = "imagenes/suelo.png"

var northPip = new Image()
northPip.src = "imagenes/tuberiaNorte.png"

var southPip = new Image()
southPip.src = "imagenes/tuberiaSur.png"


//CONTROL
function salto(){
    personaje.y -= 30;
}

resize() //Hay que llemar a la funcion para que el listener lo escuche
function resize(){
    canvas_height = window.innerHeight; //hace referencia a toda la altura de la ventana
    canvas_width = window.innerWidth; //hace referencia a toda la anchura de la ventana

    context.width = width;
    context.height = height;

    context.style.height = ""+canvas_height+"px";
    //context.style.width = ""+canvas_width+"px"; //Estamos
}


var score = 0;
var FPS = 60;
var gravedad = 1.5;

//Bucle
setInterval(loop, 1000/FPS)
function loop() {
    ctx.clearRect(0,0,300,530)

    //Background
    ctx.drawImage(background,0,0)
    ctx.drawImage(floor,0,context.height - floor.height)
    
    //Bird
    ctx.drawImage(bird, personaje.x, personaje.y)

    //Pipeline
    for(var cont = 0;cont < pipelines.length; cont++){
        var desfase = northPip.height + 80;
        ctx.drawImage(northPip,pipelines[cont].x,pipelines[cont].y)
        ctx.drawImage(southPip,pipelines[cont].x,pipelines[cont].y + desfase)
        pipelines[cont].x--

        if((pipelines[cont].y + northPip.height) < 80){ //
            pipelines[cont].y = 0 //Posicion de la primera tuberia
        }

        if(pipelines[cont].x == 150){ //Cada vez que una tuberia llega al medio de la pantalla
            pipelines.push({
                x:context.width, y: Math.floor(Math.random()*northPip.height) - northPip.height
            })
        }

        //Colisiones
        if((personaje.x + bird.width >= pipelines[cont].x) && 
            (personaje.x <= pipelines[cont].x + northPip.width) && 
            (personaje.y <= pipelines[cont].y + northPip.height ||
                personaje.y + bird.height >= pipelines[cont].y + desfase ||
                personaje.y + bird.height >= context.height - floor.height)){
            
                gameOver.play()
                location.reload()
                
        }

        //Score
        if(pipelines[cont].x == personaje.x){
            score++;
            punto.play()
        }
    }
    
    //Condition
    personaje.y += gravedad;

    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.font = "25px Arial"
    ctx.fillText("Score: "+score,10,context.height-40)
}

window.addEventListener("resize", resize)
window.addEventListener("keydown", salto)
