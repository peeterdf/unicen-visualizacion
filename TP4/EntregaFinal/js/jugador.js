function Jugador(){
  this.posX = 0;
  this.posy = 0;
  this.width = 70;
  this.height = 100;
  this.background = '#141444';
  this.vidas=3;
  this.puntos=100;
}

function Jugador(paramPosX, paramPosY, paramWidth,paramHeight,paramBackground,paramVidas,paramPuntos){
  this.posX = paramPosX;
  this.posy = paramPosY;
  this.width = paramWidth;
  this.height = paramHeight;
  this.background = paramBackground;
  this.vidas= paramVidas;
  this.puntos= paramPuntos;
}


Jugador.prototype.setX = function(x) {
  this.posX = x;
}

Jugador.prototype.setY = function(y) {
  this.posY = y;
}

Jugador.prototype.getX = function() {
  return this.posX ;
}

Jugador.prototype.getY = function() {
  return this.posY;
}


Jugador.prototype.caminar = function(j1){
  //document.getElementById('player')
  j1.style.animation ='player-walk 1s steps(5) infinite';  
}

Jugador.prototype.saltar = function(){
  //
}

Jugador.prototype.matar = function(){
  //
}

