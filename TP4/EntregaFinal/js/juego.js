

function Juego(){
  this.dificultad=1;
  this.piezas=[];
  this.encastres=[];
  this.andando=0;
  //this.reloj= new Reloj(ctx);


}
Puzzle.prototype.isfinish = function(){
  

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
this.empezar();
//opacar y mostrar button play
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


Puzzle.prototype.termino=function(){
  for(let i=0; i<this.piezas.length;i++){
    if( this.piezas[i].selected!=2 ){return false;}
  }
  puzzle1.isfinish();
  return true;
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



