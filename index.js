(async () => {
  const flashcards = await fetch("./diagnoza.json").then((res) => res.json());
  let index = 0;
  const answered = [];
  const flashcardsCount = flashcards.length;
  const progress = document.getElementById("progress");
  progress.max = flashcardsCount;
  const progressText = document.getElementById("progress-text");
  console.log(flashcards.length);
  const flashcardsHtml = flashcards.map((flashcard) => {
    console.log(flashcard);
    return `
    ${flashcard.question.replace(/\n/g, "<br/>")}
    <label class="answer-label">
      <span class="check-answer">Sprawdź odpowiedź</span>
      <input type="checkbox" />
      <span>
    ${flashcard.answers
      .replace(/\n/, "<br/>")
      .replace(/\n/g, "<br/>")
      .replace(/\*\*(.+)\*\*/g, `<strong>${"$1"}</strong>`)
      .replace(/==(\S+)==/g, `<strong>${"$1"}</strong>`)}
      </span>
    </label>
    `;
  });

  document.getElementById("next").addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * flashcardsCount);
    if (!answered.includes(randomIndex)) {
      index = randomIndex;
      answered.push(randomIndex);
      progress.value = answered.length;
      progressText.innerHTML = `${answered.length}/${flashcardsCount}`;
    }
    if (index >= flashcards.length) {
      index = 0;
    }

    document.getElementById("main").innerHTML = flashcardsHtml[index];
  });
})();
