function Juego(){
  this.dificultad=1;
  this.jugador= new Jugador();
  this.enemigos=[];
  this.andando=0;
  this.musica=0;
  this.opciones=[];
  this.cantEnemigos=0;
  this.actualizando=0;
  this.crearEnemigos=0;
}

Juego.prototype.setJugador = function(j) {
  this.jugador = j;
}

Juego.prototype.termino = function(){
  document.getElementById('player').style.animation ='player-run 2s steps(6) 0';  
  document.getElementById('back6').style.animationPlayState= "paused";
  document.getElementById('back5').style.animationPlayState= "paused"; 
  document.getElementById('back4').style.animationPlayState= "paused";
  document.getElementById('back3').style.animationPlayState= "paused";
  document.getElementById('back1').style.animationPlayState= "paused";
  clearInterval(this.actualizando);
  clearInterval(this.crearEnemigos);
  for (var index = 0; index < this.enemigos.length; index++) {
    var enemigo = this.enemigos[index];    
    enemigo.style.transition="";
  }

  this.andando=2; 

}

Juego.prototype.play=function(){
  this.dibujarEscenario();
  /* setTimeout("this.actualizando = setInterval(\"juego1.update()\",100)",3000); */
  this.actualizando = setInterval("juego1.update()",100);
  
}//play



Juego.prototype.dibujarEscenario=function(){
  var tiempo=2;
  document.getElementById('back8').style.backgroundImage ='url(\'img/fondonoche.png\')';
  document.getElementById('back6').style.backgroundImage ='url(\'img/layer_06_1920 x 1080.png\')';  
  document.getElementById('back5').style.backgroundImage ='url(\'img/layer_05_1920 x 1080.png\')';  
  document.getElementById('back4').style.backgroundImage ='url(\'img/layer_04_1920 x 1080.png\')';  
  document.getElementById('back3').style.backgroundImage ='url(\'img/layer_03_1920 x 1080.png\')'; 
  document.getElementById('back1').style.backgroundImage ='url(\'img/otropiso.png\')';   
  
  //animacion fondo

  this.jugador.documentElement.style.animation ='player-run 2s steps(6) infinite 3s';  
  document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear infinite 3s';  
  document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear infinite 3s';   
  document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear infinite 3s'; 
  document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear infinite 3s';
  document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear infinite 3s';

  this.andando=1;
  //sacar menu
  document.getElementById('fondo-inicio').style.display='none';
  document.getElementById('btn-list').style.display='none';
  document.getElementById('resultado').style.display='block';
  this.crearEnemigos= setInterval("juego1.iniciarEnemigos()",3000);
}

Juego.prototype.iniciarEnemigos=function(){
  this.cantEnemigos++;
  var e=document.createElement("div");
  e.setAttribute("id", "enemigo"+this.cantEnemigos);
  e.setAttribute("class", "enemigo");
  e.style.backgroundImage ='url(\'img/box2.png\')';
  e.style.transition= 'margin-left 10s linear';
  this.enemigos.push(e); 
  document.getElementById('principal').appendChild(e);
  
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

Juego.prototype.update=function(){
  this.jugador.puntos=this.jugador.puntos+1;
  if(this.jugador.puntos>=0){
    document.getElementById('puntaje').innerHTML=this.jugador.puntos;
  }
  
  

  /* update */
  for (var index = 0; index < this.enemigos.length; index++) {
    var enemigo = this.enemigos[index];    
    if (enemigo.offsetLeft ==1000){
      enemigo.style.marginLeft= '-100px';
    }else{
      if( 55< enemigo.offsetLeft-this.jugador.documentElement.offsetLeft && enemigo.offsetLeft-this.jugador.documentElement.offsetLeft <65){
        enemigo.style.animation ='romper-caja 1.5s steps(7) 1';
        if(this.jugador.accion==2){
          this.jugador.puntos=this.jugador.puntos+100;
        } else if(this.jugador.accion==1){
          this.jugador.vidas=this.jugador.vidas-1;
          document.getElementById('vida'+this.jugador.vidas).src='img/batman-vida-out.png';
          if(this.jugador.vidas==0){
            juego1.termino();
          }
        } 
      }
    }
  }

}



////////////////////////////////

var juego1 = new Juego();
var batman= new Jugador(3,-30,document.getElementById('player'));
juego1.setJugador(batman);
/* function play(){
  juego1.andando=1;
  juego1.play();
} */
 document.getElementById('btn-play').onclick=function(){
    juego1.play(); 
 } 
 document.getElementById('btn-instrucciones').onclick=function(){
  var div = document.getElementById('instrucciones');
  div.style.display = div.style.display == "none" ? "block" : "none"; 
} 
 document.getElementById('reproductor').onclick=function(){
    juego1.music();
 }


/////////////////////////////////


document.onkeydown =function(e){
  var tiempo=2;
  if(e.keyCode == '39' && juego1.andando==1){
      kc='39';
      juego1.jugador.golpear();  
  }
  if(e.keyCode == '40' && juego1.andando==1){
      kc='40';
      //juego1.jugador.animation ='player-stop 1s steps(2) infinite'; 
      juego1.jugador.documentElement.style.animation ='player-stop 1s steps(2) infinite'; 
      document.getElementById('back6').style.animationPlayState= "paused";
      document.getElementById('back5').style.animationPlayState= "paused"; 
      document.getElementById('back4').style.animationPlayState= "paused";
      document.getElementById('back3').style.animationPlayState= "paused";
      document.getElementById('back1').style.animationPlayState= "paused";
  }

  if(e.keyCode == '38' && juego1.andando==1){
    kc='38';
    juego1.jugador.correr();
    }
} 