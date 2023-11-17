"use strict";

const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".hole");

let timeUp = false;
let lastHole;
let score = 0;

// generate a random time
function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// generate a random hole from the dom
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  hole.classList.add("up");

  if (hole === lastHole) {
    console.log("Nah! They're the same");
    return randomHole(holes);
  }

  lastHole = hole; // set the current hole as the last hole

  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  console.log(time, hole);

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

// Start game
function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();

  setTimeout(() => (timeUp = true), 10000); //end game after 10 secs
}

function bunk(e) {
  if (!e.isTrusted) return; //cheated
  timeUp = false;
  score++;
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bunk), { once: true });
