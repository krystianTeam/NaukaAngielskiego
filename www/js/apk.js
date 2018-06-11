var Apk = window.Apk || {}; 

Apk.apk = (function($){
    
  
    
    var apk = function(){

        

      
        if( Apk.user !== undefined){
            console.log(Apk.user); 
            
        }
        
        this.init = function(){

            Apk.user.isLogin = false;
            Apk.user.password = undefined; 
            Apk.user.validPassword = false; 

            $("#splashScreen").addClass("pageActive");
            
            $("#zapraszamy").on("click", function(){

                $("#splashScreen").fadeOut( 1000, function() {
                    $(this).removeClass("pageActive");
                    $("#mainPage").addClass("pageActive");
                    $("#zapraszamy").off("click");


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
                
                
                
                 
                Apk.user.email = $("#userLogin").val();
                Apk.user.password = $("#userPassword").val();
                console.log(Apk.user.password.length); 
                console.log(Apk.user.validPassword);
                
                if(Apk.user.email.length > 0 ){
                
                    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!filter.test(Apk.user.email)) {
                        alert('Prosze wprowadź prawidłowy adres email');
                        $("#userLogin").focus();
                        //return false;
                    }else{
                        Apk.user.isLogin = true; 
                        console.log("Podałeś prawidłowy adres  :" + Apk.user.email );
                    }



                }else{
                    alert("Pole z adresem jest puste"); 
                    $("#userLogin").focus();

                }

                if(Apk.user.password.length <= 0 || Apk.user.password === undefined){
                    alert("Pole z hasłem jest puste, wprowadź hasło ponownie"); 
                    $("#userPassword").focus();
                }else{
                    Apk.user.validPassword = true; 
                    console.log("Hasło Prawidłowe :  " + Apk.user.password)
                }
            
                
            

                if(Apk.user.isLogin === true && Apk.user.validPassword === true){


                    var auth = firebase.auth();
                    var promise = firebase.auth().signInWithEmailAndPassword(Apk.user.email, Apk.user.password);

                    promise.then(function(user){

                        console.log(user); 
                        $(".page").removeClass("pageActive");
                        $("#menuPage").addClass("pageActive");
                        
                    });
                    promise.catch(function (e) {
                        //console.log(e.message); 
                        if(e.message === "The password is invalid or the user does not have a password."){
                            $("#firebaseError").html(); 
                        $("#firebaseError").html("Hasło jest nieprawidłowe lub urzytkownik nie posiada hasła");
                        }
                        if(e.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                            $("#firebaseError").html();
                            $("#firebaseError").html("Podany użytkownik " + Apk.user.email + " nie istnieje lub został usuniety");
                            }

                       
                    })
                     


                    
                }

            })


            //obsługa Dodawania nowego uzytkownika, rejstracji
            $("#registerBtn").on("click", function(){

                Apk.user.email = $("#userLogin").val();
                Apk.user.password = $("#userPassword").val();

                if(Apk.user.email.length > 0 ){
                
                    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!filter.test(Apk.user.email)) {
                        alert('Prosze wprowadź prawidłowy adres email');
                        $("#userLogin").focus();
                        //return false;
                    }else{
                        Apk.user.isLogin = true; 
                        console.log("Podałeś prawidłowy adres  :" + Apk.user.email );
                    }



                }else{
                    alert("Pole z adresem jest puste"); 
                    $("#userLogin").focus();

                }

                if(Apk.user.password.length <= 0 || Apk.user.password === undefined){
                    alert("Pole z hasłem jest puste, wprowadź hasło ponownie"); 
                    $("#userPassword").focus();
                }else{
                    Apk.user.validPassword = true; 
                    console.log("Hasło Prawidłowe :  " + Apk.user.password)
                }
            
                
            

                if(Apk.user.isLogin === true && Apk.user.validPassword === true){
                   

                    var auth = firebase.auth();
                    var promise = firebase.auth().createUserWithEmailAndPassword(Apk.user.email, Apk.user.password);

                    promise.then(function(user){

                        
                        $(".page").removeClass("pageActive");
                        $("#menuPage").addClass("pageActive");
                        
                    });
                    promise.catch(function (e) {
                        //console.log(e.message); 
                        
                            $("#firebaseError").html(); 
                        $("#firebaseError").html(e.message);
                        
                       

                       
                    })

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