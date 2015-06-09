var arrayDeck = []; // Initialize the Deck

['spades', 'hearts', 'diamonds', 'clubs'].forEach(function (suit) { // The array that lists the suits is literal here
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


var pickCard = function () {
    var whichCard = Math.floor(Math.random() * 52);
    document.getElementById("pickedCard").innerHTML = JSON.stringify(arrayDeck[whichCard]);
    document.getElementById("inEnglish").innerHTML = translateCard(arrayDeck[whichCard]);
};

/*

var spades = ['2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As'];
var hearts = ['2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah'];
var diamonds = ['2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad'];
var clubs = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac'];
var deck = [spades, hearts, diamonds, clubs];

var listDeck = function() {
  document.getElementById("listedDeck").innerHTML = arrayDeck;
}
*/

// Pick a number corresponding to a card from 0 to 51

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

var grabPokerHand = function () {
    var deck = shuffle();
    var pokerHand = [deck[0], deck[1], deck[2], deck[3], deck[4]];
    document.getElementById("pokerHandObjects").innerHTML = JSON.stringify(pokerHand);
    document.getElementById("pokerHandNames").innerHTML = '' + translateCard(deck[0]) + ', ' + translateCard(deck[1]) + ', ' + translateCard(deck[2]) + ', ' + translateCard(deck[3]) + ', ' + translateCard(deck[4]);
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
};

var eval = function () {
    var hand = grabPokerHand();
    hand = sortHand(hand);
    var x = 'whatevs';
    if (isStraightFlush(hand)) {
        x = 'Straight Flush';
    } else if (isQuads(hand)) {
        x = 'Four of a Kind';
    } else if (isBoat(hand)) {
        x = 'Full House';
    }
    //  else if(isFlush(hand)){ x =  'Flush'; }
    else if (isStraight(hand)) {
        x = 'Straight';
    } else if (isTrips(hand)) {
        x = 'Three of a Kind';
    } else if (isTwoPair(hand)) {
        x = 'Two Pair';
    } else if (isPair(hand)) {
        x = 'One Pair';
    } else {
        x = '' + hand[0].rank + ' high';
    };
    document.getElementById("evald").innerHTML = 'Result: ' + x;
    return x;
};


var isWheel = function (hand) {
    if ( // multiline if! 
    hand[0].rank === 12 && hand[1].rank === 0 && hand[2].rank === 1 && hand[3].rank === 2 && hand[4].rank === 3) {
        return true;
    } else {
        return false;
    };
};

var isFlush = function (hand) {
    if ( // multiline if! 
    hand[1].suit === hand[0].suit && hand[2].suit === hand[0].suit && hand[3].suit === hand[0].suit && hand[4].suit === hand[0].suit) {
        return true;
    } else {
        return false;
    };
};

var isStraight = function (hand) {
    if (hand[0].rank === hand[4] - 4) {
        return true;
    } else if (isWheel(hand)) {
        return true;
    } else {
        return false;
    };
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
    var C = hand[1].rank === hand[3].rank && hand[0].rank !== hand[4].rank; // only true if XYYYZ

    if ((a || b || c) && !isQuads(hand)) {
        return true;
    } else {
        return false;
    };
};

var isTwoPair = function (hand) {
    var a = hand[0].rank === hand[1].rank && hand[2].rank !== hand[3].rank; // true if XXYYZ 
    var b = hand[0].rank === hand[1].rank && hand[3].rank !== hand[4].rank; // true if XXYZZ
    var C = hand[1].rank === hand[2].rank && hand[3].rank !== hand[4].rank; // true if XYYZZ

    if ((a || b || c) && !isQuads(hand) && !isBoat(hand)) {
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