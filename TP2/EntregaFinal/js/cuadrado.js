function Cuadrado(){
  this.posX = 4;
  this.posy = 4;
  this.lado = 10;
  this.color = '#141444';
  this.colorBorde = '#141444';
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.tipo=2;
}

function Cuadrado(paramPosX, paramPosY, paramLado,paramColor,paramColorBorde){
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.lado = paramLado;
  this.color = paramColor;
  this.colorBorde = paramColorBorde;
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.tipo=2;
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


Cuadrado.prototype.message = function(){
  alert('soy cuadrado con lado:'+this.lado);
}

Cuadrado.prototype.dibujar = function(ctx){

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.drawImage(img,this.posX,this.posY);
    ctx.fillRect(this.posX,this.posY,this.lado,this.lado);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth =7;
    ctx.strokeStyle = this.colorBorde;
    ctx.strokeRect(this.posX,this.posY,this.lado,this.lado);
    ctx.closePath();

}

Cuadrado.prototype.estaAdentro = function(x,y){
  var result = false;
  if ( x-this.posX<=this.lado  && x-this.posX>0){
    if(y-this.posY<=this.lado &&  y-this.posY>0){
    result = true;
    }
  }
  return result;
}

Cuadrado.prototype.select = function(x,y){
  this.selected=1;
  this.selx=x;
  this.sely=y;
}

Cuadrado.prototype.unselect = function(){
  if(this.selected==1){
  this.selected=0;
  }
  this.selx=0;
  this.sely=0;
}
