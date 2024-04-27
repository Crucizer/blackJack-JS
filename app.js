let cards = [];
let used = [];

for(let j=0;j<4;j++){
for(let i=1;i<14;i++){
    if(i>9){
        cards.push(10);
    }
    else{
        cards.push(i);
    }
}
}

console.log(cards);

// QUERY SELECTORS

const hitbtn = document.querySelector(".hitbtn");
const stdbtn = document.querySelector(".stdbtn");

const cards1 = document.querySelector(".player1");
const cards2 = document.querySelector(".player2");
const curr = document.querySelector(".curplayer");

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

function checkUsed(index){
    for(let i=0;i<used.length;i++){
        if(used[i] == index){
            // randomize
            
            return true;
        }
    }

    return false;

}

function randInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// returns a random card
function rand(){

    return randInterval(1,52);
}


function hit() {
    var card = cards[Math.floor(Math.random() * cards.length)];

    var index = rand();
    var card = cards[index];
    
    // remove that card from the array/deck
    cur_player.push(card);

    // Updating the changes on screen

    cards1.innerHTML = player1;
    cards2.innerHTML = player2;


    // Adding card on the screen
    var img = document.createElement("img");
    let imgIndex = index+1;
    console.log(imgIndex);
    img.src = "./cards/"+imgIndex.toString()+".png";
    cards1.appendChild(img);

    // instead of removing from the array, we'll need to check
    //cards.splice(index, 1);

    let flag = 1;
    while (flag){
        console.log("im in while");
        if(checkUsed(index)){
            // randomize
            index = rand();
        }
        else{
            used.push(index);
            flag = 0;
        }

    }
    

    // used.push(index);
    

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
    curr.innerHTML = "PLAYER 2 PLAYS";
    console.log("STAND");
    cur_player = player2;
    // turn will move to the next player
}