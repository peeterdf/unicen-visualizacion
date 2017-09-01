
function Reloj(){
  this.hr=0;
  this.min=0;
  this.seg=0;
  this.ctx=ctx;
};

 Reloj.prototype.dibujaReloj=function(){
  this.ctx.beginPath();
  this.ctx.fillStyle='white';
  this.ctx.fillRect(0,0,160,30);
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.beginPath();
  this.ctx.fillStyle='black';
  this.ctx.font="20px Fixedsys";
  var strmin=this.min;
  var strseg=this.seg;
  var strhr=this.hr;
  if(this.min<10){strmin='0'+this.min};
  if(this.seg<10){strseg='0'+this.seg};
  if(this.hr<10){strhr='0'+this.hr};
  this.ctx.fillText('Tiempo: '+strhr+':'+strmin+':'+strseg,10,20);
  this.ctx.fill();
  this.ctx.closePath();
};

  Reloj.prototype.mueveReloj=function(){
    this.seg++;
    if(this.seg==60){
      this.seg=0;
      this.min++;
      if(this.min==60){
        this.min=0;
        this.hr++
      }
    }
    this.dibujaReloj();
  }



var reloj1= new Reloj(ctx);
reloj1.dibujaReloj();
setInterval("reloj1.mueveReloj()",1000);
