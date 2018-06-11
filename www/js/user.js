var Apk = window.Apk || {}; 

Apk.user = (function($){

    var user = {

        id:undefined,
        name: undefined,
        password:undefined,
        validPassword:false,
        email:undefined,
        isLogin:false


      
    }

    return user; 
})(jQuery);