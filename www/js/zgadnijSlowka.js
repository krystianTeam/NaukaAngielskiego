

var btnDalej; 
var h3Wynik; 
var pSzukaneSlowoError; 
var kategoriaSlowa ; 
var popupInfoKategoriaSlowa ; 
var zagadkoweSlowo; 
var slowkaRef; 
var dodajNoweSlowo; 
var ile = undefined; 
var losowyIndex = undefined; 

var tabZnakow = undefined; 
var wynik = ""; 
var leter; 
var value; 
var lastLeter = [] ; 
var lastButton = []; 
var lastWynik = [];  
let potwierdzenieOdpowiedzi; 
let czyDodacNoweSlowo = true; 

function slowkaInit(){

    
    
    btnDalej = $("#btnDalejSlowka"); 
    h3Wynik = $("#wynik");
    pSzukaneSlowoError = $("#szukaneSlowoError"); 
    kategoriaSlowa = $("#kategoriaSlowa"); 
    //zagadkoweSlowo = $("#zagadkoweSlowo"); 
    slowkaRef = firebase.database().ref('words/level'); 
    dodajNoweSlowo = $("#dodajNoweSlowo"); 

    function nextWords(){

        let testIsOnline = CheckIfUserIsOnline(); 
        if(testIsOnline === false){
            $("#popuOnlineError").popup("open");
            return; 
        }
        $("#zagadkoweSlowo").html("");
        $("#corectAnswerInfo").html("");
        slowkaRef.once("value").then(function(snapshot) {
            var log = snapshot.val();
            ile = snapshot.numChildren();
            losowyIndex = getRandomInt(0, ile -1); 
            console.log("jesteśmy w funkcji nextWords"); 
            let key = Object.keys(log[losowyIndex]);
                let value = log[losowyIndex][key];
                potwierdzenieOdpowiedzi = value; 
                
                kategoriaSlowa.html(key);
                //zagadkoweSlowo.html(value); 


                /////////////////
                let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + "pl"+ "&tl=" + "en" + "&dt=t&q=" + value;
        //alert(tempWord); 
        $.get( url, function( data ) {
    
            let text = data; 
            tabZnakow = text[0][0][0].toString();
            var tab= tabZnakow.split('');
                console.log(tab);
                var rantab = shuffle(tab);
                console.log(rantab);
                $("#noweLiterki").html("");
                for(let i = 0; i< rantab.length; i++){
                var button = $("<button>"+rantab[i].toLowerCase()+"</button>");
                
                $(button).addClass("ui-btn ui-btn-inline");
                
                $("#noweLiterki").append(button).trigger('create');
                console.log("Bledy 1");
                
                
                
                }
        })

    
        })

        
        

    }
    
    nextWords(); 
    
    //zagadkoweSlowo.on("click", function(){
        //console.log("test " + $(this).html()); 
    //})
    
    kategoriaSlowa.on("click", function(){
        console.log("test " + $(this).html()); 
    })


    $("#noweLiterki").on('click', '*', function() {

       lastButton.push($(this)); 
        leter = ($(this).html());
        lastLeter.push(leter); 
        console.log(leter); 
          wynik = $("#slowoPoAngielsku").html();
          lastWynik.push(wynik); 
          console.log(wynik); 
          wynik = (wynik + leter);
          console.log(wynik); 
          wynik = wynik.toUpperCase();
          $("#slowoPoAngielsku").html(wynik);
          $(this).attr("disabled", true);
          console.log(wynik.toLowerCase());
          console.log(tabZnakow.toString());
          let test = tabZnakow.toString();
          test = test.toLowerCase(); 
          let lengthWynik = wynik.length; 
          if(wynik.toLowerCase() === test){
              //alert("BRAWO !!! "); 
              $("#corectAnswerInfo").html(""); 
              $("#corectAnswerInfo").html("PRAWIDŁOWA ODPOWIEDŹ : " + potwierdzenieOdpowiedzi.toUpperCase()); 
          }
          if(lengthWynik === test.length){
                if(wynik.toLowerCase() !== test){
                    $("#corectAnswerInfo").html(""); 
                $("#corectAnswerInfo").html("NIEPRAWIDŁOWA ODPOWIEDŹ "  ); 
                }
          }
    });

    $("#backOneLeter").on("click", function () {

        
        if(lastWynik.length >0){
        $("#slowoPoAngielsku").html();
        $("#slowoPoAngielsku").html(lastWynik.pop());
        let temp = lastButton.pop();
        temp.attr("disabled", false); }
        


    })

    $("#podpowiedz").on("click", function(){
        $("#zagadkoweSlowo").html("");
        $("#zagadkoweSlowo").html("Słowo po Polsku to : " + potwierdzenieOdpowiedzi);
    })


    dodajNoweSlowo.on("click", function(){

        let testIsOnline2 = CheckIfUserIsOnline(); 
        console.log(testIsOnline2); 
        if(testIsOnline2 === false){
            console.log("brak sieci "); 
            $("#popuOnlineErrorDodaj").popup("open");
            return;
        }
        var noweSlowo = $("#noweSlowo").val(); 
        var kategoria = $("#kategoriaNoweSlowo").val(); 
        if(noweSlowo.length <= 0){
            alert("wprowadź nowe słowo  !");
            $("#noweSlowo").focus(); 
            return; 
        }
            
            
        
        let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + "pl"+ "&tl=" + "en" + "&dt=t&q=" + noweSlowo;
        $.get( url, function( data ) {
    
            let text = data; 
            tabZnakow = text[0][0][0].toString();
            //var tab= tabZnakow.split('');
           tabZnakow = tabZnakow.toLowerCase();
            let test = noweSlowo.toLowerCase()

           console.log(test + " = ? " + tabZnakow); 
            if(test === tabZnakow){
                
                alert("nie można dodać tego słowa, wprowadź inne !");
                $("#noweSlowo").val(""); 
                $("#noweSlowo").focus(); 
                return; 
            }else{
                kategoria = kategoria.toLowerCase();  
        noweSlowo = noweSlowo.toLowerCase();
        var test5 = true; 

        console.log(kategoria + " " + noweSlowo); 

        slowkaRef.once("value").then(function(snapshot) {
            var log = snapshot.val();
            ile = snapshot.numChildren();

            for(let i = 0; i< ile; i++){
            var key = Object.keys(log[i]);
            let test = log[i][key]; 
                if(test === noweSlowo){
                    test5 = true; 
                    console.log("jest juz takie słowo " + test + " i " + noweSlowo); 
                }else{

                    test5 = false; 
                        
        

                }
            }
             
            if (test5 === false){
                firebase.database().ref('words/level/'+ ile ).set({
                    [kategoria]: noweSlowo 
    
                    });
                    $("#noweSlowo").val(""); 
                    $( "#dodajSlowo" ).popup( "close" );
                    alert("Dodano nowe słowo : " + noweSlowo); 

            }else{
                $("#noweSlowo").val("");
                $("#kategoriaNoweSlowo").val(""); 
               alert("PODANE SLOWO JUŻ ISTNIEJE !!"); 
            }
        })
            }
                

            
        
        }); 

      

        

    
    })
   
    btnDalej.on("click", function(){

        $("#slowoPoAngielsku").html("");
        nextWords(); 
        
       
               
    })

}

