function Cuadrado(){
  this.posX = 4;
  this.posy = 4;
  this.lado = 10;
  this.color = '#141444';
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.pieza=0;
}

function Cuadrado(paramPosX, paramPosY, paramLado,paramColor,paramPieza){
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.lado = paramLado;
  this.color = paramColor;
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.pieza=paramPieza;
}

Cuadrado.prototype.setX = function(x) {
  this.posX = x;
}

Cuadrado.prototype.setY = function(y) {
  this.posY = y;
}

Cuadrado.prototype.getX = function() {
  return this.posX ;
}

Cuadrado.prototype.getY = function() {
  return this.posY;
}




Cuadrado.prototype.dibujar = function(ctx){

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX,this.posY,this.lado,this.lado);
    ctx.fill();
    ctx.closePath();
  
}

Cuadrado.prototype.estaAdentro = function(x,y){
  var result = false;
  var cuenta = Math.sqrt(Math.pow(x-this.posX,2) + Math.pow(y-this.posY,2));
  if (cuenta<this.radio){
    result = true;
  }
  return result;
}

Cuadrado.prototype.select = function(x,y){
  this.selected=1;
  this.selx=x;
  this.sely=y;
}

Cuadrado.prototype.unselect = function(){
  this.selected=0;
  this.selx=0;
  this.sely=0;
}

Cuadrado.prototype.superpone = function(c){
  var result = false;
  var cuenta = Math.sqrt(Math.pow(c.posX-this.posX,2) + Math.pow(c.posY-this.posY,2));
  if (cuenta+this.radio<c.radio){
    result = true;
  }
  return result;
}


Cuadrado.prototype.comer = function(s){
  if(s.color!='#000000'){
    this.radio+=s.radio;
    s.comido=1;
   }else{
     this.radio-=s.radio;
     s.comido=1;
   }
}
