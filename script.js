const start = document.querySelector("#startBtn");
const holes = document.querySelectorAll(".hole");
const terrorist = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const sound = document.querySelector(".sound");

let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
   const index = Math.floor(Math.random() * holes.length);
   const hole = holes[index];
   if (lastHole === hole) {
      randomHole(holes);
   }
   lastHole = hole;
   return hole;
}

function peep() {
   const time = randomTime(200, 800);
   const hole = randomHole(holes);
   hole.classList.add("up");
   document.body.classList.add("cross");
   start.style.display = "none";
   setTimeout(() => {
      start.style.display = "block";
      document.body.classList.remove("cross");
      hole.classList.remove("up");
      if (!timeUp) peep();
   }, time);
}

function startGame() {
   score = 0;
   scoreBoard.textContent = 0;
   timeUp = false;
   peep();
   setTimeout(() => (timeUp = true), 15000);
}

function pewpew(e) {
   if (!e.isTrusted) return;
   score++;
   sound.play();
   this.classList.remove("up");
   scoreBoard.innerHTML = score;
}

start.addEventListener("click", startGame);
terrorist.forEach((terrorist) => terrorist.addEventListener("click", pewpew));
