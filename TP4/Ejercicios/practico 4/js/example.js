var angulo=0;
document.getElementById('rectangulo').onclick=function(){
         
         colores=['000000','0000FF','FF0000','00FF00','00FFFF'];
         this.style.backgroundColor='#'+colores[Math.floor(Math.random()*colores.length)];
     };

document.getElementById('rectangulo').onmousemove=function(){
    //angulo=angulo+5;
    //this.style.transform= 'rotate('+angulo+'deg)';
};

document.onmousewheel =function(){
    angulo=angulo+10;
    document.getElementById('rectangulo').style.transform= 'rotate3d(1,1,1,'+angulo+'deg)';
};