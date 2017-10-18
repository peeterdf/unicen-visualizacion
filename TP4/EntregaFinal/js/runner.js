/* clase jugador
 posision pantalla x y
vidas, si dispara etc
metodos  -saltar -morir -disparar
cada metodo cambia la animacion o setea otra clase.



clase game
tiene un jugador
tiene enemigos(con propiedades, parecido a jugador)

metodos: init() inicializar juego. setear personajes y demas
       update() sitio de actualizacion-> segun q tecla se aprieta hace algo derecha corre, arriba jugador.salta
        redibujar toda la pantalla.
 */

var tiempo=1;
document.getElementById('back8').style.backgroundImage ='url(\'img/fondonoche.png\')';

/* document.getElementById('back7').style.backgroundImage ='url(\'img/layer_07_1920 x 1080.png\')';
document.getElementById('back7').style.animation ='fondo '+8*tiempo+'s linear infinite'; */

document.getElementById('back6').style.backgroundImage ='url(\'img/layer_06_1920 x 1080.png\')';  

document.getElementById('back5').style.backgroundImage ='url(\'img/layer_05_1920 x 1080.png\')';  

document.getElementById('back4').style.backgroundImage ='url(\'img/layer_04_1920 x 1080.png\')';  

document.getElementById('back3').style.backgroundImage ='url(\'img/layer_03_1920 x 1080.png\')';  


/* arboles
document.getElementById('back2').style.backgroundImage ='url(\'img/layer_02_1920 x 1080.png\')';  
document.getElementById('back2').style.animation ='fondo '+3*tiempo+'s linear infinite';   */

/* piso naranja
document.getElementById('back1').style.backgroundImage ='url(\'img/layer_01_1920 x 1080.png\')';  
document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear infinite';  
 */

document.getElementById('back1').style.backgroundImage ='url(\'img/otropiso.png\')';  

document.getElementById('btn-accion').onclick= function(){
    
    if (this.attributes.estado.value==1) {
    document.getElementById('player').style.animation ='player-run 2s steps(6) 0';  
    document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear 0';  
    document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear 0';   
    document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear 0'; 
    document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear 0';
    document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear 0';
    this.innerHTML='PLAY';
    this.attributes.estado.value=0; 
    }else if(this.attributes.estado.value==0){
        document.getElementById('fondo-inicio').style.display='none';
        document.getElementById('btn-list').style.display='none';
        document.getElementById('player').style.animation ='player-run 2s steps(6) infinite';  
        document.getElementById('back6').style.animation ='fondo '+7*tiempo+'s linear infinite';  
        document.getElementById('back5').style.animation ='fondo '+6*tiempo+'s linear infinite';   
        document.getElementById('back4').style.animation ='fondo '+5*tiempo+'s linear infinite'; 
        document.getElementById('back3').style.animation ='fondo '+4*tiempo+'s linear infinite';
        document.getElementById('back1').style.animation ='fondo '+2*tiempo+'s linear infinite';
        this.innerHTML='STOP'; 
        this.attributes.estado.value=1;
    } 
}


document.onkeydown =function(e){
    
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