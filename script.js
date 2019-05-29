document.getElementById("notactive").onmouseover = function() {active()}; document.getElementById("notactive").onmouseout = function() {notActive()};
document.getElementById("notactive2").onmouseover = function() {active()}; document.getElementById("notactive2").onmouseout = function() {notActive()};
function active() {
    Object.assign(document.getElementById("active").style,{borderBottom: "none", color: "darkgrey"});
}
function notActive() {
    Object.assign(document.getElementById("active").style,{borderBottom: "2px solid red", color: "white"});
}
active();
notActive();

//Copied from https://codepen.io/desirecode/pen/MJPJqV (and adjusted to fit my code)
$(document).ready(function(){ 
    $('.btn').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 500); 
        return false; 
    }); 
});

//Copied from https://css-tricks.com/snippets/css/typewriter-effect/ (and adjusted to fit my code)
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('text');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".text > .wrap { border-right: 0.08em solid #bbb}";
        document.body.appendChild(css);
    };
/* Tic-Tac-Toe*/

function move() {
    window.location.replace("tictactoe.html")
}

var gameBoard;
const playerH = 'O';
const playerAI = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.getElementById("winner").style.display = "none";
	gameBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick);
	}
}

function turnClick(square) {
	if (typeof gameBoard[square.target.id] == 'number') {
		turn(square.target.id, playerH)
		if (!checkTie()) turn(bestSpot(), playerAI);
	}
}

function turn(squareId, player) {
	gameBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(gameBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == playerH ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick);
	}
	declareWinner(gameWon.player == playerH ? "You win!" : "You lose!");
}

function declareWinner(who) {
	document.getElementById("winner").style.display = "block";
	document.getElementById("text").innerText = who;
}

function emptySquares() {
	return gameBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "grey";
			cells[i].removeEventListener('click', turnClick);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
