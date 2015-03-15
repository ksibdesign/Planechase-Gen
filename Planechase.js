function DiceRollv2() {
	var time = 100;
	$('#PCDv2').unbind( "click" );
	//document.getElementById("Result").innerHTML = "&nbsp;";
	setTimeout(function() {
		if (Math.floor(Math.random() * 2)==1) {
			document.getElementById("PCDv2").src = "DieV2/"+diceType+"Die_V_Side"+temp+".png";
		} else {
			document.getElementById("PCDv2").src = "DieV2/"+diceType+"Die_H_Side"+temp+".png";
		}
		setTimeout(function() {

			temp = Math.floor(Math.random() * 6);
			document.getElementById("PCDv2").src = "DieV2/"+diceType+"Die_C_Side"+temp+".png";
		
			count++;
			if (count < 10 ){
				DiceRollv2();
			} else {
				count = 0;
				$('#PCDv2').click(gameChecker);
				if(temp == 1){
					cardNext();
				}
			}
		},time);
	},time);
}
function deckSelector() {
	if (deck == 0) {
		deckAll();
	} else if (deck == 1){
		deckElementalThunder();
	} else if (deck == 2){
		deckMetallicDreams();
	} else if (deck == 3){
		deckStrikeForce();
	} else if (deck == 4){
		deckZombieEmpire();
	} else if (deck == 5){
		deckChaosReigns();
	} else if (deck == 6){
		deckNightOfTheNinja();
	} else if (deck == 7){
		deckPrimordialHunger();
	} else if (deck == 8){
		deckSavageAuras();
	} else if (deck == 9){
	}
}
function deckSetup() {
	deckSelector();
	$('#PCDv2').unbind( "click" );
	$('#Shuffle').click(deckShuffle);
    $('#Next').click(cardNext);
    $('#Prev').click(cardPrev);
    $('#PCDv2').click(DiceRollv2);
	deckShuffle();
	gameStarted = 1;
}
function gameChecker () {
	if (gameStarted == 0 ){
		deckSetup();
	} else {
		DiceRollv2();
	}
}
function deckShuffle() {
  var shuffleAmt = 4;
  var currentShuffle = 0;
  var cardCount = "";
  var cardReplace = "";
  var temp = "";
  cardPos = 0;
  
  for (currentShuffle = 0; currentShuffle < shuffleAmt; currentShuffle++){
    for (cardCount = 0; cardCount < deckCurrent.length; cardCount++) {
      cardReplace = Math.floor(Math.random() * deckCurrent.length);
      temp = deckCurrent[cardCount];
      deckCurrent[cardCount] = deckCurrent[cardReplace];
      deckCurrent[cardReplace] = temp;
    }
  }
  document.getElementById("Card").src = "Cards/"+deckCurrent[0]+".png";
    cardPos = 0;
	$('#CardName').text("Deck - "+deckName);
}
function cardPrev() {
	if (cardPos == 0) {
		cardPos = (deckCurrent.length-1);
	} else {
		cardPos--;
	}
	document.getElementById("Card").src = "Cards/"+deckCurrent[cardPos]+".png";
	$('#CardName').text("Deck - "+deckName);
}
function cardNext() {
	if (cardPos == (deckCurrent.length-1)) {
		cardPos = 0;
	} else {
		cardPos++;
	}
	document.getElementById("Card").src = "Cards/"+deckCurrent[cardPos]+".png";
	$('#CardName').text("Deck - "+deckName);
}
function settings() {
	if (menuState == 1) {
		$('#Shuffle').click(deckShuffle);
   		$('#Next').click(cardNext);
    	$('#Prev').click(cardPrev);
    	$('#PCDv2').click(gameChecker);
		$('#CardName').text("Deck - "+deckName);
		$('#Card').show(0);
		$('#Settings').hide(0);
		$('#CustomDeckSettings').hide(0);
		menuState = 0;
	} else {
		$('#PCDv2').unbind( "click" );
		$('#Next').unbind( "click" );
		$('#Prev').unbind( "click" );
		$('#Shuffle').unbind( "click" );
		$('#CardName').text("Select a deck to use!");
		$('#Card').hide(0);
		$('#Settings').show(0);
		$('#CustomDeckSettings').hide(0);
		menuState = 1;
	}
}
function deckSetting(x){
	deck = x;
	deckCurrent.length = 0;
	gameStarted = 1;
	deckSelector();
	deckShuffle();
	settings();
	$('#CardName').text("Deck - "+deckName);
}
function deckCustom() {
	$('#PCDv2').unbind( "click" );
	$('#Next').unbind( "click" );
	$('#Prev').unbind( "click" );
	$('#Shuffle').unbind( "click" );
	$('#CardName').text("Create your customized deck!");
	$('#CustomDeckSettings').show(0);
	$('#Card').hide(0);
	$('#Settings').hide(0);
}
function checkBoxSelect(box, number) {
	if ($(box).attr("id") == "CheckBox" ) {
		$(box).attr("id","CheckBoxSelected");
		customDeck[number] = 0;
	} else {	
		$(box).attr("id","CheckBox");
		customDeck[number] = 1;
	}
}
function deckCustomComplete() {
	$('#Shuffle').click(deckShuffle);
   	$('#Next').click(cardNext);
    $('#Prev').click(cardPrev);
    $('#PCDv2').click(gameChecker);
	deck = 9;
	$('#Card').show(0);
	$('#CustomDeckSettings').hide(0);
	
	deckCurrent.length = 0;
	var temp = 0;
	var temp2 = 0;
	while (temp < customDeck.length) {
		if (customDeck[temp] == 0) {
			temp++;
		} else {
			deckCurrent[temp2] = deckPlaceholder[temp];
			temp++;
			temp2++;
		}
	}
	deckName = "Custom";
	deckShuffle();
	menuState = 0;
}

var isLandscape = true;
function changeStylesheet() {
	isLandscape = !isLandscape;
	$('body').toggleClass('layout-landscape', isLandscape);
	$('body').toggleClass('layout-portrait', !isLandscape);
}