//http://www.javascripture.com/
var canvas = document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");
var width=900;
var height=600;
var imageData =ctx.createImageData(width,height);



var circulos=[];
var semillas=[];
var circulo1 = new Circle(100,250,80,'#000000');
//var circulo2 = new Circle(200,250,80,'#672544');
//var circulo3 = new Circle(300,250,80,'#ac67ca');
//var circulo4 = new Circle(400,250,80,'#97fdb2');
circulos.push(circulo1);
//circulos.push(circulo2);
//circulos.push(circulo3);
//circulos.push(circulo4);

for(let i=0; i<circulos.length;i++){
 circulos[i].dibujar(ctx);
}



function getMousePos(canvas, evt) {
 var rect = canvas.getBoundingClientRect();
 return {
   x: evt.clientX - rect.left,
   y: evt.clientY - rect.top
 };
}

canvas.onmousedown = function(evt){

 var mousePos = getMousePos(canvas, evt);

   var isAdentro = circulos[0].estaAdentro(mousePos.x,mousePos.y);
   if(isAdentro){
     circulos[0].select(circulos[0].posX - mousePos.x,circulos[0].posY - mousePos.y);
   }

}

canvas.onmouseup = function(evt){
     circulos[0].unselect();
}


 canvas.onmousemove = function(evt) {

 var mousePos = getMousePos(canvas, evt);

 if(circulos[0].selected==1){
   circulos[0].setX(mousePos.x+circulos[0].selx);
   circulos[0].setY(mousePos.y+circulos[0].sely);
   for(let i=0; i<semillas.length;i++){
     if(semillas[i].superpone(circulos[0]) && semillas[i].comido==0){
       circulos[0].comer(semillas[i]);
     }
   }

 }
   ctx.clearRect(0,0,canvas.width,canvas.height);
   circulos[0].dibujar(ctx);
   for(let i=0; i<semillas.length;i++){
     semillas[i].dibujar(ctx);
   }
   reloj1.dibujaReloj();
};

function newSemillas(){
   var x = Math.floor(Math.random()* canvas.width);
   var y = Math.floor(Math.random()* canvas.height);
   var radio = 10;
   var semilla = new Circle(x,y,radio,randomColor());
   semillas.push(semilla);
   semilla.dibujar(ctx);
}

function randomColor(){
 //var color = '#'+Math.floor(Math.random()*16777215).toString(16);
 var color = '#'; // hexadecimal starting symbol
 var letters = ['000000','FF0000','00FF00','0000FF'];//,'FFFF00','00FFFF','FF00FF','C0C0C0']; //Set your colors here
 color += letters[Math.floor(Math.random() * letters.length)];
 return color;
}


function mueveReloj(){
  seg++;
  if(seg==60){
    seg=0;
    min++;
    if(min==60){
      min=0;
      hr++
    }
  }
  dibujaReloj();
}
function dibujaReloj(){
  ctx.beginPath();
  ctx.fillStyle='white';
  ctx.fillRect(0,0,160,30);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="20px Fixedsys";
  var strmin=min;
  var strseg=seg;
  var strhr=hr;
  if(min<10){strmin='0'+min};
  if(seg<10){strseg='0'+seg};
  if(hr<10){strhr='0'+hr};
  ctx.fillText('Tiempo: '+strhr+':'+strmin+':'+strseg,10,20);
  ctx.fill();
  ctx.closePath();
}

setInterval(newSemillas,3000);
var hr = min =seg=00;
mueveReloj();
setInterval(mueveReloj,1000);
