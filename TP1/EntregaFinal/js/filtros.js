//use strict";


var ctx =document.getElementById("canvas").getContext("2d");
var ctx2 =document.getElementById("canvas-mini").getContext("2d");
var image1 = new Image();
var imgRespaldo = new Image();


function restablecerimg (image){
  ctx.drawImage(image,0,0);
}
function cargaimg() {
  console.log(document.getElementById("img-input").files[0].name);
  image1.src=document.getElementById("img-input").files[0].name;
  imgRespaldo.src=image1.src;
  image1.onload = function(){
    ctx.clearRect(0,0,900,600);
   myDrawImageMethod(this,ctx,document.getElementById("canvas").width,document.getElementById("canvas").height );
 }
 imgRespaldo.onload = function(){
   ctx2.clearRect(0,0,900,600);
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
//ctx.drawImage(image, 0, 0, image.width,    image.height, 0, 0, ctxwidth ,ctxheight );
 ctx.drawImage(image,0,0);
}

function filtroByN(){
 restablecerimg(imgRespaldo);


 var imageData = ctx.getImageData(0,0,image1.width,image1.height);
  for(y=0; y<image1.height; y++){
    for(x=0; x<image1.width; x++){
        var pixelbyn= Math.floor(getRed(imageData,x,y)+getGreen(imageData,x,y)+getBlue(imageData,x,y)/3);
        setPixel(imageData,x,y,pixelbyn,pixelbyn,pixelbyn,255);
    }
  }
   ctx.putImageData(imageData,0,0);
}

function filtroNegativo(){
 image=image1;
 imageData = ctx.getImageData(0,0,image.width,image.height);
  for(y=0; y<image.height; y++){
    for(x=0; x<image.width; x++){
        setPixel(imageData,x,y,255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y),255);
    }
  }
   ctx.putImageData(imageData,0,0);
}

function filtroSepia(){
 image=image1;
 imageData = ctx.getImageData(0,0,image.width,image.height);
  for(y=0; y<image.height; y++){
    for(x=0; x<image.width; x++){
        setPixel(imageData,x,y,255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y),255);
    }
  }
   ctx.putImageData(imageData,0,0);
}

function filtroBrillo(){
  var valor=document.getElementById("brillo").value;
 image=image1;
 imageData = ctx.getImageData(0,0,image.width,image.height);
  for(y=0; y<image.height; y++){
    for(x=0; x<image.width; x++){
       var pixr= getRed(imageData,x,y)+valor/2;
       var pixg= getGreen(imageData,x,y)+valor/2;
       var pixb= getBlue(imageData,x,y)+valor/2;
        setPixel(imageData,x,y,pixr,pixg,pixb);
    }
  }
   ctx.putImageData(imageData,0,0);
}

function filtroBinarizacion(){
 image=image1;
 imageData = ctx.getImageData(0,0,image.width,image.height);
  for(y=0; y<image.height; y++){
    for(x=0; x<image.width; x++){
        setPixel(imageData,x,y,255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y),255);
    }
  }
   ctx.putImageData(imageData,0,0);
}
