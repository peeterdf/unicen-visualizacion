
//mover usando flechitas
 var posx=0;
var kc='39';
document.onkeydown =function(e){
    
    if(e.keyCode == '39'){
        kc='39';
        posx=posx+150;
        document.getElementById('bichito').style.background= 'url(\'spritestrip.png\') left center';
        document.getElementById('bichito').style.animation ='play 1s steps(6) infinite';  
        document.getElementById('bichito').style.transition= 'margin-left 3s linear';
        document.getElementById('bichito').style.marginLeft= posx+'px';  
    }
    if(e.keyCode == '40'){
        kc='40';
        document.getElementById('bichito').style.animation ='play 1s steps(6) 0';  
    }
    if(e.keyCode == '37'){
        kc='37';
        posx=posx-150;
        document.getElementById('bichito').style.background= 'url(\'spritestrip2.png\') left center';
        document.getElementById('bichito').style.animation ='play 1s steps(6) infinite';  
        document.getElementById('bichito').style.transition= 'margin-left 3s linear';
        document.getElementById('bichito').style.marginLeft= posx+'px'; 
    }
} 



 
    
   
