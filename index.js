var origBoard;
const huPlayer='O';
const aiPlayer='X';
const wintrios=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let score;
class Move
{
    constructor()
    {
        let row,col;
    }
}
const cells = document.querySelectorAll('.box');
startGame();

function startGame(){
    document.querySelector('.winner').style.display = "none";
    origBoard=Array.from(Array(9).keys());
    for(let i=0;i<cells.length;i++){
        cells[i].innerText ='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    }
}

function turnClick(box) {
    if (typeof origBoard[box.target.id] == 'number') {
        turn(box.target.id, huPlayer);
        if (!checkTie()) turn(bestSpot(), aiPlayer);
    }
}

function turn(boxID,player){
    origBoard[boxID]=player;
    document.getElementById(boxID).innerText=player;
    let gameWon = checkWin(origBoard,player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board,player){
    let plays = board.reduce((a,e,i)=>
    (e===player) ? a.concat(i) : a,[]);
    console.log(plays);
    let gameWon = null;
    for(let [index,win] of wintrios.entries()){
        if (win.every(elem => plays.indexOf(elem)>-1)){
            gameWon = {index: index,player:player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of wintrios[gameWon.index]){
        document.getElementById(index).style.backgroundColor= gameWon.player==huPlayer? "plum" : "pink" ;
    }
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turnClick,false );
    }
    var textt;
    var shadowcolor;
    if(gameWon.player==aiPlayer){
        score=-20;
        textt="OOPS! You lose.";
        shadowcolor="#ff0622";

    }
    else{
        score = 20;
        textt="YAAYY!! You win .";
        shadowcolor="#32fed2";
    }
    declareWinner(textt,shadowcolor)
    // declareWinner(gameWon.player == huPlayer ? "YAAYY!! You win ." : "OOPS! You lose.")
}

function declareWinner(text,scolour){
    document.querySelector(".winner").style.display="block";
    document.querySelector(".winner").style.boxShadow="0 0 15px "+ scolour;
    document.querySelector(".text").innerText= text;
}

function emptySquares(){
    return origBoard.filter(s=> typeof s == 'number');
}

function bestSpot(){
    return emptySquares()[0];
}

function checkTie(){
    if (emptySquares().length == 0){
        for(let i=0;i<cells.length;i++){
            cells[i].style.backgroundColor="#98FB98";
            cells[i].removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}

function minimax(newBoard,player){
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard,player)){
        return {score: -10};
    }else if (checkWin(newBoard,aiPlayer)){
        return {score: 20};
    }else if(availSpots.length==0){
        return {score: 0};
    }
    var moves =[];
    for(var i=0;i<availSpots.length;i++){
        var move ={};
        newBoard[availSpots[i]]=player;
        
        if(player==aiPlayer){
            move.score=minimax(newBoard,huPlayer);
        } else {
            move.score=minimax(newBoard,aiPlayer);
        }
        newBoard[availSpots[i]]=move.index;
        moves.push(move);
    }

    var bestMove;
}