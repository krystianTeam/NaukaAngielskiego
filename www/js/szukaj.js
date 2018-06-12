$("#btnSzukaj").on("click", function(){

        
    let tempWord = $("#szukaneSlowo").val(); 

    if(typeof tempWord !== "string" || tempWord === undefined || tempWord === null){
        $("#szukaneSlowoError").html();
        $("#szukaneSlowoError").html("Nieprawidłowy badź puste pole z szukanym słowem ");
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
        var tab= tabZnakow.split('');
        console.log(tab);
        var rantab = shuffle(tab);
        console.log(rantab);
        $("#literki").html("");
        for(let i = 0; i< rantab.length; i++){
        var button = $("<button>"+rantab[i]+"</button>");
        
        $(button).addClass(".literki2");
        $("#literki").append(button);
        }
    });
})