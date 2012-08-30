/**
 * Created by IntelliJ IDEA.
 * User: zc
 * Date: 11-6-13
 * Time: 上午11:17
 */

zx=zx||{};

zx.canvas=function(canvas){
    if(!canvas.getContext)
    {
        Console.log("canvas not suport");
        return;
    }
    var context = this.context = canvas.getContext("2d");

};
zx.canvas.layer=function(context,zindex){
    this.context=context;
    this.zIndex=zindex;
};
