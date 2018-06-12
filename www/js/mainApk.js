

var dbRef = undefined;

var Apk = {}; 
Apk.user = {}; 
Apk.version = 1.0;//last 1.2
var dbWords = undefined; 
var lastWord = undefined; 
var newWord = undefined; 

document.addEventListener("deviceready", deviceReadyGO, false);

document.addEventListener("backbutton", onBackKeyDown, false); 
document.addEventListener("online", onOnline, false);


document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);





function onOffline() {
    
 
    alert("Uwaga aplikacja działa w trybie OffLine , spradwź połączenie z internetem"); 
    if(Apk.user.isOnline === true){
    Apk.user.isOnline = false; 
    }

}




// check if online/offline
// http://www.kirupa.com/html5/check_if_internet_connection_exists_in_javascript.htm



function onBackKeyDown(e){
   // e.preventDefault();
    //alert("back buton pressed");
    //alert('Backbutton key pressed');
        //console.log('Backbutton key pressed');
        exitAppPopup();
       
   // navigator.appCodeName.exitApp(); 
}
function deviceReadyGO(){
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    alert("Nauka Angielskiego versja : " + Apk.version); 
    //alert("Jestem gotowy"); 
    //console.log("dzialam"); 

    //document.addEventListener("resume", function(){
       //alert("wychodizsz z aplikacji zapisać ? ")
    //}, true);
}
    
function onOnline() {
    
      
      alert("Wykryto połączenie z siecią , aplikacja działa w trybie Online");
      if(Apk.user.isOnline === false){ 
      Apk.user.isOnline = true; 

      location.reload();
      }
      //alert(Apk.user.isOnline); 
}

function ConfirmExit(stat){
    //alert("Inside ConfirmExit");
    if(stat == "1"){
        navigator.app.exitApp();
    }else{
        return;
    };
};

function zalogowac(stat){
    if(stat == "1"){
        $("#firebaseError").html();
        $("#firebaseError").html("Dziękujemy za rejstracje, możesz się teraz zalogować na swoje konto ");
        $.mobile.navigate("#foo");
    }else{
        return;
    };
}

function exitAppPopup() {
    navigator.notification.confirm(
        "Czy na pewno chcesz wyjść z aplikacji ?", 
        function(buttonIndex){
            ConfirmExit(buttonIndex);
        }, 
        "Confirmation", 
        "Tak,Nie"
    ); 
   // alert("Outside Notification"); 
    //return false;
};

function afterRegister() {

    //$.mobile.navigate("#foo");
    $( "#dialogPoRejstracji" ).popup( "open" );
    //navigator.notification.confirm(
        //"Gratulujemy udało Ci się zarejestrować, musisz sie zalogować aby korzystać z aplikacji, wybierz tak aby przejśc do strony logowania", 
       // function(buttonIndex){
            //zalogowac(buttonIndex);
        //}, 
        //"Confirmation", 
        //"Tak,Nie"
    //); 
   // alert("Outside Notification"); 
    //return false;
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function czasownikiInit(){
    $("#czasownikNieregularny").val(""); 
    $("#sprCzasownika").html("");
    let table = []; 
    var czasowniki = firebase.database().ref('nieregularne'); 
    
  
    czasowniki.once("value").then(function(snapshot) {
        let ile = snapshot.numChildren();
        let log = snapshot.val();
        let key = Object.keys(log);
        let rnd = getRandomInt(0,32); 
        console.log(key); 
        //key = key.toString();
        //table = key.split(","); 
        let r = key[rnd];
        let rr = getRandomInt(0,2); 

        $("#pytanie").html("");
        $("#pytanie").html(r);
        $("#lebelPytanie").html(""); 
        $("#lebelPytanie").html("Wpisz czasownik: " + r + " w " + (rr+1) + " formie:"); 
        let pytanie = firebase.database().ref('nieregularne/' + r); 
        pytanie.once("value").then(function(snapshot) {
            let va = snapshot; 
            console.log(va["node_"]["value_"]); 
            table = va["node_"]["value_"].toString();
            console.log(table); 
            table = table.split(",");
            console.log(table); 
            $("#sprawdzForme").on("click", function(){
                console.log("sprawdx test"); 
         
                    $("#sprCzasownika").html("");
                    let corect = table[rr]; 
                    let czasUser = $("#czasownikNieregularny").val(); 
                    czasUser = czasUser.toLowerCase(); 
                    if(corect === czasUser){
                    $("#sprCzasownika").html("Brawo , poprawna odpowiedź ");
                    }else{
                        $("#sprCzasownika").html("Źle, prawidłowa forma to:  " + corect);
                    }
                
            })

        })
        
        
        
    })
}


$(function () {

    

    
    slowkaInit(); 
    czasownikiInit()

    //$(document).on("pagebeforeshow", function() {
       // window.location = "#foo";
    //});

    $("#bar").on("pagebeforeshow", function() {
      $("#firebaseErrorRegister").html(""); 
    });
  
    $("#nextCzasownik").on("click", function(){
        czasownikiInit()

    })
    //WYŁACZYC DO TESTÓW ------------------------------------------------------------------------

   $(window).on('load', function(){
        $("#firebaseError").html();
        window.location = "#foo";
    });

    //---------------------------------------------------------------------------------------------
    

    

   
    Apk.user = {};
    Apk.user.email = undefined;
    Apk.user.password = undefined; 
    Apk.user.validPassword = false; 
    Apk.user.isLogin = false;
    Apk.user.id = undefined; 
    Apk.user.isOnline = undefined; 
    
    
    Apk.user.nick = undefined; 
    Apk.user.isMobile =  ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
    Apk.user.level = undefined;
    Apk.user.pointGame = undefined; 
    dbRef = firebase.database().ref();
    dbWords = dbRef.child("words");
    Apk.user.words = []; 


    function resetInputFiled(){
      $("#loginNew").val("");
        $("#passwordNew").val("");
         $("#emailNew").val("");
       $("#nick").val("");
        $("#slider-1").val("");
        $("#login").val("");
        $("#password").val("");
        $("#confirmPasswordNew").val("");
        $("#password").val("");
        $("#firebaseErrorRegister").html("");
        $("#firebaseError").html("");

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

    //$("#foo").on("pagebeforeshow", function() {
        //console.log("UWAGA");
       // if(Apk.user.isLogin === true) {//login condition
          //  $.mobile.changePage("#dupa");
        //}
    //});

    $("#bar").on("pagebeforeshow", function(){
        $("#firebaseError").html("");
    });

   


    

    $("#slowka").on("pagebeforeshow", function(){
        $("#gameUser").html("");
        $("#gameUser").html("Użytkownik : " + Apk.user.nick);
        $("#gamePoint").html("");
        $("#gamePoint").html(Apk.user.pointGame || 0);
        $("#gameLevel").html("");
        $("#gameLevel").html("Poziom : " + Apk.user.level);
        

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
            $("#firebaseErrorRegister").html();
            
            
        });

        

        resetInputFiled(); 
        

    })


    $("#rejsetrujNowy").on("click", function(){

        Apk.user.email = $("#loginNew").val();
        Apk.user.password = $("#passwordNew").val();
        Apk.user.email = $("#emailNew").val();
        Apk.user.nick = $("#nick").val();
        Apk.user.level = $("#slider-1").val(); 
        let confirmPassword = $("#confirmPasswordNew").val(); 
        Apk.user.isOnlinePc = CheckIfUserIsOnline(); 

        console.log(Apk.user.password.length); 
        console.log(Apk.user.validPassword);
        console.log(Apk.user.nick);
        console.log(Apk.user.level);
        console.log(Apk.user.email);

        if(Apk.user.isOnlinePc === false){
            $( "#isOnlineError" ).popup( "open" );
            //alert("wykryto brak połączenia z internetem, rejstracja niemożliwa");
            return; 

        }

        if(Apk.user.nick === undefined || Apk.user.nick === null || Apk.user.nick.length === 0){
            $("#firebaseErrorRegister").html("Pole z Pseudonimem nie moze być puste ");
            $("#nick").focus();
        }

        if(Apk.user.password !== confirmPassword ){
            $("#firebaseErrorRegister").html();
            $("#firebaseErrorRegister").html("Podane hasła nie są identyczne ");
            $("#confirmPasswordNew").focus();
        }
        if(Apk.user.password.length<6 ){
            $("#firebaseErrorRegister").html();
            $("#firebaseErrorRegister").html("Hasło musi zawierać minimum 6 znaków ");
            $("#PasswordNew").focus();
        }


       if(Apk.user.isOnlinePc === true &&  Apk.user.isLogin === false && Apk.user.nick.length > 0 && Apk.user.password.length >=6 && Apk.user.password === confirmPassword ){

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
                  level: 1,
                  pointGame : 100,
                  //points: Apk.user.pointGame

                });

                //Apk.user.pointGame = 100;
                


                /*firebase.database().ref('words' ).set({
                   level: [{roślina:"kwiat"}, {roślina:"drzewo"}, {roślina:"pomidor"}, {roślina:"banan"}, {roślina:"jabłko"},
                    {przedmiot:"nóż"},
                    {przedmiot:"młotek"},
                    {przedmiot: "lustro"},
                    {zwierze:"pies"},
                    {zwierze:"kot"},
                    {zwierze: "krowa"},
                    {zwierze: "słoń"}
                
                ]
                    //points: Apk.user.pointGame
  
                  });*/
              //Apk.user.isLogin = true; 
              resetInputFiled(); 
              afterRegister(); 

        });
        promise.catch(function (e) {

            if(e.message === "The email address is badly formatted."){

                $("#firebaseErrorRegister").html();
                $("#firebaseErrorRegister").html("Wprowadź poprawny adres email np. test@test.com");
                $("#emailNew").focus();
            }
            if(e.message === "The password must be 6 characters long or more."){
                $("#firebaseErrorRegister").html();
                $("#firebaseErrorRegister").html("Hasło musi zawierać minimum 6 lub więcej znaków");
                $("#passwordNew").focus();
            }
            if(e.message === "The email address is already in use by another account."){
                $("#firebaseErrorRegister").html();
                $("#firebaseErrorRegister").html("Podany adres mailowy jest już zajęty przez innego użytkownika");
                $("#emailNew").focus();
            }
            
            
           

        }); 
        
    }

})


    

        //let rootRef2 = firebase.database().ref("words/level/"+Apk.user.level);
        //rootRef2.once("value").then(function(snapshot) {
            //let log = snapshot.val();
            //console.log(log.roślina);
        
        
        //let tempWord = $("#szukaneSlowo").val(log.roślina); 
       // }); 

        //.button('refresh')

        $("#goTranslate").on("click", function(){
            let odpowiedz ; 
            let naJakiJezyk =  $('input[name=radio-choice-t-6]:checked').val();
            let url = ""; 
           
            let tekst = $("#textarea-1").val(); 
            
            if(naJakiJezyk === "on"){
                url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + "pl"+ "&tl=" + "en" + "&dt=t&q=" + tekst;
                
            }
            if(naJakiJezyk === "off"){
                
                url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + "en"+ "&tl=" + "pl" + "&dt=t&q=" + tekst;
            }

            $.get( url, function( data ) {
        
                let text = data; 
                //console.log(typeof text); 
                //$("#wraper").html(text[0][0][0].toString());
            
              odpowiedz = text[0][0][0].toString();
              $("#textarea-2").val(odpowiedz); 
              $("#textarea-2").focus();  

          
        })
    })

    $("#zerujTeksty").on("click", function(){
        $("#textarea-1").val(""); 
        $("#textarea-2").val(""); 
    })


        $("#btnSzukaj").on("click", function(){

            
            $("#szukaneSlowoError").html("");
            $("#literki").off('click', '*'); 
            $("#literki").empty(); 
            $("#wynik").html(""); 

            wynik = ""; 
            let tempWord = $("#szukaneSlowo").val(); 
            lastWord = newWord; 
            newWord = tempWord; 
        
            if(  tempWord === undefined || tempWord === null || tempWord === ""){

                $("#szukaneSlowoError").html();
                
                $("#szukaneSlowoError").html("Nieprawidłowy badź puste pole z szukanym słowem ");
                console.log("zle slowo"); 
                return; 
            }
        
            let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + "pl"+ "&tl=" + "en" + "&dt=t&q=" + tempWord;
            //alert(tempWord); 
            $.get( url, function( data ) {
        
                let text = data; 
                //console.log(typeof text); 
                //$("#wraper").html(text[0][0][0].toString());
            
              tabZnakow = text[0][0][0].toString();
              let testIstnienia = text[0][0][1]; 
              console.log("Słowo  " + tabZnakow + " istnieje ? : "+  (testIstnienia !== tabZnakow)); 
              if(testIstnienia === tabZnakow){
                  $("#szukaneSlowoError").html("PODANE SŁOWO NIE ISTNIEJE ");
                  $("#szukaneSlowo").val("");
                  $("#szukaneSlowo").focus();  
                  return; 

              }
                var tab= tabZnakow.split('');
                console.log(tab);
                var rantab = shuffle(tab);
                console.log(rantab);
                $("#literki").html("");
                for(let i = 0; i< rantab.length; i++){
                var button = $("<button>"+rantab[i].toLowerCase()+"</button>");
                
                $(button).addClass("ui-btn ui-btn-inline");
                
                $("#literki").append(button).trigger('create');
                console.log("Bledy 1");
                
                
                
                }

                $("#literki").on('click', '*', function() {
                    leter = ($(this).html());
                    console.log(leter); 
                      wynik = $("#wynik").html();
                      console.log(wynik); 
                      wynik = (wynik + leter);
                      console.log(wynik); 
                      wynik = wynik.toUpperCase();
                      $("#wynik").html(wynik);
                      $(this).attr("disabled", true);
                      let upTabZnakow = tabZnakow.toUpperCase(); 
                      
                      if(wynik === upTabZnakow){
                          console.log("BRAWOOOOOO PRAWIDŁOWA ODPOWEIDZs");
                          var corIkon =  $("<button>"+"PRAWIDŁOWA ODPOWIEDŹ" + "</button>");
                          $(corIkon).addClass("ui-btn ui-shadow ui-corner-all ui-icon-check ui-btn-icon-notext ui-btn-icon-right"); 
                          $("#wynik").append(corIkon).trigger('create'); 
                          leter = ""; 
                          $("#literki").off('click', '*'); 

                          if(newWord === lastWord){
                              alert("Nie ma Punktów za te same słowa")
                          }else{
                              alert("Zdobyłeś 50 pkt");

                              let p =  $("#gamePoint").html();
                              p = parseInt(p);
                              p = p + 50; 
                              $("#gamePoint").html(p.toString());
                                console.log(" p % 200 " + p% 200 ); 
                              if(p % 200 === 0 && p > 0 ){
                                  console.log("LEVEL UP ")
                                  Apk.user.level = Apk.user.level + 1; 
                                  $("#szukaneSlowo").attr("maxlength", (Apk.user.level * 3));
                              }
                              if(p % 200 === 0 && p < 0 ){
                                console.log("LEVEL UP ")
                                Apk.user.level = Apk.user.level - 1; 
                                if(Apk.user.level>0){
                                $("#szukaneSlowo").attr("maxlength", (Apk.user.level * 3));
                                }
                                if(Apk.user.level<=0){
                                    $("#szukaneSlowo").attr("maxlength", ("3"));
                                    }
                                $("#gameLevel").html(""); 
                                $("#gameLevel").html(Apk.user.level); 

                            }
                          }
      
                          
                          
                      }else{
                          console.log(wynik + " !== " + upTabZnakow); 
                          console.log(wynik.length);
                          console.log(wynik.length === upTabZnakow); 
                          if(wynik.length === upTabZnakow.length){
                              console.log("Odejmujemy"); 
                          let p =  $("#gamePoint").html();
                              p = parseInt(p);
                              p = p  - 50; 
                              $("#gamePoint").html(p);}
                      }
                   });
            });

            
        }); 

        
    $("#reloadPage").on("click", function(){
        location.reload();
    })

  

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
                       $("#greatingUser").html("Zalogowano jako :  " + log.username.toUpperCase()); 
                       //$("#greatingUser").fadeOut( 3000, "linear" );
                       Apk.user.level = log.level; 
                       Apk.user.nick = log.username;
                       
                       Apk.user.pointGame = log.pointGame; 
                        $("#szukaneSlowo").attr("maxlength", (log.level *3));
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


