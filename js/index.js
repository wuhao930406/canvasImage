/**
 * Created by kurosaki on 2018/12/27.
 */
var c=document.getElementById("Canvas"),
    width =$(document).width(),
    height = $(document).height(),
    dfd = $.Deferred();

window.onload = function () {
    c.width = width;
    c.height = height;
    var ctx=c.getContext("2d");

    //预加载
    function preloadImg(list, imgs) {
        var def = $.Deferred(),
            len = list.length;
        $(list).each(function(i,e) {
            var img = new Image();
            img.crossOrigin = "anonymous"; //跨域请求资源
            img.onload = (function(j) {
                return function() {
                    imgs[j] = img
                    len--;
                    if(len == 0) {
                        def.resolve();
                    }
                };
            })(i);
            img.onerror = function() {
                len--;
                console.log('fail to load image');
            };
            img.src = e; // 确保缓存的图片也触发 load 事件
        });
        console.log(def.promise())
        return def.promise();
    }
    var list = ["./images/bac.jpg","./images/head.png","./images/title01.png"]
    $.when(preloadImg(list, imgs=[])).done(
        function() {
            console.log(imgs)
            dfd.done(
                DrawImage(ctx,imgs[0],{
                    x:0,
                    y:0,
                    width:width,
                    height:height
                })
            ).done(
                DrawImage(ctx,imgs[1],{
                    x:0.065*width,
                    y:24,
                    width:0.14*width,
                    height:0.14*width
                })
            ).done(
                FillText(ctx,"天使520",{
                    font:"2rem Arial",
                    x:0.205*width+16,
                    y:0.07*width+30,
                })
            ).done(
                FillText(ctx,"年度关键词",{
                    font:"2.2rem Arial",
                    x:0.205*width+16,
                    y:0.07*width+65,
                })
            ).done(
                DrawImage(ctx,imgs[2],{
                    x:0.24*width,
                    y:0.07*width+85,
                    width:0.5*width,
                    height:0.238*0.5*width,
                })
            )
        })






}

function DrawImage(ctx,img,config){
    ctx.drawImage(img, config.x, config.y,config.width,config.height);
    ctx.save(); // 保存当前ctx的状态
}

function FillText(ctx,text,textconfg){
    ctx.font=textconfg.font;
    ctx.fillText(text,textconfg.x,textconfg.y);
    ctx.save(); // 保存当前ctx的状态


}

