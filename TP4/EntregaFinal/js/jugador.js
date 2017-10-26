//0 esperando
//1 caminar
//2 saltar
//9 muerto
function Jugador(){
  this.vidas=3;
  this.puntos=100;
  this.documentElement='';
  this.accion='1';
  this.self=this;
}

function Jugador(paramVidas,paramPuntos,paramDE){
  this.vidas= paramVidas;
  this.puntos= paramPuntos;
  this.documentElement=paramDE;
  this.accion='1';
}


Jugador.prototype.correr = function(){
  Jugador.self.accion=1;
  console.log(this);
  document.getElementById('player').style.animation ='player-run 2s steps(6) infinite'; 
}

Jugador.prototype.golpear = function(){
  this.accion=2;
  document.getElementById('player').addEventListener('animationend', this.correr);   
  this.documentElement.style.animation ='player-jump 1s steps(4) 1';    
}

Jugador.prototype.morir = function(){
  this.accion=9;
  this.documentElement.style.animation ='player-die 1s steps(5) 1';
}

