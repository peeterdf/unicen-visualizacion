
var canvas = document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");

function Puzzle(){
  this.dificultad=1;
  this.piezas=[];
  this.encastres=[];
  this.figuras=['Triangulo','Circle','Cuadrado'];
  this.andando=0;
  //this.reloj= new Reloj(ctx);


}
Puzzle.prototype.isfinish = function(){
  clearInterval(relojInterval);
  ctx.beginPath();
  ctx.fillStyle= 'rgba(92, 88, 103, 0.67)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="40px Fixedsys";
  var str1="Juego Terminado!"
  var str2="Tiempo: "+reloj1.getEstadoReloj();
  ctx.fillText(str1,150,210);
  ctx.fillText(str2,150,260);
  ctx.fill();
  ctx.closePath();
  puzzle1.andando=3;
  reloj1.resetReloj();

}

Puzzle.prototype.play=function(){
  puzzle1.setDificultad(level);
  // this.reloj.dibujaReloj();
  // setInterval(this.reloj1.mueveReloj,1000);
}//play

Puzzle.prototype.pause=function(){

}
Puzzle.prototype.setDificultad=function(l){
this.dificultad=l;
var x1=[150,300,450];
var x2=[620,770,920];
var y=[100,250,400];

for (var i = 0; i < l; i++) {
    var piezanueva = this.aleatorias();
    if(i<3){
      piezanueva[0].setY(y[0]);
      piezanueva[1].setY(y[0]);
      if (i==1){
        piezanueva[0].setX(x1[1]);
        piezanueva[1].setX(x2[1]);
      }else if (i==2){
        piezanueva[0].setX(x1[2]);
        piezanueva[1].setX(x2[2]);
      }else{
        piezanueva[0].setX(x1[0]);
        piezanueva[1].setX(x2[0]);
      }
    }else if(i<6){
      piezanueva[0].setY(y[1]);
      piezanueva[1].setY(y[1]);
      if (i==4){
        piezanueva[0].setX(x1[1]);
        piezanueva[1].setX(x2[1]);
      }else if (i==3){
        piezanueva[0].setX(x1[2]);
        piezanueva[1].setX(x2[2]);
      }else{
        piezanueva[0].setX(x1[0]);
        piezanueva[1].setX(x2[0]);
      }
    }else{
      piezanueva[0].setY(y[2]);
      piezanueva[1].setY(y[2]);
      if (i==8){
        piezanueva[0].setX(x1[1]);
        piezanueva[1].setX(x2[1]);
      }else if (i==6){
        piezanueva[0].setX(x1[2]);
        piezanueva[1].setX(x2[2]);
      }else{
        piezanueva[0].setX(x1[0]);
        piezanueva[1].setX(x2[0]);
      }
    }






    this.piezas[i]=piezanueva[0];
    this.encastres[i]=piezanueva[1];
}
this.dibujarTablero();
//opacar y mostrar button play
}

Puzzle.prototype.aleatorias=function(){
  var azar = this.figuras[Math.floor(Math.random()*this.figuras.length)];
  var figura=[];
  if (azar=='Circle'){
    figura[0] =  new Circle(100,150,50,'transparent','transparent');
    figura[1] =  new Circle(100,350,50,'#000000','#FF0000');
  }
  if (azar=='Cuadrado'){
  figura[0] =  new Cuadrado(100,150,100,'transparent','transparent');
  figura[1] =  new Cuadrado(100,350,100,'#000000','#FF0000');
  }

  if (azar=='Triangulo'){
  figura[0] =  new Triangulo(100,150,150,'transparent','transparent');
  figura[1] =  new Triangulo(100,350,150,'#000000','#FF0000');
  }
  return figura;
}

Puzzle.prototype.dibujarTablero=function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0; i<this.encastres.length;i++){
    this.encastres[i].dibujar(ctx);
  }
  for(let i=0; i<this.piezas.length;i++){
    this.piezas[i].dibujar(ctx);
  }
}

Puzzle.prototype.emboco=function(i,j){
    if(puzzle1.piezas[i].tipo==puzzle1.encastres[j].tipo && puzzle1.encastres[j].selected==0){
      if(-10 < puzzle1.piezas[i].posX- puzzle1.encastres[j].posX && puzzle1.piezas[i].posX- puzzle1.encastres[j].posX< 10 ){
        if(-10 < puzzle1.piezas[i].posY- puzzle1.encastres[j].posY  && puzzle1.piezas[i].posY- puzzle1.encastres[j].posY < 10 ){
          return true;
        }
    }
  }
  return false;
}
Puzzle.prototype.termino=function(){
  for(let i=0; i<this.piezas.length;i++){
    if( this.piezas[i].selected!=2 ){return false;}
  }
  puzzle1.isfinish();
  return true;
}

function getMousePos(canvas, evt) {
 var rect = canvas.getBoundingClientRect();
 return {
   x: evt.clientX - rect.left,
   y: evt.clientY - rect.top
 };
}

canvas.onmousedown = function(evt){
  if (puzzle1.andando==1) {
    var mousePos = getMousePos(canvas, evt);
    for (var i = 0; i < puzzle1.piezas.length; i++) {
      var isAdentro = puzzle1.piezas[i].estaAdentro(mousePos.x,mousePos.y);
      if(isAdentro && puzzle1.piezas[i].selected==0){
        puzzle1.piezas[i].select(puzzle1.piezas[i].posX - mousePos.x,puzzle1.piezas[i].posY - mousePos.y);

      }
    }
  }
  if(puzzle1.andando==0){
      var mousePos = getMousePos(canvas, evt);
      if ( mousePos.x-480<=150 && mousePos.x-480>0){
        if(mousePos.y-220<=50 &&  mousePos.y-220>0){
          ctx.clearRect(0,0,canvas.width,canvas.height);
          selectLevel();
          return false;
        }
      }
  }
  if(puzzle1.andando==2){
    var mousePos = getMousePos(canvas, evt);
    if ( mousePos.x-320<=150 && mousePos.x-320>0){
      if(mousePos.y-220<=50 &&  mousePos.y-220>0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        level=3;
        play();
      }
    }
    if ( mousePos.x-470<=150 && mousePos.x-470>0){
      if(mousePos.y-220<=50 &&  mousePos.y-220>0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        level=6;
        play();
      }
    }
    if ( mousePos.x-620<=150 && mousePos.x-620>0){
      if(mousePos.y-220<=50 &&  mousePos.y-220>0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        level=9;
        play();
      }
    }

  }
  if(puzzle1.andando==3){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    comienzo();
  }
}

function selectLevel(){
  puzzle1.andando=2;
  ctx.beginPath();
  ctx.fillStyle= 'rgba(92, 88, 103, 0.67)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='rgb(128, 136, 138)';
  ctx.fillRect(320,220,450,50);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(320,220,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(470,220,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(620,220,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="40px Fixedsys";
  ctx.fillText("Facil",350,258);
  ctx.fillText("Medio",500,258);
  ctx.fillText("Dificil",650,258);
  ctx.fill();
  ctx.closePath();

}
function comienzo(){
  puzzle1.andando=0;
  ctx.beginPath();
  ctx.fillStyle= 'rgba(92, 88, 103, 0.67)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='rgb(128, 136, 138)';
  ctx.fillRect(480,220,150,50);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(480,220,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="40px Fixedsys";
  var str1="Play!"
  ctx.fillText(str1,515,258);
  ctx.fill();
  ctx.closePath();

}
////////////////////////////////

var puzzle1 = new Puzzle();
var reloj1= new Reloj(ctx);
//on click ->
var level;
  var img = new Image();
  img.src='images/thor.png';
  var img2 = new Image();
  img2.src='images/america4.png';
  var image2 = ctx.createPattern(img2,"no-repeat");
  var img3 = new Image();
  img3.src='images/t4.png';
  var image;
  var relojInterval;
  comienzo();
  function play(){
    puzzle1.andando=1;
    reloj1.dibujaReloj();
    relojInterval = setInterval("reloj1.mueveReloj()",1000);
  puzzle1.play();
    img.onload=function(){
      image = ctx.createPattern(img,"no-repeat");
  }
}


////////////////////////////////




canvas.onmouseup = function(evt){
if (puzzle1.andando==1) {
  for (var i = 0; i < puzzle1.piezas.length; i++) {
    for(let j=0; j<puzzle1.encastres.length;j++){
      if (puzzle1.piezas[i].selected==1 && puzzle1.emboco(i,j)){
        puzzle1.encastres[j].selected=1;
        puzzle1.piezas[i].selected=2;
        puzzle1.piezas[i].posX=puzzle1.encastres[j].posX;
        puzzle1.piezas[i].posY=puzzle1.encastres[j].posY;
        puzzle1.dibujarTablero();
        if (!puzzle1.termino()){
          reloj1.dibujaReloj();
        }
      }
    }
  }
for (var i = 0; i < puzzle1.piezas.length; i++) {
  puzzle1.piezas[i].unselect();
}
}
}



 canvas.onmousemove = function(evt) {
if (puzzle1.andando==1) {
 var mousePos = getMousePos(canvas, evt);
 for (var i = 0; i < puzzle1.piezas.length; i++) {

     if(puzzle1.piezas[i].selected==1){

       puzzle1.piezas[i].setX(mousePos.x+puzzle1.piezas[i].selx);
       puzzle1.piezas[i].setY(mousePos.y+puzzle1.piezas[i].sely);

       ctx.clearRect(0,0,canvas.width,canvas.height);
       //dibujaReloj();
       reloj1.dibujaReloj();
       for(let i=0; i<puzzle1.encastres.length;i++){
         puzzle1.encastres[i].dibujar(ctx);
       }
       for(let i=0; i<puzzle1.piezas.length;i++){
         puzzle1.piezas[i].dibujar(ctx);
       }

       }
    }
  }
};
