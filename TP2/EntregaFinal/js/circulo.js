

function Circle(){
  this.posX = 4;
  this.posy = 4;
  this.radio = 10;
  this.color = '#141444';
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.comido=0;
}

function Circle(paramPosX, paramPosY, paramRadio, paramColor){
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.radio = paramRadio;
  this.color = paramColor;
  this.selected=0;
  this.selx=0;
  this.sely=0;
  this.comido=0;
}

Circle.prototype.setX = function(x) {
  this.posX = x;
}

Circle.prototype.setY = function(y) {
  this.posY = y;
}

Circle.prototype.getX = function() {
  return this.posX ;
}

Circle.prototype.getY = function() {
  return this.posY;
}


Circle.prototype.message = function(){
  alert('soy circulito con radio:'+this.radio);
}

Circle.prototype.dibujar = function(ctx){
  if(this.comido==0){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.posX,this.posY,this.radio,0,Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

Circle.prototype.estaAdentro = function(x,y){
  var result = false;
  var cuenta = Math.sqrt(Math.pow(x-this.posX,2) + Math.pow(y-this.posY,2));
  if (cuenta<this.radio){
    result = true;
  }
  return result;
}

Circle.prototype.select = function(x,y){
  this.selected=1;
  this.selx=x;
  this.sely=y;
}

Circle.prototype.unselect = function(){
  this.selected=0;
  this.selx=0;
  this.sely=0;
}

Circle.prototype.superpone = function(c){
  var result = false;
  var cuenta = Math.sqrt(Math.pow(c.posX-this.posX,2) + Math.pow(c.posY-this.posY,2));
  if (cuenta+this.radio<c.radio){
    result = true;
  }
  return result;
}


Circle.prototype.comer = function(s){
  if(s.color!='#000000'){
    this.radio+=s.radio;
    s.comido=1;
   }else{
     this.radio-=s.radio;
     s.comido=1;
   }
}
