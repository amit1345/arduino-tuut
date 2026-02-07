(function () {
  'use strict';

  const views = {
    home: document.getElementById('view-home'),
    projects: document.getElementById('view-projects'),
    project: document.getElementById('view-project'),
    pdf: document.getElementById('view-pdf')
  };

  const projectEls = {
    title: document.getElementById('project-title'),
    tutorialContent: document.getElementById('tutorial-content'),
    pdfLink: document.getElementById('pdf-link'),
    stepsList: document.getElementById('steps-list'),
    buildChecklist: document.getElementById('build-checklist'),
    quizIntro: document.getElementById('quiz-intro'),
    quizArea: document.getElementById('quiz-area'),
    quizQuestion: document.getElementById('quiz-question'),
    quizOptions: document.getElementById('quiz-options'),
    quizFeedback: document.getElementById('quiz-feedback'),
    quizFeedbackText: document.getElementById('quiz-feedback-text'),
    quizFixText: document.getElementById('quiz-fix-text'),
    quizNextBtn: document.getElementById('quiz-next-btn'),
    quizDone: document.getElementById('quiz-done'),
    quizScoreText: document.getElementById('quiz-score-text'),
    quizStartBtn: document.getElementById('quiz-start-btn'),
    quizRestartBtn: document.getElementById('quiz-restart-btn'),
    photoInput: document.getElementById('photo-input'),
    photoPreview: document.getElementById('photo-preview'),
    previewImg: document.getElementById('preview-img'),
    checkResult: document.getElementById('check-result'),
    checkResultText: document.getElementById('check-result-text')
  };

  let currentProject = null;
  let quizState = { index: 0, score: 0, answers: [] };

  function showView(name) {
    Object.keys(views).forEach(function (key) {
      views[key].classList.toggle('active', key === name);
    });
  }

  function parseHash() {
    const hash = window.location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    if (parts[0] === 'project' && parts[1]) {
      const id = parseInt(parts[1], 10);
      const project = ARDUINO_PROJECTS.find(function (p) { return p.id === id; });
      if (project) {
        showView('project');
        renderProject(project);
        return;
      }
    }
    if (parts[0] === 'projects') {
      showView('projects');
      renderProjectsGrid();
      return;
    }
    if (parts[0] === 'pdf') {
      showView('pdf');
      return;
    }
    showView('home');
  }

  function renderProjectsGrid() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = ARDUINO_PROJECTS.map(function (p) {
      return (
        '<a href="#project/' + p.id + '" class="project-card">' +
          '<span class="project-card-num">Project ' + String(p.id).padStart(2, '0') + '</span>' +
          '<h3>' + escapeHtml(p.title) + '</h3>' +
        '</a>'
      );
    }).join('');
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderProject(project) {
    currentProject = project;
    projectEls.title.textContent = 'Project ' + String(project.id).padStart(2, '0') + ': ' + project.title;

    // Tutorial
    projectEls.tutorialContent.innerHTML =
      '<p>' + escapeHtml(project.summary) + '</p>' +
      '<h3>Components</h3><ul>' +
      project.components.map(function (c) { return '<li>' + escapeHtml(c) + '</li>'; }).join('') +
      '</ul>';
    projectEls.pdfLink.href = PDF_BOOK_URL;
    projectEls.pdfLink.textContent = 'Open Arduino Projects Book PDF';

    // Steps
    projectEls.stepsList.innerHTML = project.steps.map(function (s) {
      return '<li>' + escapeHtml(s) + '</li>';
    }).join('');

    // Tabs
    document.querySelectorAll('#view-project .tab').forEach(function (tab) {
      tab.classList.remove('active');
      if (tab.getAttribute('data-tab') === 'tutorial') tab.classList.add('active');
    });
    document.querySelectorAll('#view-project .tab-panel').forEach(function (panel) {
      panel.classList.remove('active');
      if (panel.id === 'tab-tutorial') panel.classList.add('active');
    });

    // Quiz reset
    projectEls.quizIntro.classList.remove('hidden');
    projectEls.quizArea.classList.add('hidden');
    projectEls.quizDone.classList.add('hidden');
    projectEls.quizFeedback.classList.add('hidden');
    quizState = { index: 0, score: 0, answers: [] };

    // Checklist
    projectEls.buildChecklist.innerHTML = project.buildChecklist.map(function (item, i) {
      var id = 'check-' + project.id + '-' + i;
      return (
        '<li><input type="checkbox" id="' + id + '">' +
        '<label for="' + id + '">' + escapeHtml(item) + '</label></li>'
      );
    }).join('');

    projectEls.photoPreview.classList.add('hidden');
    projectEls.checkResult.classList.add('hidden');
    projectEls.photoInput.value = '';
  }

  function switchTab(tabName) {
    document.querySelectorAll('#view-project .tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll('#view-project .tab-panel').forEach(function (panel) {
      panel.classList.toggle('active', panel.id === 'tab-' + tabName);
    });
  }

  function startQuiz() {
    if (!currentProject || !currentProject.quiz.length) return;
    projectEls.quizIntro.classList.add('hidden');
    projectEls.quizArea.classList.remove('hidden');
    projectEls.quizDone.classList.add('hidden');
    quizState = { index: 0, score: 0, answers: [] };
    showQuizQuestion();
  }

  function showQuizQuestion() {
    const q = currentProject.quiz[quizState.index];
    projectEls.quizFeedback.classList.add('hidden');
    projectEls.quizQuestion.textContent = q.question;
    projectEls.quizOptions.innerHTML = q.options.map(function (opt, i) {
      return '<button type="button" class="quiz-option" data-index="' + i + '">' + escapeHtml(opt) + '</button>';
    });
    projectEls.quizOptions.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        const chosen = parseInt(btn.getAttribute('data-index'), 10);
        const correct = q.correctIndex === chosen;
        if (correct) quizState.score++;
        projectEls.quizOptions.querySelectorAll('.quiz-option').forEach(function (b) {
          b.disabled = true;
          var idx = parseInt(b.getAttribute('data-index'), 10);
          if (idx === q.correctIndex) b.classList.add('correct');
          else if (idx === chosen && !correct) b.classList.add('wrong');
        });
        projectEls.quizFeedback.classList.remove('hidden');
        projectEls.quizFeedback.classList.toggle('correct', correct);
        projectEls.quizFeedback.classList.toggle('wrong', !correct);
        projectEls.quizFeedbackText.textContent = correct
          ? 'Correct!'
          : 'Not quite. The correct answer is: ' + q.options[q.correctIndex];
        projectEls.quizFixText.textContent = correct ? '' : 'How to fix: ' + q.fixExplanation;
        projectEls.quizFixText.style.display = correct ? 'none' : 'block';
        projectEls.quizNextBtn.style.display = 'block';
      });
    });
  }

  function nextQuizQuestion() {
    quizState.index++;
    if (quizState.index >= currentProject.quiz.length) {
      projectEls.quizArea.classList.add('hidden');
      projectEls.quizDone.classList.remove('hidden');
      projectEls.quizScoreText.textContent =
        'You got ' + quizState.score + ' out of ' + currentProject.quiz.length + ' correct.';
      return;
    }
    showQuizQuestion();
  }

  function restartQuiz() {
    projectEls.quizDone.classList.add('hidden');
    startQuiz();
  }

  function onPhotoSelected(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    projectEls.previewImg.src = url;
    projectEls.photoPreview.classList.remove('hidden');

    var checked = projectEls.buildChecklist.querySelectorAll('input:checked').length;
    var total = projectEls.buildChecklist.querySelectorAll('input').length;
    projectEls.checkResult.classList.remove('hidden');
    projectEls.checkResult.classList.remove('ok', 'review');
    if (checked === total && total > 0) {
      projectEls.checkResult.classList.add('ok');
      projectEls.checkResultText.textContent =
        'You’ve checked all items. Compare your photo with the diagram in the PDF — if everything matches, your build is OK according to the book.';
    } else {
      projectEls.checkResult.classList.add('review');
      projectEls.checkResultText.textContent =
        'Compare your build with the PDF diagram and the checklist above. Check off each item when it matches. When all are checked, your build is OK according to the book.';
    }
  }

  function onChecklistChange() {
    if (!projectEls.photoPreview.classList.contains('hidden')) {
      var checked = projectEls.buildChecklist.querySelectorAll('input:checked').length;
      var total = projectEls.buildChecklist.querySelectorAll('input').length;
      projectEls.checkResult.classList.remove('hidden');
      projectEls.checkResult.classList.remove('ok', 'review');
      if (checked === total && total > 0) {
        projectEls.checkResult.classList.add('ok');
        projectEls.checkResultText.textContent =
          'All items checked. Your build matches the PDF checklist.';
      } else {
        projectEls.checkResult.classList.add('review');
        projectEls.checkResultText.textContent =
          'Check off each item as you verify it against the PDF. When all are checked, your build is OK.';
      }
    }
  }

  // Nav links
  document.querySelector('a[href="#home"]').addEventListener('click', function () {
    showView('home');
    window.location.hash = 'home';
  });
  document.querySelector('a[href="#projects"]').addEventListener('click', function () {
    window.location.hash = 'projects';
    showView('projects');
    renderProjectsGrid();
  });
  document.querySelector('a[href="#pdf"]').addEventListener('click', function () {
    window.location.hash = 'pdf';
    showView('pdf');
  });

  document.querySelectorAll('#view-project .tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(tab.getAttribute('data-tab'));
    });
  });

  if (projectEls.quizStartBtn) projectEls.quizStartBtn.addEventListener('click', startQuiz);
  if (projectEls.quizNextBtn) projectEls.quizNextBtn.addEventListener('click', nextQuizQuestion);
  if (projectEls.quizRestartBtn) projectEls.quizRestartBtn.addEventListener('click', restartQuiz);
  if (projectEls.photoInput) projectEls.photoInput.addEventListener('change', onPhotoSelected);

  projectEls.buildChecklist.addEventListener('change', onChecklistChange);

  window.addEventListener('hashchange', parseHash);
  parseHash();
})();
