const questions = [
  {
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd43f8b8d?auto=format&fit=crop&w=1000&q=80",
    category: "Mitologia egípcia",
    question: "Quem era o deus do sol e era considerado o rei dos deuses no Egito Antigo?",
    answers: ["Rá", "Anúbis", "Hórus", "Osíris"],
    correct: "Rá",
    explanation: "✅ Correto! Rá era o deus do sol e uma das figuras centrais da mitologia egípcia."
  },
  {
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1000&q=80",
    category: "Julgamento dos mortos",
    question: "Qual deus era associado ao julgamento dos mortos e tinha a cabeça de chacal?",
    answers: ["Set", "Anúbis", "Thot", "Bastet"],
    correct: "Anúbis",
    explanation: "✅ Correto! Anúbis era responsável por pesar o coração dos mortos e guiar o processo espiritual."
  },
  {
    image:
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1000&q=80",
    category: "Deusas",
    question: "Qual deusa era conhecida como a deusa do amor, da beleza e da música?",
    answers: ["Ísis", "Hathor", "Néftis", "Satis"],
    correct: "Hathor",
    explanation: "✅ Correto! Hathor era reverenciada como deusa do amor, da alegria, da música e da fertilidade."
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    category: "Realeza e céu",
    question: "Qual deus era representado por um falcão e simbolizava a realeza e o céu?",
    answers: ["Hórus", "Ptah", "Set", "Ra"],
    correct: "Hórus",
    explanation: "✅ Correto! Hórus era associado ao céu, à visão e ao poder real dos faraós."
  },
  {
    image:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?auto=format&fit=crop&w=1000&q=80",
    category: "Os Mistérios do Egito",
    question: "Quem era o deus que governava o mundo dos mortos e era marido de Ísis?",
    answers: ["Osíris", "Anúbis", "Hórus", "Sobek"],
    correct: "Osíris",
    explanation: "✅ Correto! Osíris era um deus central, associado à morte, à ressurreição e à regeneração."
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const finalScreen = document.getElementById("final-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreEl = document.getElementById("score");
const questionImage = document.getElementById("question-image");
const categoryLabel = document.getElementById("category-label");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const finalTitle = document.getElementById("final-title");
const finalMessage = document.getElementById("final-message");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

let currentIndex = 0;
let score = 0;

function showScreen(screen) {
  [startScreen, quizScreen, finalScreen].forEach((el) => {
    el.classList.toggle("active", el === screen);
    el.classList.toggle("hidden", el !== screen);
  });
}

function renderQuestion() {
  const item = questions[currentIndex];
  questionImage.src = item.image;
  categoryLabel.textContent = item.category;
  questionText.textContent = item.question;
  questionNumber.textContent = currentIndex + 1;
  scoreEl.textContent = score;
  feedback.className = "feedback";
  feedback.textContent = "";
  nextBtn.classList.add("hidden");

  answersContainer.innerHTML = "";

  item.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.type = "button";
    btn.textContent = answer;
    btn.addEventListener("click", () => handleAnswer(btn, answer, item));
    answersContainer.appendChild(btn);
  });
}

function handleAnswer(button, selectedAnswer, item) {
  const allButtons = Array.from(answersContainer.querySelectorAll("button"));
  allButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === item.correct) {
      btn.classList.add("correct");
    }
    if (btn === button && btn.textContent !== item.correct) {
      btn.classList.add("wrong");
    }
  });

  if (selectedAnswer === item.correct) {
    score += 10;
    scoreEl.textContent = score;
    feedback.textContent = item.explanation;
    feedback.classList.add("correct");
  } else {
    feedback.textContent = `Errado! A resposta correta é: ${item.correct}.`;
    feedback.classList.add("wrong");
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex += 1;

  if (currentIndex < questions.length) {
    renderQuestion();
    return;
  }

  showFinalScreen();
}

function showFinalScreen() {
  showScreen(finalScreen);
  finalScore.textContent = score;

  if (score >= 40) {
    finalTitle.textContent = "Grande conhecedor do Egito!";
    finalMessage.textContent = "Você dominou os principais deuses e mistérios da cultura egípcia.";
    return;
  }

  if (score >= 25) {
    finalTitle.textContent = "Muito bem!";
    finalMessage.textContent = "Você conhece bastante sobre o panteão egípcio. Continue explorando a história!";
    return;
  }

  finalTitle.textContent = "Jornada em andamento!";
  finalMessage.textContent = "Você ainda pode descobrir mais sobre os deuses do Egito e voltar para outra rodada.";
}

function restartGame() {
  currentIndex = 0;
  score = 0;
  scoreEl.textContent = "0";
  showScreen(quizScreen);
  renderQuestion();
}

startBtn.addEventListener("click", () => {
  showScreen(quizScreen);
  renderQuestion();
});

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

showScreen(startScreen);
