
//mover usando flechitas
/* var posx=0;
var kc='39';
document.onkeydown =function(e){
    
    if(e.keyCode == '39'){
        kc='39';
        posx=posx+20;
        document.getElementById('bichito').style.background= 'url(\'spritestrip.png\') left center';
        document.getElementById('bichito').style.transform='translate('+posx+'px,0px)';   
    }
    if(e.keyCode == '37'){
        kc='37';
        posx=posx-20;
        document.getElementById('bichito').style.background= 'url(\'spritestrip2.png\') left center';
        document.getElementById('bichito').style.transform='translate('+posx+'px,0px)';  
    }
} */

//mover hacia donde se hace click

document.onclick =function(e){
    var mousePosX=e.clientX;
    
    //todo calcular el tiempo de la animacion y la cantidad de acuero a al distancia de la imagen y el click
    if(mousePosX > 300){
        document.getElementById('bichito').style.background= 'url(\'spritestrip.png\') left center';
    }else{
        document.getElementById('bichito').style.background= 'url(\'spritestrip2.png\') left center';
    }
    document.getElementById('bichito').style.animation='play 1s steps(6) 3';  
    document.getElementById('bichito').style.transition= 'margin-left 3s linear';
    document.getElementById('bichito').style.marginLeft= mousePosX+'px';
   // document.getElementById('bichito').style.transition='translate(50px,0px)'; 

}