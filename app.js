let cards = [];

for(let i=1;i<10;i++){
    for(let j=0;j<4;j++){
        cards.push(i);
    }
}

for(let i=0;i<16;i++){
    cards.push(10);
}

const hitbtn = document.querySelector(".hitbtn");
const stdbtn = document.querySelector(".stdbtn");

let count = 0;

hitbtn.addEventListener("click", hit);
stdbtn.addEventListener("click", stand);

let player1 = [];
let player2 = [];

let flag = 0;
let cur_player = player1;

function summ(player){
    let sum = 0;
    for(let i=0;i<player.length;i++){
        sum += player[i];
    }
    return sum;
}


function hit() {
    var card = cards[Math.floor(Math.random() * cards.length)];
    // remove that card from the array/deck
    cur_player.push(card);

    // find the element's index and remove it from the array

    let index = 0;
    for(let i=0;i<cards.length;i++){
        if(cards[i] == card){
            index = i;
        }
    }

    cards.splice(index, 1);

    let sum = summ(cur_player);
    console.log("sum : ");
    console.log(sum);

    if (sum > 21){
        if(cur_player == player1){
            console.log("PLAYER 2 WINS");
        }
        else{
            console.log("PLAYER 1 WINS");
        }
    }

    if(summ(player2) > summ(player1) && summ(player2) < 22){
        console.log("PLAYER 2 WINS");
    }

    console.log(cur_player);
}

function stand() {
    console.log("STAND");
    cur_player = player2;
    // turn will move to the next player
}
let playing = true;