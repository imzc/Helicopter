/**
 * Created by IntelliJ IDEA.
 * User: zc
 * Date: 11-6-29
 * Time: 下午2:07
 */
var zx = zx || {};
zx.color=function(r,g,b,a){
    r = r ==undefined?0:parseInt(r)%256;
    g = g ==undefined?0:parseInt(g)%256;
    b = b ==undefined?0:parseInt(b)%256;

    if(a == undefined)
        return "rgb("+r+","+g+","+b+")";
    a = parseFloat(a);
    return "rgba("+r+","+g+","+b+","+a+")";
};
zx.GameState = {
    start:0,
    running:1,
    pause:2,
    over:4
};
zx.random = function(min, max)
{
    if (max < min)
        max = min + 1;
    var r = Math.random() * (max - min) + min;
    return parseInt(r.toString());
};

zx.checkEdge = function (rect1, rect2) {
    if (rect1.p)
        rect1 = {
            x1: rect1.p.x,
            y1: rect1.p.y,
            x2: rect1.p.x + rect1.width,
            y2: rect1.p.y + rect1.height
        };
        if (rect2.p) {
            rect2 = {
                x1: rect2.p.x,
                y1: rect2.p.y,
                x2: rect2.p.x + rect2.width,
                y2: rect2.p.y + rect2.height
            };
    }
    var pInRect = function (p, r) {
        return p.x > r.x1 && p.y > r.y1 && p.x < r.x2 && p.y < r.y2;
    }
    var r2InR = function (r, r2) {
        var leftTop = { x: r2.x1, y: r2.y1 };
        var rightTop = { x: r2.x2, y: r2.y1 };
        var leftBottom = { x: r2.x1, y: r2.y2 };
        var rightBottom = { x: r2.x2, y: r2.y2 };
        return pInRect(leftBottom, r) ||
        pInRect(leftTop, r) ||
        pInRect(rightTop, r) ||
        pInRect(rightBottom, r);
    };
    return r2InR(rect1, rect2) || r2InR(rect2, rect1);
};

zx.Game = function (context, options) {
    var GAME = this;
    options.fps = options.fps || 30;
    GAME.options = options;
    GAME.context = context;
    GAME.time = null;


    GAME.State = zx.GameState.start;


    this.timeGetter = function () {
        if (GAME.time == null) {
            GAME.time = new Date().getTime();
            return 0;
        }
        var t = (new Date().getTime()) - GAME.time;
        return t;
    };
    this.life = function (context, time) { };
    this.start = function () {
        GAME.time = new Date().getTime();
        GAME.run();
    };
    this.run = function () {
        var f_start = GAME.timeGetter();
        GAME.life(context, f_start);

        if (GAME.State == zx.GameState.pause) {
            return;
        }
        else if (GAME.State == zx.GameState.over) {
            return;
        }

        var f_end = GAME.timeGetter();
        var f_timespan = 1000 / GAME.options.fps;
        var time_spend = f_end - f_start;
        if (time_spend > f_timespan) {
            GAME.run();
        } else {
            setTimeout(GAME.run, f_timespan - time_spend);
        }
    };
    this.over = function () {
        GAME.State = zx.GameState.over;
        if (GAME.onOver)
            GAME.onOver(GAME.context);
    }
};
//Game Element Base
zx.Element = function()
{
    var SELF = this;
    this.p = {
        x:0,
        y:0
    };
    this.width=1;
    this.height=1;
    this.color = "rgb(255,255,255)";
    this.v = {
        x:0,
        y:0
    };
    this.a=zx.physic.G;
};
zx.Element.prototype.draw = function(ctx)
{
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.p.x-this.width/2, this.p.y-this.width/2, this.width/2, 0, 2 * Math.PI, true);
    ctx.fill();
};
zx.Element.prototype.update=function(ctx,time,timespan){
    this.v = zx.physic.getVbyA_t(this.a,timespan,this.v);
    this.p=zx.physic.getPbyA_V_t(this.a,this.v,timespan,this.p);
};