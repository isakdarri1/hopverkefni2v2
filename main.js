import { loadQuestions } from "./questions.js";



function router() {
  const hash = window.location.hash || "#home";

  if (hash === "#home") renderHome();
  if (hash === "#all") renderAllQuestions();
  if (hash === "#quiz") renderQuiz();
  if (hash === "#create") renderCreate();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);



function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Velkomin</h2>
    <p>Veldu aðgerð úr valmyndinni að ofan.</p>
  `;
}


async function renderAllQuestions() {
  const app = document.getElementById("app");

  const questions = loadQuestions();

  app.innerHTML = `
    <h2>Allar spurningar (${questions.length})</h2>
    <input id="search" class="search-input" placeholder="Leita að spurningu...">
    <ul id="questionList" class="questions-list"></ul>
  `;

  const listEl = document.getElementById("questionList");
  const searchEl = document.getElementById("search");

  function drawList(items) {
    listEl.innerHTML = items
      .map(
        (q) => `
        <li>
          <strong>${q.question}</strong><br>
          <small>Svar: ${q.answer}</small>
        </li>
      `
      )
      .join("");
  }

  drawList(questions);

  searchEl.addEventListener("input", () => {
    const term = searchEl.value.toLowerCase();

    const filtered = questions.filter(
      (q) =>
        q.question.toLowerCase().includes(term) ||
        q.answer.toLowerCase().includes(term)
    );

    drawList(filtered);
  });
}


let quizIndex = 0;
let quizQuestions = [];

function renderQuiz() {
  const app = document.getElementById("app");

  if (quizQuestions.length === 0) {
    quizQuestions = loadQuestions();
    quizIndex = 0;
  }

  const q = quizQuestions[quizIndex];

  app.innerHTML = `
    <h2>Quiz</h2>

    <div class="quiz-card">
      <p><strong>Spurning ${quizIndex + 1} af ${quizQuestions.length}</strong></p>

      <h3>${q.question}</h3>

      <button id="showAnswer">Sýna svar</button>
      <p id="answer" style="display:none; margin-top:10px;">
        <strong>Svar:</strong> ${q.answer}
      </p>

      <div class="quiz-controls">
        <button id="prevBtn" ${quizIndex === 0 ? "disabled" : ""}>Fyrri</button>
        <button id="nextBtn" ${
          quizIndex === quizQuestions.length - 1 ? "disabled" : ""
        }>Næsta</button>
      </div>
    </div>
  `;

  document.getElementById("showAnswer").addEventListener("click", () => {
    document.getElementById("answer").style.display = "block";
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (quizIndex > 0) {
      quizIndex--;
      renderQuiz();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (quizIndex < quizQuestions.length - 1) {
      quizIndex++;
      renderQuiz();
    }
  });
}


