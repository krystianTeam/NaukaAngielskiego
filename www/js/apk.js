var Apk = window.Apk || {}; 

Apk.apk = (function($){
    
  
    
    var apk = function(){

        

        user.isLogin = false; 
        
        this.init = function(){

            $("#splashScreen").addClass("pageActive");
            
            $("#splashBtn").on("click", function(){

                $("#splashScreen").fadeOut( 1000, function() {
                    $(this).removeClass("pageActive");
                    $("#mainPage").addClass("pageActive");
                    $("#splashBtn").off("click");


                });
            })
            
            

            $("#infoBtn").on("click", function(){
                                                     
                $(".page").removeClass("pageActive");
                $("#infoPage").addClass("pageActive");
            });

            $("#literkiBtn").on("click", function(){
                                                     
                $(".page").removeClass("pageActive");
                $("#literkiPage").addClass("pageActive");
            });
            
            $("#nieregularneBtn").on("click", function(){
                                                     
                $(".page").removeClass("pageActive");
                $("#nieregularnePage").addClass("pageActive");
            });

            $("#translatorBtn").on("click", function(){
                                                     
                $(".page").removeClass("pageActive");
                $("#translatorPage").addClass("pageActive");
            });

            $("#filmyBtn").on("click", function(){
                                                     
                $(".page").removeClass("pageActive");
                $("#filmyPage").addClass("pageActive");
            });

            $("#ocenBtn").on("click", function(){
                                                     
                $(".page").removeClass("pageActive");
                $("#ocenPage").addClass("pageActive");
            });

            $("#wylogujBtn").on("click", function(){
                    //dodac obsluge wyloguj
                    alert("ZARAZ WYBUCHNIE");
            })
         
            $("#loginBtn").on("click", function(){
                //tutaj obsluga firebase;
                //po zalogowaniu ustawic flage user.isLogin na tru; 
                //dolozyc obsluge bledow
                user.isLogin = true; 
                user.name = $("#email").html();
                
            

                if(user.isLogin){
                    $(".page").removeClass("pageActive");
                    $("#menuPage").addClass("pageActive");
                }else{
                    alert("Nieprawidlowy login");
                    //tutaj napisac jestes nie zalogowany , zaloguj sie, wyswietl blad
                }
            })
            
            $(".menuBtn").on("click", function(){
                $(".page").removeClass("pageActive");
                $("#menuPage").addClass("pageActive");
            })
            
        };


        this.showScreen = function(screenId){

        }



        this.showScreen = function(screenId){

        }

        
    }
    return apk; 
})(jQuery);