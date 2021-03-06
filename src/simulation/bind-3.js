/**
 * bind可以改变this指向
 * bind返回一个函数
 * bind返回的函数可以作为构造函数使用
 */
Function.prototype.bind = function(){
    var args = Array.prototype.slice.call(arguments);
    
    var this_obj = args.shift();

    var _this = this;

    function VirtualProto(){}
    VirtualProto.prototype = _this.prototype;
    VirtualBind.prototype = new VirtualProto();
    
    function VirtualBind(){
        var real = null;

        if(this instanceof _this){
            real = this;
        }else{
            real = this_obj;
        }

        var fn_body = `
            var str = '';
            var len = args.length;
            for(var i = 0; i < len; i++){
                if(i === len - 1){
                    str += args[i];
                }else{
                    str += args[i] + ',';
                }
            }

            console.log(this, real_obj);
            real_fn.call(real_obj, str)
        `;

        var fn = new Function('real_fn', 'real_obj', 'args', fn_body);

        return fn(_this, real, args);
    }

    return VirtualBind;
};