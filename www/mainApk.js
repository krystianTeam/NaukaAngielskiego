
var dbRef = undefined;
var Apk = {}; 
var dbWords = undefined; 




$(function () {






   
    Apk.user = {};
    Apk.user.email = undefined;
    Apk.user.password = undefined; 
    Apk.user.validPassword = false; 
    Apk.user.isLogin = false;
    Apk.user.id = undefined; 
    Apk.user.nick = undefined; 
    Apk.user.level = undefined;
    Apk.user.pointGame = undefined; 
    dbRef = firebase.database().ref();
    dbWords = dbRef.child("words");


    function resetInputFiled(){
      $("#loginNew").val("");
        $("#passwordNew").val("");
         $("#emailNew").val("");
       $("#nick").val("");
        $("#slider-1").val("");
        $("#login").val("");
        $("#password").val("");

    }


    function resetApUser(){
        Apk.user = {};
        Apk.user.email = undefined;
        Apk.user.password = undefined; 
        Apk.user.validPassword = false; 
        Apk.user.isLogin = false;
        Apk.user.id = undefined; 
        Apk.user.nick = undefined; 
        Apk.user.level = undefined;
        Apk.user.pointGame = 0; 
    }

    $("#foo").on("pagebeforeshow", function() {
        console.log("UWAGA");
        if(Apk.user.isLogin === true) {//login condition
            $.mobile.changePage("#dupa");
        }
    });


    $("#wyloguj").on("click", function(){
        var auth = firebase.auth();
        var promise = firebase.auth().signOut();

        promise.then(function(){

            Apk.user.id = undefined;
            Apk.user.isLogin = false; 
            Apk.user.nick = undefined;
            

            console.log("wylogowano"); 
            $("#foo").off("pagebeforeshow");
            
            $.mobile.navigate("#foo");
            
            
        });
        resetInputFiled(); 

    })


    $("#rejsetrujNowy").on("click", function(){

        Apk.user.email = $("#loginNew").val();
        Apk.user.password = $("#passwordNew").val();
        Apk.user.email = $("#emailNew").val();
        Apk.user.nick = $("#nick").val();
        Apk.user.level = $("#slider-1").val(); 

        console.log(Apk.user.password.length); 
        console.log(Apk.user.validPassword);
        console.log(Apk.user.nick);
        console.log(Apk.user.level);
        console.log(Apk.user.email);

       if( Apk.user.isLogin === false ){

        var auth = firebase.auth();
        var promise =  firebase.auth().createUserWithEmailAndPassword(Apk.user.email, Apk.user.password);
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // ...
          //});

          promise.then(function(user){
            
           
                firebase.database().ref('users/' + user.uid).set({
                  username: Apk.user.nick,
                  email: Apk.user.email,
                  level: Apk.user.level,
                  //points: Apk.user.pointGame

                });
              Apk.user.isLogin = true; 
              

        });
        promise.catch(function (e) {
            console.log("Error Rejstracji  :" + e.message); 
        }); 
        resetInputFiled(); 
}})



    $("#zaloguj").on("click", function(){
        //tutaj obsluga firebase;
        //po zalogowaniu ustawic flage user.isLogin na tru; 
        //dolozyc obsluge bledow
        
        
        
         
        Apk.user.email = $("#login").val();
        Apk.user.password = $("#password").val();
        console.log(Apk.user.password.length); 
        console.log(Apk.user.validPassword);
        
        if(Apk.user.email.length > 0 ){
        
            var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!filter.test(Apk.user.email)) {
                alert('Prosze wprowadź prawidłowy adres email');
                $("#login").focus();
                //return false;
            }else{
                Apk.user.isLogin = true; 
                console.log("Podałeś prawidłowy adres  :" + Apk.user.email );
            }



        }else{
            alert("Pole z adresem jest puste"); 
            $("#login").focus();

        }

        if(Apk.user.password.length <= 0 || Apk.user.password === undefined){
            alert("Pole z hasłem jest puste, wprowadź hasło ponownie"); 
            $("#password").focus();
        }else{
            Apk.user.validPassword = true; 
            console.log("Hasło Prawidłowe :  " + Apk.user.password)
            
        }
    
        
    

        if(Apk.user.isLogin === true && Apk.user.validPassword === true){


            var auth = firebase.auth();
            var promise = firebase.auth().signInWithEmailAndPassword(Apk.user.email, Apk.user.password);
            var userUser = undefined; 

            promise.then(function(user){

                Apk.user.id = user.uid; 

                console.log(Apk.user.id); 


                var rootRef = firebase.database().ref("users/"+user.uid);
               
                rootRef.once("value").then(function(snapshot) {
                        var log = snapshot.val();
                       $("#greatingUser").html("Witaj " + log.username); 
                console.log(log);
                });

                

               // $("#foo").attr("id", "bad");
               Apk.user.isLogin = true;
                $.mobile.navigate("#dupa")
                 
                console.log(Apk.user.isLogin); 
                //Apk.user.id = user.G; 

                

                
                
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

    
});


