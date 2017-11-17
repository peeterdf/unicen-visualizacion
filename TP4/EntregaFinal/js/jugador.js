//0 esperando
//1 caminar
//2 pegar
//3 saltar
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


Jugador.prototype.stop = function(){
  this.accion=1;
  document.getElementById('player').style.background= "url('img/quieto123.png')";
  
  document.getElementById('player').style.animation ='player-stop 3s steps(1) 1'; 
}

Jugador.prototype.correr = function(){
  this.accion=1;
  document.getElementById('player').style.background= "url('img/run123.png')";
  
  document.getElementById('player').style.animation ='player-run 1.2s steps(6) infinite'; 
}

Jugador.prototype.golpear = function(){
  this.accion=2;
  
  document.getElementById('player').addEventListener('animationend', ()=> {
    this.correr();
  });   
  document.getElementById('player').style.background= "url('img/golpe123.png')";
  this.documentElement.style.animation ='player-knock 1.5s steps(8) 1';   
}

Jugador.prototype.morir = function(){
  this.accion=9;
  this.documentElement.style.animation ='player-die 1s steps(5) 1';
}

Jugador.prototype.saltar = function(){
  this.accion=3;
  document.getElementById('player').addEventListener('animationend', ()=> {
    this.correr();
  }); 
  document.getElementById('player').style.background= "url('img/jump123.png')";
  document.getElementById('player').style.animation ='player-jump 2s steps(8) 1'; 
}

