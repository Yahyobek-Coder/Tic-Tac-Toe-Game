// Variables
var cells = document.getElementsByClassName('cells')
var platform = document.getElementsByClassName('platform')[0]
var endElement = document.getElementById('end')
var messageElement = document.getElementById('message')
var restartElement = document.getElementById('restart')
var turn
var combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// On Load
startGame() 
playerTurn()

// Start Game
function startGame() {
    for (var i = 0; i < cells.length; i++){
        cells[i].classList.remove('x')
        cells[i].classList.remove('o')
        cells[i].removeEventListener('click', play)
        cells[i].addEventListener('click', play, {once: true})
    }
    endElement.style.display = 'none'
    restartElement.addEventListener('click', startGame, {once: true})
    platform.style.opacity = '1'
}

// Play
function play(Event){
    if (turn == 'xTurn') Event.target.classList.add('x')
    else Event.target.classList.add('o')
    playerTurn()
    checkWin()
}

// Player Turn
function playerTurn(){
    if (turn == 'xTurn'){
        platform.classList.remove('x')
        platform.classList.add('o')
        turn = 'oTurn'
    } else {
        platform.classList.remove('o')
        platform.classList.add('x')
        turn = 'xTurn'
    }
}

// Check who is win
function checkWin(){
    // Draw!
    var num = 9
    for (var i = 0; i < cells.length; i++)
        if (cells[i].classList.contains('x') || cells[i].classList.contains('o'))
            num--
    if (num < 1) endGame('Draw!')
    
    for (var i = 0; i < combinations.length; i++){
        // X's wins!
        if (
            cells[combinations[i][0]].classList.contains('x') &&
            cells[combinations[i][1]].classList.contains('x') &&
            cells[combinations[i][2]].classList.contains('x') 
        ){
            endGame("X's wins!")
        }
        // O's wins!
        if (
            cells[combinations[i][0]].classList.contains('o') &&
            cells[combinations[i][1]].classList.contains('o') &&
            cells[combinations[i][2]].classList.contains('o') 
        ){
            endGame("O's wins!")
        }
    }
}

// End Game
function endGame(message){
    endElement.style.display = 'flex'
    messageElement.textContent = message
    platform.style.opacity = '.3'
}