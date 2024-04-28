let cards = [];
let used = [];

let count = 0;
let player1 = [];
let player2 = [];

let cur_player = player1;

// Making cards

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

// QUERY SELECTORS

const hitbtn = document.querySelector(".hitbtn");
const stdbtn = document.querySelector(".stdbtn");
const drawBtn = document.querySelector(".drawBtn")
// const resetBtn = document.querySelector(".resetBtn");


const cards1 = document.querySelector(".player1");
const cards2 = document.querySelector(".player2");
const curr = document.querySelector(".curplayer");

const imgs = document.querySelector(".images");
const imgs1 = document.querySelector(".oneimgs");
const imgs2 = document.querySelector(".twoimgs");



// Event listeners
hitbtn.addEventListener("click", hit);
stdbtn.addEventListener("click", stand);
drawBtn.addEventListener("click", draw);
resetBtn.addEventListener("click", reset);

// to find sum of array
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
    return randInterval(0,51);
}

// Adding cards on the screen
function addCard(index, cur_player){

    var img = document.createElement("img");
    img.classList.add("image");
    let imgIndex = index+1;
    img.id = index; 
    img.src = "./cards/"+imgIndex.toString()+".png";
    // change cards1 to curr player
    if(cur_player == player1){
        imgs1.appendChild(img);
    }
    else{
        imgs2.appendChild(img);
    }
    
}

function hit() {

    var index = rand();

    let flag = 1;
    while (flag){
        if(checkUsed(index)){
            // randomize
            index = rand();
        }
        else{
            // To play audio
            // var audio = new Audio('effects/cardDraw.wav');
            // audio.play();

            // Updating the changes on screen

            cur_player.push(cards[index]);
            cards1.innerHTML = summ(player1);
            cards2.innerHTML = summ(player2);

            used.push(index);

            addCard(index, cur_player);
            flag = 0; // exit the while loop

        }

    }
    
    
    

    let sum = summ(cur_player);

    if (sum > 21){
        hitbtn.setAttribute('disabled', '');
        stdbtn.setAttribute('disabled', '');

        if(cur_player == player1){
            console.log("PLAYER 2 WINS");
            curr.innerHTML = "PLAYER 2 WINS";
        }
        else{
            console.log("PLAYER 1 WINS");
            curr.innerHTML = "PLAYER 1 WINS";
        }
        curr.style.color = "green";

    }

    if(summ(player2) > summ(player1) && summ(player2) < 22){
        console.log("PLAYER 2 WINS");
        curr.innerHTML = "PLAYER 2 WINS";
        curr.style.color = "green";

        // disable buttons
        hitbtn.setAttribute('disabled', '');
        stdbtn.setAttribute('disabled', '');

    }

}


// standBtn
function stand() {
    hitbtn.removeAttribute('disabled');
    curr.innerHTML = "PLAYER 2 PLAYS";
    console.log("STAND");
    cur_player = player2;
    // turn will move to the next player
}

// resetBtn
function reset (){
    curr.innerHTML = "PLAYER 1 PLAYS";
    curr.style.color = "black";
    // reset arrays
    player1 = [];
    player2 = [];
    used = [];

    // enable buttons
    hitbtn.setAttribute("enabled");
    stdbtn.setAttribute("enabled");
    // remove all the images from the screen
    var images = document.getElementsByTagName('img');

}

// drawBtn
function draw() {
    if(summ(player1) == summ(player2)){
        curr.innerHTML = "DRAW";
        curr.style.color = "blue";

        // disable all buttons
        hitbtn.setAttribute("disabled");
        stdbtn.setAttribute("disabled");
    }
}