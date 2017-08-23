//use strict";

var c=document.getElementById("canvas");
var ctx =document.getElementById("canvas").getContext("2d");
var ctx2 =document.getElementById("canvas-mini").getContext("2d");

var image1 = new Image();
var imgRespaldo = new Image();


function restablecerimg (image){
   myDrawImageMethod(image,ctx,document.getElementById("canvas").width,document.getElementById("canvas").height );
}
function cargaimg() {
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
  if (image.width>image.height){
    ctx.drawImage(image, 0, ((ctxheight-(ctxwidth/image.width)*image.height)/2), ctxwidth,(ctxwidth/image.width)*image.height );
  }else{
    ctx.drawImage(image, ((ctxwidth-(ctxheight/image.height)*image.width)/2), 0, ((ctxheight/image.height)*image.width),ctxheight );
  }
}

function filtroByN(){
 restablecerimg(imgRespaldo);

 var imageData = ctx.getImageData(0,0,c.width,image1.height);
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



function putImage(){

  var myImage = c.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href=myImage;


}
