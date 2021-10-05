function Touch(options){
    this.id = options.id || alert("缺少“ID”");

    var startx, starty;
 
    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
  
    //根据起点终点返回方向 1向上滑动 2向下滑动 3向左滑动 4向右滑动 0点击事件
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
  
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
  
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
            return result;
    }
  
    //手指接触屏幕
    this.id.addEventListener("touchstart", function(e){
     startx = e.touches[0].pageX;
     starty = e.touches[0].pageY;
    }, false);
  
 //手指离开屏幕
 var status = true;
    this.id.addEventListener("touchend", function(e) {
     var endx, endy;
     endx = e.changedTouches[0].pageX;
     endy = e.changedTouches[0].pageY;
     var direction = getDirection(startx, starty, endx, endy);
     var that = this;

     switch (direction) {
         case 3:
             if( status == true ){
                status = false;
                var timeId = setInterval(function(){
                    if(that.offsetLeft <= -550){
                        clearInterval(timeId);
                        status = true;
                    } else {
                        that.style.marginLeft = that.offsetLeft -10 +'px';
                    };
                 },500 / 100);
             }
             break;
         case 4:
             console.log(status);
             if( status == true ){
                status = false;
                var timeId2 = setInterval(function(){
                   if(that.offsetLeft >= 0){
                       clearInterval(timeId2);
                       status = true;
                   } else {
                        that.style.marginLeft = that.offsetLeft + 10 +'px';
                    };
                },500 / 100);
             }
             break;
         }
    }, false);
}