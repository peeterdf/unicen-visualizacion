//use strict";

var c=document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");
var ctx2 =document.getElementById("canvas-mini").getContext("2d");

var image1 = new Image();
var imgRespaldo = new Image();

var desdew;
var desdeh;
var maxw;
var maxh;
var hastaw;
var hastah;

function restablecerimg (image){
   myDrawImageMethod(image,ctx,document.getElementById("canvas").width,document.getElementById("canvas").height );
}
function cargaimg() {
  image1.src=document.getElementById("img-input").files[0].name;
  imgRespaldo.src=image1.src;
  image1.onload = function(){
    ctx.clearRect(0,0,600,500);
   myDrawImageMethod(this,ctx,document.getElementById("canvas").width,document.getElementById("canvas").height );
 }
 imgRespaldo.onload = function(){
   ctx2.clearRect(0,0,600,500);
  myDrawImageMethod(this,ctx2,document.getElementById("canvas-mini").width,document.getElementById("canvas-mini").height );
  }
}

function getRed(imageData,x,y){
 index = (x+y*imageData.width)*4;
 return imageData.data[index+0];
}
function getGreen(imageData,x,y){
 index = (x+y*imageData.width)*4;
 return imageData.data[index+1];
}
function getBlue(imageData,x,y){
 index = (x+y*imageData.width)*4;
 return imageData.data[index+2];
}

function setPixel(imageData,x,y,r,g,b,a){
  index= (x+y*imageData.width)*4;
  imageData.data[index+0] =r;
  imageData.data[index+1] =g;
  imageData.data[index+2] =b;
  imageData.data[index+3] =a;
}

function myDrawImageMethod (image, ctx,ctxwidth,ctxheight){
  if (image.width>image.height){
    desdew=0;
    desdeh= Math.floor(((ctxheight-(ctxwidth/image.width)*image.height)/2))+1;
    hastaw=ctxwidth;
    maxw= ctxwidth;
    hastah=Math.floor(((ctxwidth/image.width)*image.height ))+1;
    maxh= (ctxheight-Math.floor(((ctxwidth/image.width)*image.height )))/2+Math.floor(((ctxwidth/image.width)*image.height ))+2;

    //ctx.drawImage(image, 0, ((ctxheight-(ctxwidth/image.width)*image.height)/2), ctxwidth,(ctxwidth/image.width)*image.height );
  }else{

    desdew=Math.floor(((ctxwidth-(ctxheight/image.height)*image.width)/2))+1;
    desdeh= 0;
    hastaw= Math.floor(((ctxheight/image.height)*image.width))+1;
    maxw= ( ctxwidth-Math.floor(((ctxheight/image.height)*image.width) ))/2+ Math.floor(((ctxheight/image.height)*image.width))+1;
    hastah=ctxheight;
    maxh= ctxheight;
    //ctx.drawImage(image, ((ctxwidth-(ctxheight/image.height)*image.width)/2), 0, ((ctxheight/image.height)*image.width),ctxheight );
  }
  ctx.drawImage(image, desdew, desdeh, hastaw,hastah );

}

function filtroByN(){
 restablecerimg(imgRespaldo);
 var imageData = ctx.getImageData(0,0,c.width,c.height);
  for(y=desdeh; y<maxh; y++){
    for(x=desdew; x<maxw; x++){
        var pixelbyn= Math.floor(getRed(imageData,x,y)+getGreen(imageData,x,y)+getBlue(imageData,x,y)/3);
        setPixel(imageData,x,y,pixelbyn,pixelbyn,pixelbyn,255);
    }
  }
   ctx.putImageData(imageData,0,0);
}

function filtroNegativo(){
 restablecerimg(imgRespaldo);
 imageData = ctx.getImageData(0,0,c.width,c.height);
  for(y=desdeh; y<maxh; y++){
    for(x=desdew; x<maxw; x++){
        setPixel(imageData,x,y,255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y),255);
    }
  }
   ctx.putImageData(imageData,0,0);
}

function filtroBrillo(){
   restablecerimg(imgRespaldo);
  var valor= parseInt(document.getElementById("brillo").value);
 imageData = ctx.getImageData(0,0,c.width,c.height);
  for(y=desdeh; y<maxh; y++){
    for(x=desdew; x<maxw; x++){

       var pixr= getRed(imageData,x,y)+valor;
       var pixg= getGreen(imageData,x,y)+valor;
       var pixb= getBlue(imageData,x,y)+valor;
        setPixel(imageData,x,y,pixr,pixg,pixb,255);
    }
  }
   ctx.putImageData(imageData,0,0);
}


function filtroBinarizacion(){
  restablecerimg(imgRespaldo);
var valor= parseInt(document.getElementById("bin-gradient").value);
 imageData = ctx.getImageData(0,0,c.width,c.height);
  for(y=desdeh; y<maxh; y++){
    for(x=desdew; x<maxw; x++){
      var pixr= getRed(imageData,x,y);
      var pixg= getGreen(imageData,x,y);
      var pixb= getBlue(imageData,x,y);

      if (pixr>valor)pixr=255;
      if (pixr<=valor)pixr=0;

       setPixel(imageData,x,y,pixr,pixr,pixr,255);}
  }
   ctx.putImageData(imageData,0,0);
}

function filtroSepia(){
restablecerimg(imgRespaldo);
 imageData = ctx.getImageData(0,0,c.width,c.height);
  for(y=desdeh; y<maxh; y++){
    for(x=desdew; x<maxw; x++){
      var pixr= getRed(imageData,x,y);
      var pixg= getGreen(imageData,x,y);
      var pixb= getBlue(imageData,x,y);

      var pixsepiar=0.393*pixr + 0.769*pixg + 0.189*pixb;
      var pixsepiag=0.349*pixr + 0.686*pixg + 0.168*pixb;
      var pixsepiab=0.272*pixr + 0.534*pixg + 0.131*pixb;
        setPixel(imageData,x,y,Math.floor(pixsepiar),Math.floor(pixsepiag),Math.floor(pixsepiab),255);
    }
  }
   ctx.putImageData(imageData,0,0);
}


var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = c.toDataURL('image/png');
    button.href = dataURL;
});
