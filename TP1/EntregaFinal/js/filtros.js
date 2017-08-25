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





function rgbToHsl(r, g, b) {
   r /= 255, g /= 255, b /= 255;

   var max = Math.max(r, g, b), min = Math.min(r, g, b);
   var h, s, l = (max + min) / 2;

   if (max == min) {
     h = s = 0;
   } else {
     var d = max - min;
     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

     switch (max) {
       case r: h = (g - b) / d + (g < b ? 6 : 0); break;
       case g: h = (b - r) / d + 2; break;
       case b: h = (r - g) / d + 4; break;
     }

     h /= 6;
   }
   return [ h, s, l ];
 }

 function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}


function filtroSaturacion(){

	restablecerimg(imgRespaldo);
	imageData = ctx.getImageData(0,0,c.width,c.height);
	var valor = parseInt(document.getElementById("sat-gradient").value);
   for(y=desdeh; y<maxh; y++){
    for(x=desdew; x<maxw; x++){
       var pixr= getRed(imageData,x,y);
	   var pixg= getGreen(imageData,x,y);
	   var pixb= getBlue(imageData,x,y);

		var hsl = rgbToHsl(pixr,pixg,pixb);
        hsl[1] =  valor;
        var rgb = hslToRgb(hsl[0],hsl[1],hsl[2]);
          setPixel(imageData,x,y,rgb[0],rgb[1],rgb[2],255);
        }
      }
      ctx.putImageData(imageData,0,0);
}

function aplicarMatriz(matrix,suma){
  restablecerimg(imgRespaldo);
  imageData = ctx.getImageData(0,0,c.width,c.height);
  var newImageData = ctx.createImageData(c.width,c.height);

   for(y=desdeh+1; y<maxh-1; y++){
     for(x=desdew+1; x<maxw-1; x++){
      var r= Math.floor(( getRed(imageData,x-1,y-1)*matrix[0][0] + getRed(imageData,x,y-1)*matrix[0][1] + getRed(imageData,x+1,y-1)*matrix[0][2] +
                getRed(imageData,x-1,y)*matrix[1][0] + getRed(imageData,x,y)*matrix[1][1] + getRed(imageData,x+1,y)*matrix[1][2] +
                getRed(imageData,x-1,y+1)*matrix[2][0] + getRed(imageData,x,y-1)*matrix[2][1] + getRed(imageData,x+1,y+1)*matrix[2][2])/suma);
        var b= Math.floor(( getBlue(imageData,x-1,y-1)*matrix[0][0] + getBlue(imageData,x,y-1)*matrix[0][1] + getBlue(imageData,x+1,y-1)*matrix[0][2] +
                 getBlue(imageData,x-1,y)*matrix[1][0] + getBlue(imageData,x,y)*matrix[1][1] + getBlue(imageData,x+1,y)*matrix[1][2] +
                 getBlue(imageData,x-1,y+1)*matrix[2][0] + getBlue(imageData,x,y-1)*matrix[2][1] + getBlue(imageData,x+1,y+1)*matrix[2][2])/suma);
       var g= Math.floor(( getGreen(imageData,x-1,y-1)*matrix[0][0] + getGreen(imageData,x,y-1)*matrix[0][1] + getGreen(imageData,x+1,y-1)*matrix[0][2] +
                getGreen(imageData,x-1,y)*matrix[1][0] + getGreen(imageData,x,y)*matrix[1][1] + getGreen(imageData,x+1,y)*matrix[1][2] +
                getGreen(imageData,x-1,y+1)*matrix[2][0] + getGreen(imageData,x,y-1)*matrix[2][1] + getGreen(imageData,x+1,y+1)*matrix[2][2])/suma);



        setPixel(newImageData,x,y,r,g,b,255);
      }
    }
  ctx.putImageData(newImageData,0,0);
}

function filtroBlur(){
  restablecerimg(imgRespaldo);
  var matriz=[[1,1,1],[1,1,1],[1,1,1]];
  aplicarMatriz(matriz,9);
}

function filtroSuavizado(){
  restablecerimg(imgRespaldo);
  var matriz=[[1,1,1],[1,8,1],[1,1,1]];
  aplicarMatriz(matriz,16);
}

function filtroBordes(){
  restablecerimg(imgRespaldo);
  var matriz=[[-1,0,1],[-1,1,1],[-1,0,1]];
  aplicarMatriz(matriz,9);
}


var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = c.toDataURL('image/png');
    button.href = dataURL;
});
