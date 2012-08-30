/**
 * Created by IntelliJ IDEA.
 * User: zc
 * Date: 11-7-14
 * Time: 下午3:56
 */
var zx = zx || {};
zx.physic = {
    G:{x:0,y:100},
    getVbyA_t:function(a, t, v)
    {
        v = v || {x:0,y:0};
        a = a || {x:0,y:zx.physic.G};
        t = t || 0;
        return {
            x:v.x + a.x * t,
            y:v.y + a.y * t
        };
    },
    getPbyV_t:function(v, t, p)
    {
        v = v || 0;
        t = t || 0;
        p = p || {x:0,y:0};
        return {
            x:p.x + v.x * t,
            y:p.y + v.y * t
        };
    },
    getPbyA_t:function(a, t, p)
    {
        a = a || {x:0,y:zx.physic.G};
        t = t || 0;
        p = p || {x:0,y:0};
        return {
            x:p.x + a.x * t * t / 2,
            y:p.y + a.y * t * t / 2
        };
    },
    getPbyA_V_t:function(a, v, t, p)
    {
        a = a || {x:0,y:zx.physic.G};
        t = t || 0;
        p = p || {x:0,y:0};
        return {
            x:p.x + a.x * t * t / 2 + v.x * t,
            y:p.y + a.y * t * t / 2 + v.y * t
        };
    }
};