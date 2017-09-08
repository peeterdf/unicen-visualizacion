
var canvas = document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");

function Puzzle(){
  this.dificultad=1;
  this.piezas=[];
  this.encastres=[];
  this.figuras=['Circle','Circle','Cuadrado'];
  this.andando=0;
  //this.reloj= new Reloj(ctx);


}
Puzzle.prototype.isfinish = function(m){
  alert(m);
}

Puzzle.prototype.play=function(){
  this.andando=1;
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
  return figura;
}

Puzzle.prototype.dibujarTablero=function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0; i<this.piezas.length;i++){
    this.encastres[i].dibujar(ctx);
    this.piezas[i].dibujar(ctx);
  }
}

Puzzle.prototype.emboco=function(i){
  if(-10 < puzzle1.piezas[i].posX- puzzle1.encastres[i].posX && puzzle1.piezas[i].posX- puzzle1.encastres[i].posX< 10 ){
    if(-10 < puzzle1.piezas[i].posY- puzzle1.encastres[i].posY  && puzzle1.piezas[i].posY- puzzle1.encastres[i].posY < 10 ){
      return true;
    }
  }
  return false;
}
Puzzle.prototype.termino=function(){
  for(let i=0; i<this.piezas.length;i++){
    if( this.piezas[i].selected!=2 ) return false;
  }
  clearInterval(relojInterval);
  reloj1.dibujaReloj();
  alert("Juego Terminado\nTiempo: "+reloj1.getEstadoReloj());
}

var puzzle1 = new Puzzle();
var reloj1= new Reloj(ctx);
//on click ->

reloj1.dibujaReloj();
var relojInterval = setInterval("reloj1.mueveReloj()",1000);
var img = new Image();
img.src='images/marvel.jpg';

var img2 = new Image();
img2.src='images/america3.png';
var image2 = ctx.createPattern(img2,"no-repeat");
var image;
img.onload=function(){

  img.width= 150;
  img.height= 150;
  image = ctx.createPattern(img,"no-repeat");
puzzle1.setDificultad(5);
puzzle1.play();
}
function play(){
  
}

//
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
}

canvas.onmouseup = function(evt){
if (puzzle1.andando==1) {
  for (var i = 0; i < puzzle1.piezas.length; i++) {
      if (puzzle1.piezas[i].selected==1 && puzzle1.emboco(i)){
        debugger;
        puzzle1.piezas[i].selected=2;
        puzzle1.piezas[i].posX=puzzle1.encastres[i].posX;
        puzzle1.piezas[i].posY=puzzle1.encastres[i].posY;
        puzzle1.dibujarTablero();
        reloj1.dibujaReloj();
        puzzle1.termino();
      }else{
      puzzle1.piezas[i].unselect();
      }
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
