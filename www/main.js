


    
var tabZnakow; 
var szukaneSlowo = "";
var corectSound = new Audio();
corectSound.src = "Correct-answer.mp3"; 
var wrongSound = new Audio();
wrongSound.src = "bed.mp3"; 
var btnSound = new Audio();
btnSound.src = "btn.mp3"; 


var text; 
var btnTab = []; 
var temp2 = $("#odp").empty();
function drawTable(aTab){
btnTab = []; 
divAnser = []; 

var temp1 = $("#wynik").empty();



var len = aTab.length; 
    for(let i = 0 ; i<len; i ++){
        var btn = document.createElement("BUTTON");
        
        $(btn).html(aTab[i]); 
        btn.style.width = "60px";
        btn.style.height = "60px"; 
        btn.style.display = "inline";
        btn.style.padding = "12px 12px";
       btn.style.borderWidth = "1px";
       btn.style.borderStyle = "outset";
       btn.style.fontSize = "40px";
       btn.style.margin = "10px";
       btn.style.borderRadius = "5px";
        

        btnTab.push(btn); 
        

        temp1.append(btn);
       
    }
}
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function klik (vAl){

}
function chek(word, anseer){

    if(word === anseer){
        return true;
    }
    if(word !== anseer){
        return false; 
    }

}

//var szukanyElement = ".sjp-so-wyniki"; 
var pelneZapytanie = "";

//@aWord - szukane słowo 
//@aZapytanie - pełny adres URL z szukanym słowem, wysyłany do słownika PWN 
function loadDoc() {

    var aWord;
    aWord = $("#szukaj").val();

    if(typeof aWord !== "string" || aWord === undefined || aWord === null){
        return "nieprwidlowy argument, podany argument musi byc typu string"; 
    }

    console.log(aWord); 
    var szukaneSlowo = aWord; 
    var szablonZapytan = "https://sjp.pwn.pl/szukaj/" ; 
     pelneZapytanie = szablonZapytan+szukaneSlowo; 

    console.log(pelneZapytanie); 

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
    + "pl"+ "&tl=" + "en" + "&dt=t&q=" + szukaneSlowo;
    
   $.get( url, function( data ) {
    
    text = data; 
    //console.log(typeof text); 
    //$("#wraper").html(text[0][0][0].toString());

  tabZnakow = text[0][0][0].toString();
    var tab= tabZnakow.split('');
    console.log(tab);
    var rantab = shuffle(tab);
    console.log(rantab);

    drawTable(rantab); 

   btnTab.forEach(element => {
       $(element).on("click", function () {
           
            var t = $(element).html(); 
            var ans = document.createElement("div");
         
        ans.style.width = "60px";
        ans.style.height = "60px"; 
        ans.style.display = "inline";
        ans.style.padding = "12px 12px";
       ans.style.borderWidth = "1px";
       ans.style.borderStyle = "outset";
       $(ans).html(t); 
       divAnser.push(t);
       temp2.append(ans); 
       $(element).off();
       $(element).attr("disabled", true);
        btnSound.play(); 
   
       var dlugoscBtnTab = btnTab.length; 
        let licznik = 0; 
       for (let index = 0; index < dlugoscBtnTab; index++) {
           const element = btnTab[index];
            if($(element).attr("disabled")){
                licznik = licznik +1; 
            }

           
       }
       if(licznik === dlugoscBtnTab){
           console.log("koniec ");
           console.log(divAnser.join("") + "  DIV ANSER JOIN REZULTAT "); 
           if(chek(divAnser.join(""), tabZnakow)){
               console.log("BRAAAAWO WYGRLES");
               corectSound.play(); 
                    
               $("#odp").children().css( "background-color", "green" );
           }else{
            $("#odp").children().css( "background-color", "red" );
            navigator.vibrate(1000);
            wrongSound.play();
            setTimeout(function() {
                zerujOdpowiedz();
                loadDoc();
               
            }, 4000)
           
           }
           
       }
       
           
       });
   });
  });
   
    
}
function zerujOdpowiedz(){
    $("#odp").empty(); 
}

$(document).ready(function(){

    


    $("#btnSerch").click(function(){

        loadDoc();
        zerujOdpowiedz(); 

         
});

});