/* Create the deck as a nested array */
var spades = ['2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As'];
var hearts = ['2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah'];
var diamonds = ['2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad'];
var clubs = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac'];
var deck = [spades, hearts, diamonds, clubs];

var listDeck = function(){
  document.getElementById("listedDeck").innerHTML = deck;
}

// Pick a number corresponding to a card from 0 to 51

var pickCard = function() {
  var whichCard = Math.floor(Math.random() * 52);
  var suitNumber = Math.floor(whichCard / 13);
  var rankNumber = Math.floor(whichCard % 13);
  document.getElementById("pickedCard").innerHTML = deck[suitNumber][rankNumber];
}

// NOW THE SHUFFLING BEGINS! 

var shuffle = function(){

var shuffledDeck = []; //This is global 

while(shuffledDeck.length < 52) {
    var whichCard = Math.floor(Math.random() * 52);
    var found=false;
       for(i=0; i < shuffledDeck.length; i++){
         if(shuffledDeck[i] === whichCard) {found = true; break;}
       }
    if(!found){
      shuffledDeck[shuffledDeck.length] = whichCard;
    }  
}

var unShuffledDeck = [];
while(unShuffledDeck.length < 52) {
  var inDeck = false;
  for(i=0; i < 52; i++){
    if(shuffledDeck[i] === unShuffledDeck.length) {
      inDeck = true; break; 
    }
  }
    if(inDeck){
      unShuffledDeck[unShuffledDeck.length] = unShuffledDeck.length;
 }  
    
}

var shuffledDeckNames = []
for(i=0; i < 52; i++){
  var suitNumber = Math.floor(shuffledDeck[i] / 13);
  var rankNumber = Math.floor(shuffledDeck[i] % 13);
  shuffledDeckNames[i] = deck[suitNumber][rankNumber];
}

  document.getElementById("shuffledDeckNumbers").innerHTML = shuffledDeck;
document.getElementById("unShuffledDeck").innerHTML = unShuffledDeck;
document.getElementById("shuffledDeckCards").innerHTML = shuffledDeckNames;
}// end shuffle()