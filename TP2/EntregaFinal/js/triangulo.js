function Triangulo(){
  this.posX = 4;
  this.posy = 4;
  this.lado = 10;
  this.color = '#141444';
  this.colorBorde = '#141444';
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.tipo=3;
}

function Triangulo(paramPosX, paramPosY, paramLado,paramColor,paramColorBorde){
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.lado = paramLado;
  this.color = paramColor;
  this.colorBorde = paramColorBorde;
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.tipo=3;
}


Triangulo.prototype.setX = function(x) {
  this.posX = x;
}

Triangulo.prototype.setY = function(y) {
  this.posY = y;
}

Triangulo.prototype.getX = function() {
  return this.posX ;
}

Triangulo.prototype.getY = function() {
  return this.posY;
}


Triangulo.prototype.message = function(){
  alert('soy triangulo con lado:'+this.lado);
}

Triangulo.prototype.dibujar = function(ctx){
    ctx.beginPath();
    ctx.drawImage(img3,this.posX-this.lado/2,this.posY);
    ctx.fillStyle = this.color;
    ctx.moveTo(this.posX,this.posY);//75 50
    ctx.lineTo(this.posX-this.lado/2,this.posY+Math.sqrt(Math.pow(this.lado,2) - Math.pow(this.lado/2,2)));//100 75
    ctx.lineTo(this.posX+this.lado/2,this.posY+Math.sqrt(Math.pow(this.lado,2) - Math.pow(this.lado/2,2)));//100 25
    ctx.fill();
    ctx.closePath();


  ctx.beginPath();
  ctx.strokeStyle = this.colorBorde;
  ctx.lineWidth =7;
  ctx.lineCap = 'round';
  ctx.moveTo(this.posX,this.posY);//75 50
  ctx.lineTo(this.posX-this.lado/2,this.posY+Math.sqrt(Math.pow(this.lado,2) - Math.pow(this.lado/2,2)));//100 75
  ctx.lineTo(this.posX+this.lado/2,this.posY+Math.sqrt(Math.pow(this.lado,2) - Math.pow(this.lado/2,2)));//100 25
  ctx.lineTo(this.posX,this.posY);
  ctx.stroke();
  ctx.closePath();
}

Triangulo.prototype.estaAdentro = function(x,y){
  var result;
  p1x=this.posX;
  p1y=this.posY;
  p2x=this.posX-this.lado/2;
  p2y=this.posY+Math.sqrt(Math.pow(this.lado,2) - Math.pow(this.lado/2,2));
  p3x=this.posX+this.lado/2;
  p3y=this.posY+Math.sqrt(Math.pow(this.lado,2) - Math.pow(this.lado/2,2));
  t0=(p1x - p3x) * (p2y - p3y) - (p1y - p3y) * (p2x - p3x);
  t1=(p1x - x) * (p2y - y) - (p1y - y) * (p2x - x);
  t2=(p1x - p3x) * (y - p3y) - (p1y - p3y) * (x - p3x);
  t3=(x - p3x) * (p2y - p3y) - (y - p3y) * (p2x - p3x);

  if(t0>0 ){
        if(t1>0 && t2>0 && t3>0){
           return true ;
         }else{
           return false;
         }
   }else{
       if(t1<0 && t2<0 && t3<0){
         return true ;
       }else{
         return false;
       }
      }

}


Triangulo.prototype.select = function(x,y){
  this.selected=1;
  this.selx=x;
  this.sely=y;
}

Triangulo.prototype.unselect = function(){
  if(this.selected==1){
  this.selected=0;
  }
  this.selx=0;
  this.sely=0;
}
