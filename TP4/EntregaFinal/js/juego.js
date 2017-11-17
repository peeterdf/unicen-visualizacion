function Juego(){
  this.dificultad=1;
  this.jugador= new Jugador();
  this.enemigos=[];
  this.andando=0;
  this.musica=1;
  this.cantEnemigos=0;
  this.actualizando=0;
  this.crearEnemigos=0;
}

Juego.prototype.setJugador = function(j) {
  this.jugador = j;
}

Juego.prototype.termino = function(){
  
 /*  document.getElementById('player').style.animation ='player-run 2s steps(6) 0'; */
  document.getElementById('player').style.animation =''; 
  document.getElementById('player').style.background= "url('img/quieto123.png')";
  
/*   document.getElementById('back6').style.animationPlayState= "paused";
  document.getElementById('back5').style.animationPlayState= "paused"; 
  document.getElementById('back4').style.animationPlayState= "paused";
  document.getElementById('back3').style.animationPlayState= "paused";
  document.getElementById('back1').style.animationPlayState= "paused"; */
  document.getElementById('back6').style.animation= "";
  document.getElementById('back5').style.animation= ""; 
  document.getElementById('back4').style.animation= "";
  document.getElementById('back3').style.animation= "";
  document.getElementById('back1').style.animation= ""; 
  clearInterval(this.actualizando);
  clearInterval(this.crearEnemigos);
  document.getElementsByTagName('audio')[0].pause();
  for (var index = 0; index < this.enemigos.length; index++) {
    var enemigo = this.enemigos[index];    
    enemigo.style.transition="";
  }
  document.getElementById('cantidad-puntos').innerHTML=this.jugador.puntos;
  document.getElementById('puntaje-final').style.display = "block";
  this.andando=2; 
  
  

}

Juego.prototype.play=function(){
  this.dificultad=1;
  this.enemigos=[];
  this.andando=0;
  this.cantEnemigos=0;
  this.actualizando=0;
  this.crearEnemigos=0;
  this.jugador.vidas=3;
  this.jugador.puntos=-30;
  this.jugador.documentElement.style.display ="block";
  this.dibujarEscenario();
  document.getElementById('puntaje-final').style.display = "none";
  /* setTimeout("this.actualizando = setInterval(\"juego1.update()\",100)",3000); */
  this.actualizando = setInterval("juego1.update()",100);
  
}//play



Juego.prototype.dibujarEscenario=function(){
  var tiempo=3;
  document.getElementById('puntaje').innerHTML='Puntos: 0';
  document.getElementById('back8').style.backgroundImage ='url(\'img/fondonoche.png\')';
  document.getElementById('back6').style.backgroundImage ='url(\'img/layer_06_1920 x 1080.png\')';  
  document.getElementById('back5').style.backgroundImage ='url(\'img/layer_05_1920 x 1080.png\')';  
  document.getElementById('back4').style.backgroundImage ='url(\'img/layer_04_1920 x 1080.png\')';  
  document.getElementById('back3').style.backgroundImage ='url(\'img/layer_03_1920 x 1080.png\')'; 
  document.getElementById('back1').style.backgroundImage ='url(\'img/otropiso.png\')';   
  document.getElementById('vida0').src="img/batman-vida.png";
  document.getElementById('vida1').src="img/batman-vida.png";
  document.getElementById('vida2').src="img/batman-vida.png";
  
  //animacion fondo

  this.jugador.stop();
  document.getElementById('player').addEventListener('animationend', ()=> {
    this.jugador.correr();
  });   
  /* this.jugador.documentElement.style.animation ='player-run 2s steps(6) infinite 3s';  */ 
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
  document.getElementById('reproductor').style.display='block';
  this.crearEnemigos= setInterval("juego1.iniciarEnemigos()",3500);

  if(this.musica==0){
  setTimeout(function(){ document.getElementsByTagName('audio')[0].play(); },1500); 
  }
  
}

Juego.prototype.iniciarEnemigos=function(){
  this.cantEnemigos++;
  var e=document.createElement("div");
  e.setAttribute("id", "enemigo"+this.cantEnemigos);
  e.setAttribute("class", "enemigo");
  e.style.backgroundImage ='url(\'img/box2.png\')';
  e.style.transition= 'margin-left 17s linear';
  this.enemigos.push(e); 
  document.getElementById('principal').appendChild(e);
  
}

Juego.prototype.menu=function(){
  
  document.getElementById('fondo-inicio').style.display='block';
  document.getElementById('btn-list').style.display='block';
  document.getElementById('puntaje-final').style.display = "none";
  document.getElementById('resultado').style.display='none';
  document.getElementById('reproductor').style.display='none';
  document.getElementById('instrucciones').style.display='none';
  document.getElementById('player').style.display='none';
  this.andando=0;
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
    document.getElementById('puntaje').innerHTML='Puntos: '+this.jugador.puntos;
  }
  /* update */
  for (var index = 0; index < this.enemigos.length; index++) {
    var enemigo = this.enemigos[index]; 
    
    if (enemigo.offsetLeft ==1900){
      enemigo.style.marginLeft= '-100px';
    }else{

     

      if( 60< enemigo.offsetLeft-this.jugador.documentElement.offsetLeft && enemigo.offsetLeft-this.jugador.documentElement.offsetLeft <75){
     
        if(this.jugador.accion==2){
          this.jugador.puntos=this.jugador.puntos+100;
          enemigo.style.animation ='romper-caja 1s steps(7) 1';
          //////////
          var p=document.createElement("div");
          p.setAttribute("id", "pow");  
          p.style.top=enemigo.style.top;
          p.style.left=enemigo.style.left;
          document.getElementById('principal').appendChild(p);
          pow=document.getElementById('pow');
          setTimeout(function(){document.getElementById('principal').removeChild(document.getElementById('pow')); },1000);
          
          
          ///////////
          enemigo.style.backgroundPosition="410px 0px";
        } else if(this.jugador.accion==1 || (this.jugador.accion==3 && enemigo.offsetTop-this.jugador.documentElement.offsetTop<30) ){
          enemigo.style.animation ='romper-caja 1s steps(7) 1';
     //
          enemigo.style.backgroundPosition="410px 0px";
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

 document.getElementById('btn-reiniciar').onclick=function(){
  document.getElementById('back6').style.animation =''; 
  document.getElementById('back5').style.animation ='';  
  document.getElementById('back4').style.animation =''; 
  document.getElementById('back3').style.animation =''; 
  document.getElementById('back1').style.animation =''; 
  juego1.play(); 
} 

document.getElementById('btn-menu').onclick=function(){
  juego1.menu(); 
} 

/////////////////////////////////


document.onkeydown =function(e){
  var tiempo=2;
  if(e.keyCode == '39' && juego1.andando==1){
      kc='39';
      juego1.jugador.golpear();  
  }

  if(e.keyCode == '38' && juego1.andando==1){
    kc='38';
    juego1.jugador.saltar();
    }
} 