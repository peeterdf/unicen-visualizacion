
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
  //reloj1.dibujaReloj();
  ctx.beginPath();
  ctx.fillStyle= 'rgba(92, 88, 103, 0.67)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
  //ctx.beginPath();
  //ctx.fillStyle='white';
  //ctx.fillRect(300,180,300,100);
  //ctx.fill();
  //ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="40px Fixedsys";
  var str1="Juego Terminado!"
  var str2="Tiempo: "+reloj1.getEstadoReloj();
  ctx.fillText(str1,330,210);
  ctx.fillText(str2,330,260);
  ctx.fill();
  ctx.closePath();
  puzzle1.andando=3;

}

Puzzle.prototype.play=function(){
  this.andando=1;
  var level=document.getElementById("level").value;
  puzzle1.setDificultad(level);
  // this.reloj.dibujaReloj();
  // setInterval(this.reloj1.mueveReloj,1000);
}//play

Puzzle.prototype.pause=function(){

}
Puzzle.prototype.setDificultad=function(l){
this.dificultad=l;

for (var i = 0; i < l; i++) {
    var piezanueva = this.aleatorias();
    piezanueva[0].setX(100+120*i);
    piezanueva[1].setX(100+120*i);
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
      if ( mousePos.x-380<=150 && mousePos.x-380>0){
        if(mousePos.y-220<=50 &&  mousePos.y-220>0){
          ctx.clearRect(0,0,canvas.width,canvas.height);
          selectLevel();
          play();//hacer
        }
      }
  }
  if(puzzle1.andando==2){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    play();
  }
  if(puzzle1.andando==3){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    puzzle1.andando=0;
    comienzo();
  }
}

function selectLevel(){
  ctx.beginPath();
  ctx.fillStyle= 'rgba(92, 88, 103, 0.67)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='white';
  ctx.fillRect(220,320,450,50);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(220,320,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(370,320,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(520,320,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="40px Fixedsys";
  ctx.fillText("Facil",250,358);
  ctx.fillText("Medio",400,358);
  ctx.fillText("Dificil",550,358);
  ctx.fill();
  ctx.closePath();

}
function comienzo(){
  ctx.beginPath();
  ctx.fillStyle= 'rgba(92, 88, 103, 0.67)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='white';
  ctx.fillRect(380,220,150,50);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth =5;
  ctx.strokeStyle = 'rgb(19, 21, 79)' ;
  ctx.strokeRect(380,220,150,50);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.font="40px Fixedsys";
  var str1="Play!"
  ctx.fillText(str1,415,258);
  ctx.fill();
  ctx.closePath();

}
////////////////////////////////

var puzzle1 = new Puzzle();
var reloj1= new Reloj(ctx);
//on click ->

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
    reloj1.dibujaReloj();
    relojInterval = setInterval("reloj1.mueveReloj()",1000);
  puzzle1.play();

    img.onload=function(){
    //  img.width= 150;
    //  img.height= 150;
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
