var arrayDeck = []; // Initialize the Deck

[0, 1, 2, 3].forEach(function (suit) { 
    for (var i = 0; i < 13; i++) {
        var card = {
            suit: suit,
            rank: i
        };
        arrayDeck.push(card); // push the card into arrayDeck.
    }
});



var listDeck = function () {
    document.getElementById("listedDeck").innerHTML = JSON.stringify(arrayDeck); // you need JSON stringify to list the objects, otherwise it'll just be [Object, object]
}

var translateCard = function (card) {
    var suit = card.suit;
    switch (suit) {
      case 0:
        suit = 'spades'
        break;
      case 1:
        suit = 'hearts'
        break;
      case 2: 
        suit = 'diamonds'
        break;
      case 3:
        suit = 'clubs'
        break;
    };
    var rank = card.rank + 2;
    switch (rank) {
        case 11:
            rank = 'Jack'
            break;
        case 12:
            rank = 'Queen'
            break;
        case 13:
            rank = 'King'
            break;
        case 14:
            rank = 'Ace'
            break;
        default:
            break;
    };
    return "" + rank + " of " + suit;
};

var translateRankOnly = function (rank) {
    var rank = rank + 2;
    switch (rank) {
        case 11:
            rank = 'Jack'
            break;
        case 12:
            rank = 'Queen'
            break;
        case 13:
            rank = 'King'
            break;
        case 14:
            rank = 'Ace'
            break;
        default:
            break;
    };
    return "" + rank;
};


var pickCard = function () {
    var whichCard = Math.floor(Math.random() * 52);
    document.getElementById("pickedCard").innerHTML = JSON.stringify(arrayDeck[whichCard]);
    document.getElementById("inEnglish").innerHTML = translateCard(arrayDeck[whichCard]);
};

// Pick a number corresponding to a card from 0 to 51

// NOW THE SHUFFLING BEGINS! 


/* 

// I wrote my own shuffler but found a one-line shuffler online. It works well enough. Here's my shuffler below. 

// Look, I know it's stupid, but at least the algorithm works. Even if the worst case scenario *is* O(n^infinity)...
// NOW THE SHUFFLING BEGINS! 

var shuffle = function () {

    var shuffledDeck = []; //This is global 

    // There's got to be a way to fix this so that you don't repeat numbers.
    while (shuffledDeck.length < 52) {
        var whichCard = Math.floor(Math.random() * 52);
        var found = false;
        for (i = 0; i < shuffledDeck.length; i++) {
            if (shuffledDeck[i] === whichCard) {
                found = true;
                break;
            }
        }
        if (!found) {
            shuffledDeck[shuffledDeck.length] = whichCard;
        }
    }

    var unShuffledDeck = [];
    while (unShuffledDeck.length < 52) {
        var inDeck = false;
        for (i = 0; i < 52; i++) {
            if (shuffledDeck[i] === unShuffledDeck.length) {
                inDeck = true;
                break;
            }
        }
        if (inDeck) {
            unShuffledDeck[unShuffledDeck.length] = unShuffledDeck.length;
        }

    }
    var shuffledDeckObjects = [];
    var shuffledDeckNames = [];
    for (i = 0; i < 52; i++) {
        shuffledDeckObjects[i] = arrayDeck[shuffledDeck[i]];
        shuffledDeckNames[i] = translateCard(shuffledDeckObjects[i]);
    };

    document.getElementById("shuffledDeckNumbers").innerHTML = shuffledDeck;
    document.getElementById("unShuffledDeck").innerHTML = unShuffledDeck;
    document.getElementById("shuffledDeckObjects").innerHTML = JSON.stringify(shuffledDeckObjects);
    document.getElementById("shuffledDeckCards").innerHTML = shuffledDeckNames;
    return shuffledDeckObjects;
} // end shuffle()

*/

Array.prototype.clone = function() {  //This is weird, but basically it prevents a[] = b[1, 2, 3], a[0] = x, output b: x, 2, 3. Javascript passes a lot by reference that I thought would pass by values. But whatevs, Javascript, we're still cool. 
    var input = this; 
    var output = [];
    for (i=0; i < input.length; i++){
        output[i] = input[i];
    }
    return output; 
}

var parseDeck = function(deck){
    var parsed = "";
    for(i=0; i < deck.length; i++){
        parsed = parsed + translateCard(deck[i]) + ", "; 
    }
    return parsed;
}

var getShuffle = function(){
    var shuffledDeckObjects = arrayDeck.clone(); 
    shuffledDeckObjects.sort(function() {return 0.5 - Math.random() }); //which array values go before others? Flip a coin! Got this from the web - hope I'm not "cargoculting".


//debug code 

    var unShuffledDeck = "";
    var spades = "spades: ";
    var hearts = "<BR>hearts: ";
    var diamonds = "<BR>diamonds: ";
    var clubs = "<BR>clubs: ";
    for (i = 0; i < shuffledDeckObjects.length; i++){
        var suitCase = shuffledDeckObjects[i].suit;
            switch (suitCase){
                case 0: 
                    spades = spades + shuffledDeckObjects[i].rank + "s, "
                    break;
                case 1: 
                    hearts = hearts + shuffledDeckObjects[i].rank + "h, "
                    break;
                case 2: 
                    diamonds = diamonds + shuffledDeckObjects[i].rank + "d, "
                    break;
                case 3: 
                    clubs = clubs + shuffledDeckObjects[i].rank + "c, "
                    break;
                default:
                    break;            
            }

     }
    document.getElementById("unShuffledDeck").innerHTML = spades + hearts + diamonds + clubs;

//end debug code



    document.getElementById("shuffledDeckObjects").innerHTML = JSON.stringify(shuffledDeckObjects);

    var shuffledDeckCards = parseDeck(shuffledDeckObjects); 

    document.getElementById("shuffledDeckCards").innerHTML = shuffledDeckCards;
    return shuffledDeckObjects;
}

var grabPokerHand = function () {
    var deck = getShuffle();
    var pokerHand = deck.slice(0,5);
    document.getElementById("pokerHandObjects").innerHTML = JSON.stringify(pokerHand);
    document.getElementById("pokerHandNames").innerHTML = '' + translateCard(pokerHand[0]) + ', ' + translateCard(pokerHand[1]) + ', ' + translateCard(pokerHand[2]) + ', ' + translateCard(pokerHand[3]) + ', ' + translateCard(pokerHand[4]);
    return pokerHand;
};


var sortHand = function (hand) {
    hand.sort(function (a, b) {
        if (a.rank < b.rank) {
            return 1;
        }
        if (a.rank > b.rank) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    document.getElementById("sortedHand").innerHTML = '' + translateCard(hand[0]) + ', ' + translateCard(hand[1]) + ', ' + translateCard(hand[2]) + ', ' + translateCard(hand[3]) + ', ' + translateCard(hand[4]);
    return hand;
};

var eval = function () {
    //var hand = [{"suit":0,"rank":9},{"suit":1,"rank":9},{"suit":2,"rank":5},{"suit":0,"rank":4},{"suit":1,"rank":2}]  // test code
    var hand = grabPokerHand();
    console.log(JSON.stringify(hand));
    hand = sortHand(hand);
        console.log(JSON.stringify(hand));
    var ranking = specifyHand(hand); 
    var x = 'whatevs';
    if (isStraightFlush(hand)) {
        x = 'Straight Flush';
    } else if (isQuads(hand)) {
        x = 'Four of a Kind';
    } else if (isBoat(hand)) {
        x = 'Full House';
    }    else if(isFlush(hand)){ 
      x =  'Flush'; 
    }    else if (isStraight(hand)) {
        x = 'Straight';
    } else if (isTrips(hand)) {
        x = 'Three of a Kind';
    } else if (isTwoPair(hand)) {
        x = 'Two Pair';
    } else if (isPair(hand)) {
        x = 'One Pair';
    } else {
        x = '' + translateCard(hand[0]) + ' high';
            console.log(JSON.stringify(hand));
    };
    document.getElementById("evald").innerHTML = 'Result: ' + x;


    document.getElementById("ranking").innerHTML = JSON.stringify(ranking);
    var rankingName = parseRanking(ranking);
    document.getElementById("rankingName").innerHTML = rankingName
    return ranking;
};


var isWheel = function (hand) {
    if ( // multiline if! 
    hand[0].rank === 12 && hand[1].rank === 3 && hand[2].rank === 2 && hand[3].rank === 1 && hand[4].rank === 0) {
        return true;
    } else {
        return false;
    };
};

var isFlush = function (hand) {
      var flushhand = []
      for(i=0; i < hand.length; i++) {flushhand[i] = hand[i];}
      flushhand.sort(function (a, b) {
        if (a.suit < b.suit) {
            return 1;
        }
        if (a.suit > b.suit) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    if ( flushhand[0].suit === flushhand[4].suit ) {
        return true;
    } else {
        return false;
    };
};

var isStraight = function (hand) {
    if(isWheel(hand)){ return true; }
    for (i = 0; i < 4; i++){
      if(hand[i].rank !== hand[i+1].rank + 1 ){
        return false;
      }; //endif
    }; //endfor
    return true;
};

var isStraightFlush = function (hand) {
    if (isFlush(hand) && isStraight(hand)) {
        return true;
    } else {
        return false;
    }
}

var isQuads = function (hand) {
    var a = hand[0].rank === hand[3].rank // only true if XXXXY
    var b = hand[1].rank === hand[4].rank // only true if XYYYY
    if (a || b) {
        return true;
    } else {
        return false;
    };
};

var isBoat = function (hand) {
    var a = hand[0].rank === hand[2].rank && hand[3].rank === hand[4].rank; // true if XXXYY - since we sorted, we can skip the middle. If 0 = 2, 1 must = 0 & = 2
    var b = hand[0].rank === hand[1].rank && hand[2].rank === hand[4].rank; // true if XXYYY
    if (a || b) {
        return true;
    } else {
        return false;
    };
};

var isTrips = function (hand) {
    var a = hand[0].rank === hand[2].rank && hand[3].rank !== hand[4].rank; // true if XXXYZ 
    var b = hand[2].rank === hand[4].rank && hand[1].rank !== hand[2].rank; // true if XYZZZ
    var c = hand[1].rank === hand[3].rank && hand[0].rank !== hand[4].rank; // only true if XYYYZ

    if ((a || b || c) && !isQuads(hand)) {
        return true;
    } else {
        return false;
    };
};

var isTwoPair = function (hand) {
    var a = hand[0].rank === hand[1].rank && hand[2].rank == hand[3].rank; // true if XXYYZ 
    var b = hand[0].rank === hand[1].rank && hand[3].rank == hand[4].rank; // true if XXYZZ \
    var c = hand[1].rank === hand[2].rank && hand[3].rank == hand[4].rank; // true if XYYZZ 

    if ((a || b || c) && !isQuads(hand) && !isBoat(hand) && !isTrips(hand)) {
        return true;
    } else {
        return false;
    };
};

var isPair = function (hand) {
    var a = hand[0].rank === hand[1].rank || hand[1].rank === hand[2].rank || hand[2].rank === hand[3].rank || hand[3].rank === hand[4].rank;
    var b = !isTwoPair(hand) && !isTrips(hand) && !isBoat(hand) && !isQuads(hand);
    if (a && b) {
        return true;
    } else {
        return false;
    }
}


// We'll need more specific values if we're going to compare hands.  

var specifyHand = function(hand){
    var ranking = {
        handtype: -1,
        rank1: -1,
        rank2: -1,
        rank3: -1,
        rank4: -1,
        rank5: -1
    }

    if(isStraightFlush(hand)){
        ranking.handtype = 9;
        ranking.rank1 = hand[0].rank;
        return ranking;
    }
    if(isQuads(hand)){
        ranking.handtype = 8;
        ranking.rank1 = hand[2].rank;
            if (hand[2].rank !== hand[0].rank){
                ranking.rank2 = hand[0].rank;
            }
            else{
                ranking.rank2 = hand[4].rank; 
            }
        return ranking;
    }

    if(isBoat(hand)){
        ranking.handtype = 7;
        ranking.rank1 = hand[2].rank;
            if (hand[2].rank !== hand[0].rank){
                ranking.rank2 = hand[0].rank;
            }
            else{
                ranking.rank2 = hand[4].rank; 
            }
        return ranking;
    }
    if(isFlush(hand)){
        ranking.handtype = 6;
        ranking.rank1 = hand[0].rank;
        ranking.rank2 = hand[1].rank;
        ranking.rank3 = hand[2].rank;
        ranking.rank4 = hand[3].rank;
        ranking.rank5 = hand[4].rank;
        return ranking;
    }
    if(isStraight(hand)){
        ranking.handtype = 5;
            if(isWheel(hand)){
                ranking.rank1 = 5
            }
            else{
                ranking.rank1 = hand[0].rank; 
            }
        return ranking;
    }
    if(isTrips(hand)){
        ranking.handtype = 4;
        ranking.rank1 = hand[2].rank;
            if (hand[0].rank !== hand[1].rank && hand[1].rank !== hand[2].rank){
                ranking.rank2 = hand[0].rank;
                ranking.rank3 = hand[1].rank;
            }
            if (hand[0].rank === hand[1].rank && hand[1].rank === hand[2].rank){
                ranking.rank2 = hand[3].rank;
                ranking.rank3 = hand[4].rank;
            }
            if (hand[0].rank !== hand[1].rank && hand[1].rank === hand[2].rank){
                ranking.rank2 = hand[0].rank;
                ranking.rank3 = hand[4].rank;
            }
        return ranking;
    }
    if(isTwoPair(hand)){
        ranking.handtype = 3;
        ranking.rank1 = hand[1].rank;
        ranking.rank2 = hand[3].rank;
            if (hand[0].rank === hand[1].rank && hand[2].rank === hand[3].rank){
                ranking.rank3 = hand[4].rank; 
            }
            if (hand[1].rank === hand[2].rank && hand[3].rank === hand[4].rank){
                ranking.rank3 = hand[0].rank; 
            }
            if (hand[0].rank === hand[1].rank && hand[3].rank === hand[4].rank){
                ranking.rank3 = hand[2].rank; 
            }
         return ranking;
    }
    if(isPair(hand)){
        ranking.handtype = 2;
        if (hand[0].rank === hand[1].rank){
            ranking.rank1 = hand[0].rank;
            ranking.rank2 = hand[2].rank;
            ranking.rank3 = hand[3].rank;
            ranking.rank4 = hand[4].rank;
        }
        if (hand[1].rank === hand[2].rank){
            ranking.rank1 = hand[1].rank;
            ranking.rank2 = hand[0].rank;
            ranking.rank3 = hand[3].rank;
            ranking.rank4 = hand[4].rank;
        }
        if (hand[2].rank === hand[3].rank){
            ranking.rank1 = hand[2].rank;
            ranking.rank2 = hand[0].rank;
            ranking.rank3 = hand[1].rank;
            ranking.rank4 = hand[4].rank;
        }
        if (hand[3].rank === hand[4].rank){
            ranking.rank1 = hand[3].rank;
            ranking.rank2 = hand[0].rank;
            ranking.rank3 = hand[1].rank;
            ranking.rank4 = hand[2].rank;
        }
        return ranking;
    }
    if (!isStraightFlush(hand) && !isQuads(hand) && !isBoat(hand) && !isFlush(hand) && !isStraight(hand) && !isTrips(hand) && !isTwoPair(hand) && !isPair(hand)){
            ranking.handtype = 1;
            ranking.rank1 = hand[0].rank;
            ranking.rank2 = hand[1].rank;
            ranking.rank3 = hand[2].rank;
            ranking.rank4 = hand[3].rank;
            ranking.rank5 = hand[4].rank;
            return ranking;
            }
};

var parseRanking = function(ranking){ //takes object, returns string
   var lingo = ""
   switch (ranking.handtype){
      case 9: //sf
        lingo = translateRankOnly(ranking.rank1) + "-high Straight Flush."
        return lingo;
        break;
      case 8:  //4k
        lingo = "Quad " + translateRankOnly(ranking.rank1) + "s with a " + translateRankOnly(ranking.rank2) + " kicker.";
        return lingo;
        break;
      case 7: //boat
        lingo = translateRankOnly(ranking.rank1) + "s full of " + translateRankOnly(ranking.rank2) + "s.";
        return lingo;
        break;
      case 6: //flush
        lingo = translateRankOnly(ranking.rank1) + "-high Flush with " + translateRankOnly(ranking.rank2) + ", " + translateRankOnly(ranking.rank3) + ", " + translateRankOnly(ranking.rank4) + ", " + translateRankOnly(ranking.rank5) + " kickers."; 
        return lingo;
        break;
      case 5: //straight
        lingo = translateRankOnly(ranking.rank1) + "-high Straight."; 
        return lingo;
        break;
      case 4: //trips
        lingo = "Trip " + translateRankOnly(ranking.rank1) + "s with " + translateRankOnly(ranking.rank2) + ", " + translateRankOnly(ranking.rank3) + " kickers."; 
        return lingo;
        break;     
      case 3: //2p
        lingo = translateRankOnly(ranking.rank1) + "s up with " + translateRankOnly(ranking.rank2) + "s and a " + translateRankOnly(ranking.rank3) + " kicker."; 
        return lingo;
        break;       
      case 2: //1p
        lingo = "Pair of " + translateRankOnly(ranking.rank1) + "s with " + translateRankOnly(ranking.rank2) + ", " + translateRankOnly(ranking.rank3) + ", " + translateRankOnly(ranking.rank4) + " kickers."; 
        return lingo;
        break;
      case 1: //highcard
        lingo = translateRankOnly(ranking.rank1) + " high with " + translateRankOnly(ranking.rank2) + ", " + translateRankOnly(ranking.rank3) + ", " + translateRankOnly(ranking.rank4) + ", " + translateRankOnly(ranking.rank5) + " kickers."; 
        return lingo;
        break;                  

      default:
       return "I dunno.";
       break;
          };
};