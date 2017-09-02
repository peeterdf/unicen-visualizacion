
var canvas = document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");

function Puzzle(){
  this.dificultad=1;
  this.piezas=[];
  this.encastres=[];
//  this.reloj= new Reloj();

}
Puzzle.prototype.isfinish = function(m){
  alert(m);
}

Puzzle.prototype.play=function(){
//empezar reloj
//escuchar movimientos

}
Puzzle.prototype.pause=function(){

}
Puzzle.prototype.setDificultad=function(l){
this.dificultad=l;
//cargar piezas
//cargar encastres
for (var i = 0; i < l; i++) {
  var piezanueva = new Circle(100+120*i,150,50,'red');
  this.piezas[i]=piezanueva;
  this.encastres[i]= new Circle(100+120*i,350,50,'black');
}
this.dibujarTablero();
//opacar y mostrar button play
}

Puzzle.prototype.dibujarTablero=function(){
  for(let i=0; i<this.piezas.length;i++){
    this.piezas[i].dibujar(ctx);
    this.encastres[i].dibujar(ctx);
  }
}

var puzzle = new Puzzle();
puzzle.setDificultad(3);
