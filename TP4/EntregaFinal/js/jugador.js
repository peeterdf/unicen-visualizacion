//0 esperando
//1 caminar
//2 saltar
//9 muerto
function Jugador(){
  this.vidas=3;
  this.puntos=100;
  this.documentElement='';
  this.accion='1';
}

function Jugador(paramVidas,paramPuntos,paramDE){
  this.vidas= paramVidas;
  this.puntos= paramPuntos;
  this.documentElement=paramDE;
  this.accion='1';
}


Jugador.prototype.correr = function(){
  this.accion=1;
  //document.getElementById('player')
  this.documentElement.style.animation ='player-run 2s steps(6) infinite'; 
}

Jugador.prototype.golpear = function(){
   this.accion=2;
   console.log("salta");
  this.documentElement.style.animation ='player-jump 1s steps(4) 1';
  this.documentElement.addEventListener("animationend", "this.correr()"); 

}

Jugador.prototype.morir = function(){
  this.accion=9;
  this.documentElement.style.animation ='player-die 1s steps(5) 1';
  
}

