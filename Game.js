let userscore = 0;
let computerscore = 0;
let gameActive = true;

const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("computer-score");
const messageEl = document.getElementById("message");
const resetBtn = document.getElementById("reset");

function computerChoice() {
  const arr = ["rock", "paper", "scissors"];
  return arr[Math.floor(Math.random() * arr.length)];
}

function decide(user, computer) {
  if (user === computer) return "draw";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function animateChoice(el, result) {
  el.classList.add(result);
  setTimeout(() => el.classList.remove(result), 700);
}

function checkGameOver() {
  const winningScore = 5;
  if (userscore >= winningScore || computerscore >= winningScore) {
    gameActive = false;
    if (userscore > computerscore) {
      messageEl.textContent = `Game over — You won ${userscore} : ${computerscore}!`;
    } else if (computerscore > userscore) {
      messageEl.textContent = `Game over — Computer won ${computerscore} : ${userscore}.`;
    } else {
      messageEl.textContent = `Game over — It's a tie ${userscore} : ${computerscore}.`;
    }
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (!gameActive) return;
    const user = choice.id.toLowerCase();
    const comp = computerChoice();
    const result = decide(user, comp);

    if (result === "win") {
      userscore++;
      userScoreEl.textContent = userscore;
      messageEl.textContent = `You win! ${capitalize(user)} beats ${capitalize(comp)}.`;
      animateChoice(choice, "win");
    } else if (result === "lose") {
      computerscore++;
      compScoreEl.textContent = computerscore;
      messageEl.textContent = `You lose! ${capitalize(comp)} beats ${capitalize(user)}.`;
      animateChoice(choice, "lose");
    } else {
      messageEl.textContent = `It's a draw — both chose ${capitalize(user)}.`;
      animateChoice(choice, "draw");
    }

    checkGameOver();
  });
});

resetBtn.addEventListener("click", () => {
  userscore = 0;
  computerscore = 0;
  gameActive = true;
  userScoreEl.textContent = userscore;
  compScoreEl.textContent = computerscore;
  messageEl.textContent = "Play your move";
});
