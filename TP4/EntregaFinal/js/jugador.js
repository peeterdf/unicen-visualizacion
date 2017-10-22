//0 esperando
//1 caminar
//2 saltar
//9 muerto
function Jugador(){
  this.posX = 0;
  this.posy = 0;
  this.width = 70;
  this.height = 100;
  this.background = '#141444';
  this.vidas=3;
  this.puntos=100;
  this.documentElement='';
  this.accion='0';
}

function Jugador(paramPosX, paramPosY, paramWidth,paramHeight,paramBackground,paramVidas,paramPuntos,paramDE){
  this.posX = paramPosX;
  this.posy = paramPosY;
  this.width = paramWidth;
  this.height = paramHeight;
  this.background = paramBackground;
  this.vidas= paramVidas;
  this.puntos= paramPuntos;
  this.documentElement=paramDE;
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


Jugador.prototype.caminar = function(){
  this.accion=1;
  //document.getElementById('player')
  this.documentElement.style.animation ='player-run 2s steps(6) infinite'; 
}

Jugador.prototype.saltar = function(){
  //jugador saltando se vuelve true
  this.accion=2;
  //setear animacion
  this.documentElement.style.animation ='player-jump 1s steps(5) 1';
  //animacion.addeventlistener('animationend', jugador corriendo en true setear animacion run)
}

Jugador.prototype.morir = function(){
  this.accion=9;
}

