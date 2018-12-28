/**
 * Created by kurosaki on 2018/12/27.
 */
var c=document.getElementById("Canvas"),
    width =$(document).width(),
    height = $(document).height()>width/0.615+40?$(document).height():width/0.615+40,
    dfd = $.Deferred(),
    getDevicePixelRatio = function (){
        return window.devicePixelRatio || 1;
    },
    pixelTatio = getDevicePixelRatio();

    $(".container").css({height:height});
    $("#hideText").css({top:0.856*width+120})
window.onload = function () {
    c.style.width = width + "px";
    c.style.height = height +"px";
    c.width = width * pixelTatio;
    c.height = height * pixelTatio;

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
    var list = ["./images/bac.jpg",window.config.headimg,"./images/title01.png","./images/centerimg.png","./images/text.png","./images/qrcode.png"]
    $.when(preloadImg(list, imgs=[])).done(
        function() {
            console.log(imgs)
            dfd.done(
                DrawImage(ctx,imgs[0],{
                    x:0,
                    y:0,
                    width:width* pixelTatio,
                    height:height* pixelTatio
                })
            ).done(
                DrawImage(ctx,imgs[1],{
                    x:(0.065*width)* pixelTatio,
                    y:24* pixelTatio,
                    width:(0.14*width)* pixelTatio,
                    height:(0.14*width)* pixelTatio
                })
            ).done(
                FillText(ctx,window.config.nickname,{
                    font:""+1.6* pixelTatio+"rem microsoft yahei",
                    x:(0.205*width+16)* pixelTatio,
                    y:(0.07*width+30)* pixelTatio,
                })
            ).done(
                FillText(ctx,"年度关键词",{
                    font:""+1.8* pixelTatio+"rem microsoft yahei",
                    x:(0.205*width+16)* pixelTatio,
                    y:(0.07*width+65)* pixelTatio,
                })
            ).done(
                DrawImage(ctx,imgs[2],{
                    x:(0.24*width)* pixelTatio,
                    y:(0.07*width+85)* pixelTatio,
                    width:(0.5*width)* pixelTatio,
                    height:(0.238*0.5*width)* pixelTatio,
                })
            ).done(
                DrawImage(ctx,imgs[3],{
                    x:(0.09*width)* pixelTatio,
                    y:(0.2*width+90)* pixelTatio,
                    width:(0.82*width)* pixelTatio,
                    height:(0.8*0.82*width)* pixelTatio,
                })
            ).done(
                ToDrawMain(ctx)
            ).done(
                DrawImage(ctx,imgs[4],{
                    x:(0.085*width)* pixelTatio,
                    y:(width+110)* pixelTatio,
                    width:(0.52*width)* pixelTatio,
                    height:(0.325*0.52*width)* pixelTatio,
                })
            ).done(
                DrawImage(ctx,imgs[5],{
                    x:(0.631*width)* pixelTatio,
                    y:(0.856*width+110)* pixelTatio,
                    width:(0.296*width)* pixelTatio,
                    height:(0.296*width*1.07)* pixelTatio,
                })
            ).done(
                $("#copy").attr("src",c.toDataURL("image/png"))
            ).done(
            )
        })
}


function ToDrawMain(ctx){
    var txt = window.config.description,
        html = convertText(txt);
    $("#hideText").html(html);
    drawText(ctx);
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


function convertText(txt) {
    var html = txt.replace(/(\S)/ig, '<span>$1</span>');
    html = html.replace(/\n|\r/ig, '<br>');
    html = html.replace(/\s/ig, ' ');
    return html;
}
function drawText (ctx) {//绘制文本
    ctx.font = ''+1.2*pixelTatio+'rem microsoft yahei';
    ctx.textAlign = 'conter';
    ctx.textBaseline = "top";
    ctx.fillStyle = '#006871';
    $.each($("#hideText span"), function (i, item) {
        var pos = $(item).position();
        var txt = $(item).text();
        ctx.fillText(txt, (pos.left+0.1*width)* pixelTatio, (0.856*width+105+pos.top)*pixelTatio);
    });
}
/*显示/隐藏*/
function showImage(){
    $(".imgcontain").fadeIn(200);
    $(".result").animate({marginTop:24},600)
}

function hideImage(){
    $(".result").animate({marginTop:-5000},200)
    $(".imgcontain").fadeOut(600);
}

