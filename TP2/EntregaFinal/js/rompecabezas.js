
var canvas = document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");

function Puzzle(){
  this.dificultad=1;
  this.piezas=[];
  this.reloj= new Reloj();

}
Puzzle.prototype.message = function(m){
  alert(m);
}
var pieza = new Circle(50,50,50,'red');
pieza.dibujar(ctx);
