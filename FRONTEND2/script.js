(function(){

  const QUESTIONS = [
    {
      kicker: "Trivia",
      text: "What's the name of the coffee shop where the gang hangs out?",
      options: ["Central Perk", "Java Joe's", "The Grind House", "Brew & Chill"],
      correct: 0,
    },
    {
      kicker: "Trivia",
      text: "Who is Ross's first wife, who leaves him for another woman?",
      options: ["Emily", "Susan", "Carol", "Rachel"],
      correct: 2
    },
    {
      kicker: "Trivia",
      text: "What kind of pet does Ross keep in his apartment for a while?",
      options: ["A parrot named Iris", "A monkey named Marcel", "A cat named Duchess", "A ferret named Milo"],
      correct: 1
    },
    {
      kicker: "Trivia",
      text: "Joey has one famous rule at the dinner table. What is it?",
      options: ["Joey doesn't share clothes", "Joey doesn't share food", "Joey doesn't share tips", "Joey doesn't share scripts"],
      correct: 1
    },
    {
      kicker: "Identify the Character",
      text: "Neurotic about cleanliness, fiercely competitive, and the best cook in the group — who is she?",
      options: ["Phoebe", "Rachel", "Monica", "Emily"],
      correct: 2
    },
    {
      kicker: "Identify the Character",
      text: "A paleontologist obsessed with dinosaurs, married three times, and known for saying \"we were on a break\" — who is he?",
      options: ["Chandler", "Joey", "Gunther", "Ross"],
      correct: 3
    },
    {
      kicker: "Identify the Character",
      text: "British, stylish, works in fashion, and briefly becomes Ross's second wife — who is she?",
      options: ["Janice", "Emily", "Elizabeth", "Kathy"],
      correct: 1
    },
    {
      kicker: "Trivia",
      text: "What are the names of Chandler and Monica's twins?",
      options: ["Ben and Emma", "Jack and Erica", "Frank Jr. and Alice", "Molly and Ross"],
      correct: 1
    }
  ];

  const TIME_PER_QUESTION = 20; // seconds

  let current = 0;
  let score = 0;
  let selectedIndex = null;
  let locked = false;
  let timerInterval = null;
  let timeLeft = TIME_PER_QUESTION;

  const screens = {
    welcome: document.getElementById('screen-welcome'),
    quiz: document.getElementById('screen-quiz'),
    results: document.getElementById('screen-results')
  };

  function showScreen(name){
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  function startTimer(){
    clearInterval(timerInterval);
    timeLeft = TIME_PER_QUESTION;
    const fill = document.getElementById('timer-fill');
    fill.style.transition = 'none';
    fill.style.width = '100%';
    // force reflow so the next transition applies cleanly
    void fill.offsetWidth;
    fill.style.transition = 'width 1s linear';

    timerInterval = setInterval(() => {
      timeLeft -= 1;
      const pct = Math.max(0, (timeLeft / TIME_PER_QUESTION) * 100);
      fill.style.width = pct + '%';
      fill.style.backgroundColor = timeLeft <= 5 ? '#C0453C' : 'var(--smiley-yellow)';
      if (timeLeft <= 0){
        clearInterval(timerInterval);
        if (!locked){
          lockAnswer(-1); // time ran out, no selection
        }
      }
    }, 1000);
  }

  function renderQuestion(){
    const q = QUESTIONS[current];
    selectedIndex = null;
    locked = false;

    document.getElementById('progress-label').textContent = `Question ${current + 1} of ${QUESTIONS.length}`;
    document.getElementById('score-label').textContent = `Score: ${score}`;
    document.getElementById('progress-fill').style.width = `${(current / QUESTIONS.length) * 100}%`;

    document.getElementById('question-kicker').textContent = q.kicker;
    document.getElementById('question-text').textContent = q.text;

    const wrap = document.getElementById('options-wrap');
    wrap.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn cursor-pointer text-left px-5 py-4 rounded-xl font-medium text-sm sm:text-base bg-white';
      btn.style.borderColor = 'rgba(62,42,92,0.2)';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectOption(idx));
      wrap.appendChild(btn);
    });

    document.getElementById('btn-next').disabled = true;

    const qw = document.getElementById('question-wrap');
    qw.classList.remove('q-enter');
    void qw.offsetWidth;
    qw.classList.add('q-enter');

    startTimer();
    renderStickers();
  }

  function selectOption(idx){
    if (locked) return;
    selectedIndex = idx;
    const buttons = document.querySelectorAll('#options-wrap .option-btn');
    buttons.forEach((b, i) => b.classList.toggle('selected', i === idx));
    document.getElementById('btn-next').disabled = false;
  }

  function lockAnswer(chosenIdx){
    locked = true;
    clearInterval(timerInterval);
    const q = QUESTIONS[current];
    const buttons = document.querySelectorAll('#options-wrap .option-btn');
    buttons.forEach((b, i) => {
      b.classList.remove('selected');
      b.disabled = true;
      b.classList.remove('cursor-pointer');
      if (i === q.correct) b.classList.add('correct');
      else if (i === chosenIdx) b.classList.add('incorrect');
    });
    if (chosenIdx === q.correct){
      score += 1;
      document.getElementById('score-label').textContent = `Score: ${score}`;
    }
    document.getElementById('btn-next').disabled = false;
  }

  document.getElementById('btn-next').addEventListener('click', () => {
    if (!locked){
      if (selectedIndex === null) return; // guard: must select first
      lockAnswer(selectedIndex);
      // brief pause so the user sees correct/incorrect state, then advance
      document.getElementById('btn-next').disabled = true;
      setTimeout(() => {
        document.getElementById('btn-next').disabled = false;
        document.getElementById('btn-next').focus();
      }, 550);
      return;
    }
    goNext();
  });

  function goNext(){
    current += 1;
    if (current >= QUESTIONS.length){
      finishQuiz();
    } else {
      renderQuestion();
    }
  }

  function finishQuiz(){
    clearInterval(timerInterval);
    document.getElementById('progress-fill').style.width = '100%';
    const pct = Math.round((score / QUESTIONS.length) * 100);

    let badge, title, message;
    if (pct >= 90){
      badge = '🏆'; title = "You're basically Chandler-level quick!";
      message = "Perfect (or nearly perfect) recall of the gang. You could BE any more of a Friends expert.";
    } else if (pct >= 70){
      badge = '☕'; title = "Central Perk Regular";
      message = "Solid knowledge of the gang! A few details slipped by, but you clearly know your way around apartment 20.";
    } else if (pct >= 40){
      badge = '📺'; title = "Casual Viewer";
      message = "You've definitely watched a few episodes — time for a rewatch to catch what you missed!";
    } else {
      badge = '🦆'; title = "Who let the duck in?";
      message = "Not your best showing — but hey, that's what the Restart button is for. Give it another go!";
    }

    document.getElementById('result-badge').textContent = badge;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-score').textContent = `${score}/${QUESTIONS.length} Correct — ${pct}%`;
    document.getElementById('result-message').textContent = message;

    showScreen('results');
  }

  function resetQuiz(){
    current = 0;
    score = 0;
    selectedIndex = null;
    locked = false;
    clearInterval(timerInterval);
    showScreen('quiz');
    renderQuestion();
  }

  document.getElementById('btn-start').addEventListener('click', resetQuiz);
  document.getElementById('btn-restart').addEventListener('click', resetQuiz);

})();