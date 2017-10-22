
function Juego(){
  this.dificultad=1;
  this.jugador= new Jugador();
  this.andando=0;
  this.musica=0;
  this.opciones=[];
}

Juego.prototype.isfinish = function(){
  document.getElementById('player').style.animation ='player-run 2s steps(6) 0';  
  document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear 0';  
  document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear 0';   
  document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear 0'; 
  document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear 0';
  document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear 0';
  this.andando=2; 

}

Juego.prototype.play=function(){
  this.dibujarEscenario();
}//play

Juego.prototype.pause=function(){

}

/* Juego.prototype.setDificultad=function(l){
this.dificultad=l;
this.empezar();
//opacar y mostrar button play
} */


Juego.prototype.dibujarEscenario=function(){
  var tiempo=2;
  document.getElementById('back8').style.backgroundImage ='url(\'img/fondonoche.png\')';
  document.getElementById('back6').style.backgroundImage ='url(\'img/layer_06_1920 x 1080.png\')';  
  document.getElementById('back5').style.backgroundImage ='url(\'img/layer_05_1920 x 1080.png\')';  
  document.getElementById('back4').style.backgroundImage ='url(\'img/layer_04_1920 x 1080.png\')';  
  document.getElementById('back3').style.backgroundImage ='url(\'img/layer_03_1920 x 1080.png\')'; 
  document.getElementById('back1').style.backgroundImage ='url(\'img/otropiso.png\')';   
  
  //animacion fondo

  document.getElementById('player').style.animation ='player-run 2s steps(6) infinite 3s';  
  document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear infinite 3s';  
  document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear infinite 3s';   
  document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear infinite 3s'; 
  document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear infinite 3s';
  document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear infinite 3s';

  this.andando=1;
  //sacar menu
  document.getElementById('fondo-inicio').style.display='none';
  document.getElementById('btn-list').style.display='none';
  this.enemigos();
}

Juego.prototype.enemigos=function(){
  var e=document.createElement("div");
  e.setAttribute("id", "enemigo1");
  e.setAttribute("class", "enemigo");
  e.style.backgroundImage ='url(\'img/box2.png\')'; 
  document.getElementById('principal').appendChild(e);
}

Juego.prototype.termino=function(){
  //chequear si se quedo sin vidas
  puzzle1.isfinish();
  return true;
}



Juego.prototype.music=function(){
  
    if(this.musica==0){
    document.getElementsByTagName('audio')[0].play();
    document.getElementById('reproductor').style.backgroundImage='url(img/playmusic.png)';
    this.musica=1;
    }else{
        document.getElementsByTagName('audio')[0].pause();
        document.getElementById('reproductor').style.backgroundImage='url(img/stopmusic.png)';
        this.musica=0;
    }
  
}
/* update */
/* recorrer todos los enemigos, actualizarlos(arreglo de enemigos)
posicion mayor que la pantalla, ir disminuyendo, por timeout


if (chocan) then
sacar vida,morir

else contar puntos*/


////////////////////////////////

var juego1 = new Juego();

/* function play(){
  juego1.andando=1;
  juego1.play();
} */
 document.getElementById('btn-play').onclick=function(){
    juego1.play(); 
 } 
 
 document.getElementById('reproductor').onclick=function(){
    juego1.music();
 }


/////////////////////////////////


document.onkeydown =function(e){
  var tiempo=2;
  if(e.keyCode == '39'){
      kc='39';
      document.getElementById('player').style.animation ='player-run 2s steps(6) infinite';  
      document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear infinite';  
      document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear infinite';   
      document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear infinite'; 
      document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear infinite';
      document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear infinite';
  }
  if(e.keyCode == '40'){
      kc='40';
      document.getElementById('player').style.animation ='player-stop 1s steps(2) infinite';  
      document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear 0';  
      document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear 0';   
      document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear 0'; 
      document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear 0';
      document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear 0';
  }
  if(e.keyCode == '37'){
      kc='37';
      posx=posx-150;
      /* document.getElementById('bichito').style.background= 'url(\'spritestrip2.png\') left center';
      document.getElementById('bichito').style.animation ='play 1s steps(6) infinite';  
      document.getElementById('bichito').style.transition= 'margin-left 3s linear';
      document.getElementById('bichito').style.marginLeft= posx+'px';  */
  }
} 