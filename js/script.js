$(document).ready(function () {
  initRegister();
  initQuizzesSearch();
  initLeaderboard();
  initGallery();
  initBackToTop();
  initQuizGame();
});

function initRegister() {
  var $form = $("#registrationForm");
  if ($form.length === 0) return;

  var $name = $("#regFullName");
  var $email = $("#regEmail");
  var $password = $("#regPassword");
  var $confirm = $("#regConfirmPassword");
  var $terms = $("#regTerms");

  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s'-]{3,50}$/;

  $name.on("input blur", function () {
    checkName();
  });

  $email.on("input blur", function () {
    checkEmail();
  });

  $password.on("input", function () {
    var val = $(this).val();
    checkPasswordStrength(val);
    if ($confirm.val().length > 0) {
      checkConfirmPassword();
    }
  });

  $confirm.on("input blur", function () {
    checkConfirmPassword();
  });

  $terms.on("change", function () {
    checkTerms();
  });

  $form.on("submit", function (e) {
    e.preventDefault();

    var validName = checkName();
    var validEmail = checkEmail();
    var validPass = checkPassword();
    var validConfirm = checkConfirmPassword();
    var validTerms = checkTerms();

    if (validName && validEmail && validPass && validConfirm && validTerms) {
      $("#formAlertError").slideUp(200);
      $("#formAlertSuccess")
        .html("<strong>Welcome, " + $name.val() + "!</strong> Registration completed successfully.")
        .slideDown(300);

      setTimeout(function () {
        $form[0].reset();
        $(".is-valid").removeClass("is-valid");
        $(".is-invalid").removeClass("is-invalid");
        checkPasswordStrength("");
      }, 2000);
    } else {
      $("#formAlertSuccess").slideUp(200);
      $("#formAlertError")
        .html("Please fill all required fields correctly.")
        .slideDown(300);
      $form.find(".is-invalid").first().focus();
    }
  });

  function checkName() {
    var val = $name.val().trim();
    if (val === "" || !nameRegex.test(val)) {
      $name.removeClass("is-valid").addClass("is-invalid");
      $("#nameFeedback").text("Please enter a valid name (at least 3 characters).").show();
      return false;
    }
    $name.removeClass("is-invalid").addClass("is-valid");
    $("#nameFeedback").hide();
    return true;
  }

  function checkEmail() {
    var val = $email.val().trim();
    if (val === "" || !emailRegex.test(val)) {
      $email.removeClass("is-valid").addClass("is-invalid");
      $("#emailFeedback").text("Please enter a valid email address.").show();
      return false;
    }
    $email.removeClass("is-invalid").addClass("is-valid");
    $("#emailFeedback").hide();
    return true;
  }

  function checkPasswordStrength(val) {
    var $bar = $("#passwordStrengthBar");
    var $text = $("#passwordStrengthText");

    if (!val) {
      $bar.removeClass("strength-weak strength-medium strength-strong").css("width", "0%");
      $text.text("Password strength: None").css("color", "#6c757d");
      return 0;
    }

    var score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) score++;

    $bar.removeClass("strength-weak strength-medium strength-strong");

    if (val.length < 6 || score <= 2) {
      $bar.addClass("strength-weak");
      $text.text("Password strength: Weak").css("color", "#dc3545");
      return 1;
    } else if (score >= 3 && score <= 4) {
      $bar.addClass("strength-medium");
      $text.text("Password strength: Medium").css("color", "#ffc107");
      return 2;
    } else {
      $bar.addClass("strength-strong");
      $text.text("Password strength: Strong").css("color", "#198754");
      return 3;
    }
  }

  function checkPassword() {
    var val = $password.val();
    if (!val || val.length < 6) {
      $password.removeClass("is-valid").addClass("is-invalid");
      $("#passwordFeedback").text("Password must be at least 6 characters.").show();
      return false;
    }
    $password.removeClass("is-invalid").addClass("is-valid");
    $("#passwordFeedback").hide();
    return true;
  }

  function checkConfirmPassword() {
    var p1 = $password.val();
    var p2 = $confirm.val();
    if (!p2 || p1 !== p2) {
      $confirm.removeClass("is-valid").addClass("is-invalid");
      $("#confirmPasswordFeedback").text("Passwords do not match.").show();
      return false;
    }
    $confirm.removeClass("is-invalid").addClass("is-valid");
    $("#confirmPasswordFeedback").hide();
    return true;
  }

  function checkTerms() {
    if (!$terms.is(":checked")) {
      $terms.removeClass("is-valid").addClass("is-invalid");
      return false;
    }
    $terms.removeClass("is-invalid").addClass("is-valid");
    return true;
  }
}

function initQuizzesSearch() {
  var $input = $("#quizSearchInput");
  var $btns = $(".category-filter-btn");
  var $cards = $(".quiz-card-wrapper");
  var $clear = $("#clearSearchBtn");
  var $noResults = $("#noQuizzesAlert");
  var $countBadge = $("#quizzesCountBadge");

  if ($cards.length === 0) return;

  var activeCategory = "all";
  var searchText = "";

  $btns.on("click", function () {
    $btns.removeClass("active btn-primary").addClass("btn-outline-secondary");
    $(this).addClass("active btn-primary").removeClass("btn-outline-secondary");
    activeCategory = $(this).attr("data-category") || "all";
    filterCards();
  });

  $input.on("input keyup", function () {
    searchText = $(this).val().toLowerCase().trim();
    if (searchText.length > 0) {
      $clear.show();
    } else {
      $clear.hide();
    }
    filterCards();
  });

  $clear.on("click", function () {
    $input.val("").trigger("input").focus();
  });

  function filterCards() {
    var count = 0;

    $cards.each(function () {
      var $card = $(this);
      var category = ($card.attr("data-category") || "").toLowerCase();
      var title = ($card.find(".quiz-title").text() || "").toLowerCase();
      var desc = ($card.find(".quiz-desc").text() || "").toLowerCase();

      var matchCat = activeCategory === "all" || category === activeCategory;
      var matchText = !searchText || title.indexOf(searchText) !== -1 || desc.indexOf(searchText) !== -1;

      if (matchCat && matchText) {
        $card.stop(true, true).fadeIn(200);
        count++;
      } else {
        $card.stop(true, true).fadeOut(200);
      }
    });

    if ($countBadge.length) {
      $countBadge.text("Showing " + count + " of " + $cards.length + " quizzes");
    }

    if (count === 0) {
      $noResults.stop(true, true).fadeIn(200);
    } else {
      $noResults.stop(true, true).fadeOut(150);
    }
  }
}

function initLeaderboard() {
  var $tbody = $("#leaderboardTableBody");
  if ($tbody.length === 0) return;

  var storageKey = "quizhub_leaderboard_data";

  var defaultPlayers = [
    { id: 1, name: "Alikhan M.", category: "Frontend Development", quizzes: 48, accuracy: 98.5, score: 9850 },
    { id: 2, name: "Diana K.", category: "Astana IT Trivia", quizzes: 42, accuracy: 96.0, score: 8920 },
    { id: 3, name: "Nurbol S.", category: "World History", quizzes: 37, accuracy: 94.2, score: 8140 },
    { id: 4, name: "Amina T.", category: "Computer Science", quizzes: 31, accuracy: 91.8, score: 7650 },
    { id: 5, name: "Daulet B.", category: "Science & Nature", quizzes: 28, accuracy: 89.0, score: 6980 },
    { id: 6, name: "Aruzhan Z.", category: "Pop Culture", quizzes: 25, accuracy: 88.4, score: 6420 }
  ];

  function getPlayers() {
    var saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.log(err);
      }
    }
    setPlayers(defaultPlayers);
    return defaultPlayers;
  }

  function setPlayers(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  var players = getPlayers();

  function render(highlightId) {
    players.sort(function (a, b) {
      return b.score - a.score;
    });

    $tbody.empty();

    if (players.length === 0) {
      $tbody.html('<tr><td colspan="7" class="text-center py-4 text-muted">No records found. Click "Add New Player" to add one.</td></tr>');
      updateStats();
      return;
    }

    $.each(players, function (idx, p) {
      var rank = idx + 1;
      var rankBadge = "#" + rank;
      if (rank === 1) rankBadge = "🥇 #1";
      if (rank === 2) rankBadge = "🥈 #2";
      if (rank === 3) rankBadge = "🥉 #3";

      var trClass = highlightId && p.id === highlightId ? ' class="row-highlight"' : "";

      var row = '<tr' + trClass + ' data-id="' + p.id + '">' +
        '<td><strong>' + rankBadge + '</strong></td>' +
        '<td><strong>' + escapeText(p.name) + '</strong></td>' +
        '<td><span class="badge bg-light text-dark border">' + escapeText(p.category) + '</span></td>' +
        '<td>' + p.quizzes + '</td>' +
        '<td>' + Number(p.accuracy).toFixed(1) + '%</td>' +
        '<td><strong class="text-primary">' + Number(p.score).toLocaleString() + ' pts</strong></td>' +
        '<td class="text-end">' +
          '<button class="btn btn-sm btn-outline-primary btn-edit-player table-action-btn" data-id="' + p.id + '">Edit</button>' +
          '<button class="btn btn-sm btn-outline-danger btn-delete-player table-action-btn" data-id="' + p.id + '">Delete</button>' +
        '</td>' +
      '</tr>';

      $tbody.append(row);
    });

    updateStats();
  }

  function updateStats() {
    if (players.length > 0) {
      $("#statTopPlayer").text(players[0].name);
      $("#statHighestScore").text(Number(players[0].score).toLocaleString() + " pts");
      var total = 0;
      $.each(players, function (_, p) {
        total += Number(p.quizzes);
      });
      $("#statTotalQuizzes").text(total.toLocaleString() + " Quizzes");
    } else {
      $("#statTopPlayer").text("—");
      $("#statHighestScore").text("0 pts");
      $("#statTotalQuizzes").text("0 Quizzes");
    }
  }

  $("#btnOpenAddModal").on("click", function () {
    $("#playerModalLabel").text("Add New Leaderboard Player");
    $("#playerForm")[0].reset();
    $("#playerId").val("");
    $("#playerModalError").hide();
    var modal = new bootstrap.Modal(document.getElementById("playerModal"));
    modal.show();
  });

  $tbody.on("click", ".btn-edit-player", function () {
    var id = Number($(this).attr("data-id"));
    var player = null;
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === id) {
        player = players[i];
        break;
      }
    }
    if (!player) return;

    $("#playerModalLabel").text("Edit Leaderboard Player");
    $("#playerId").val(player.id);
    $("#playerName").val(player.name);
    $("#playerCategory").val(player.category);
    $("#playerQuizzes").val(player.quizzes);
    $("#playerAccuracy").val(player.accuracy);
    $("#playerScore").val(player.score);
    $("#playerModalError").hide();

    var modal = new bootstrap.Modal(document.getElementById("playerModal"));
    modal.show();
  });

  $("#playerForm").on("submit", function (e) {
    e.preventDefault();

    var idVal = $("#playerId").val();
    var name = $("#playerName").val().trim();
    var cat = $("#playerCategory").val();
    var quizzes = parseInt($("#playerQuizzes").val(), 10);
    var accuracy = parseFloat($("#playerAccuracy").val());
    var score = parseInt($("#playerScore").val(), 10);

    if (!name || !cat || isNaN(quizzes) || isNaN(accuracy) || isNaN(score)) {
      $("#playerModalError").text("Please fill all fields correctly.").show();
      return;
    }

    if (accuracy < 0 || accuracy > 100) {
      $("#playerModalError").text("Accuracy must be between 0 and 100%.").show();
      return;
    }

    var affectedId = null;

    if (idVal) {
      var editId = Number(idVal);
      for (var i = 0; i < players.length; i++) {
        if (players[i].id === editId) {
          players[i] = {
            id: editId,
            name: name,
            category: cat,
            quizzes: quizzes,
            accuracy: accuracy,
            score: score
          };
          affectedId = editId;
          break;
        }
      }
    } else {
      var newId = Date.now();
      players.push({
        id: newId,
        name: name,
        category: cat,
        quizzes: quizzes,
        accuracy: accuracy,
        score: score
      });
      affectedId = newId;
    }

    setPlayers(players);
    render(affectedId);

    var modalInst = bootstrap.Modal.getInstance(document.getElementById("playerModal"));
    if (modalInst) {
      modalInst.hide();
    }

    showAlert(idVal ? "Player record updated!" : "New player added!", "success");
  });

  $tbody.on("click", ".btn-delete-player", function () {
    var id = Number($(this).attr("data-id"));
    var player = null;
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === id) {
        player = players[i];
        break;
      }
    }
    if (!player) return;

    if (confirm('Are you sure you want to delete "' + player.name + '"?')) {
      players = $.grep(players, function (p) {
        return p.id !== id;
      });
      setPlayers(players);
      render();
      showAlert('Player "' + player.name + '" deleted.', "warning");
    }
  });

  $("#btnResetLeaderboard").on("click", function () {
    if (confirm("Reset leaderboard to default data?")) {
      players = JSON.parse(JSON.stringify(defaultPlayers));
      setPlayers(players);
      render();
      showAlert("Leaderboard reset to defaults.", "info");
    }
  });

  $("#leaderboardSearchInput").on("input keyup", function () {
    var term = $(this).val().toLowerCase().trim();
    $tbody.find("tr").each(function () {
      var text = $(this).text().toLowerCase();
      if (!term || text.indexOf(term) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  function showAlert(msg, type) {
    $("#tableAlert")
      .attr("class", "alert alert-" + type + " alert-dismissible fade show")
      .html("<span>" + msg + "</span><button type='button' class='btn-close' data-bs-dismiss='alert'></button>")
      .fadeIn(200);

    setTimeout(function () {
      $("#tableAlert").fadeOut(300);
    }, 3000);
  }

  function escapeText(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  render();
}

function initGallery() {
  var $cards = $(".gallery-card");
  var $lightbox = $("#customLightbox");
  if ($cards.length === 0 || $lightbox.length === 0) return;

  var $img = $("#lightboxImage");
  var $title = $("#lightboxCaptionTitle");
  var $desc = $("#lightboxCaptionDesc");
  var $counter = $("#lightboxCounter");

  var currentIndex = 0;
  var items = [];

  $cards.each(function (idx) {
    var $card = $(this);
    var src = $card.find("img").attr("src");
    var t = $card.find(".gallery-title").text();
    var d = $card.find(".gallery-desc").text();
    items.push({ src: src, title: t, desc: d });

    $card.on("click", function () {
      open(idx);
    });
  });

  function open(index) {
    currentIndex = index;
    update();
    $lightbox.css("display", "flex").hide().fadeIn(250);
    $("body").css("overflow", "hidden");
  }

  function close() {
    $lightbox.fadeOut(200, function () {
      $("body").css("overflow", "auto");
    });
  }

  function update(dir) {
    if (items.length === 0) return;
    var item = items[currentIndex];

    if (dir) {
      $img.fadeOut(120, function () {
        $img.attr("src", item.src);
        $title.text(item.title);
        $desc.text(item.desc);
        $counter.text("Image " + (currentIndex + 1) + " of " + items.length);
        $img.fadeIn(150);
      });
    } else {
      $img.attr("src", item.src);
      $title.text(item.title);
      $desc.text(item.desc);
      $counter.text("Image " + (currentIndex + 1) + " of " + items.length);
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    update("next");
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    update("prev");
  }

  $("#lightboxNext").on("click", function (e) {
    e.stopPropagation();
    next();
  });

  $("#lightboxPrev").on("click", function (e) {
    e.stopPropagation();
    prev();
  });

  $("#lightboxClose").on("click", function (e) {
    e.stopPropagation();
    close();
  });

  $lightbox.on("click", function (e) {
    if ($(e.target).closest(".lightbox-content-box, .lightbox-btn").length === 0) {
      close();
    }
  });

  $(document).on("keydown", function (e) {
    if (!$lightbox.is(":visible")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}

function initBackToTop() {
  var $btn = $(".floating-back-btn");
  if ($btn.length === 0) return;

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $btn.fadeIn(200);
    } else {
      $btn.fadeOut(200);
    }
  });

  $btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
  });
}

function initQuizGame() {
  var $modalEl = $("#quizPlayModal");
  if ($modalEl.length === 0) return;

  var quizzes = {
    "cs-html": {
      title: "HTML & CSS Fundamentals",
      category: "Frontend Development",
      questions: [
        {
          q: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlinks Text Management Link",
            "Home Tool Markup Language"
          ],
          correct: 0
        },
        {
          q: "Which CSS property is used to change text color?",
          options: ["font-color", "color", "text-style", "text-color"],
          correct: 1
        },
        {
          q: "Which HTML5 tag is used to specify navigation links?",
          options: ["<header>", "<navigation>", "<nav>", "<section>"],
          correct: 2
        },
        {
          q: "In Flexbox, which property aligns items along the main axis?",
          options: ["align-items", "justify-content", "flex-direction", "align-content"],
          correct: 1
        }
      ]
    },
    "cs-cyber": {
      title: "Cybersecurity & Networking",
      category: "Computer Science",
      questions: [
        {
          q: "What does the 'S' in HTTPS stand for?",
          options: ["Standard", "System", "Secure", "Socket"],
          correct: 2
        },
        {
          q: "Which attack tricks users into revealing confidential data via fake sites?",
          options: ["Phishing", "DDoS", "SQL Injection", "Brute Force"],
          correct: 0
        },
        {
          q: "What is the default port for unencrypted HTTP traffic?",
          options: ["22", "80", "443", "8080"],
          correct: 1
        },
        {
          q: "What is the main purpose of a network firewall?",
          options: [
            "Monitor and filter incoming/outgoing traffic",
            "Speed up computer processing",
            "Create hard drive backups",
            "Generate passwords"
          ],
          correct: 0
        }
      ]
    },
    "science-space": {
      title: "Cosmology & Black Holes",
      category: "Science & Nature",
      questions: [
        {
          q: "What object is at the center of the Milky Way galaxy?",
          options: [
            "Supermassive black hole (Sagittarius A*)",
            "A giant pulsar",
            "A supernova remnant",
            "Our solar system"
          ],
          correct: 0
        },
        {
          q: "Approximately what is the speed of light in a vacuum?",
          options: ["150,000 km/s", "300,000 km/s", "3,000 km/s", "1,000,000 km/s"],
          correct: 1
        },
        {
          q: "Which planet is commonly known as the Red Planet?",
          options: ["Venus", "Jupiter", "Mars", "Saturn"],
          correct: 2
        },
        {
          q: "What is the boundary around a black hole beyond which nothing can escape?",
          options: ["Event Horizon", "Photon Ring", "Accretion Disk", "Singularity"],
          correct: 0
        }
      ]
    },
    "aitu-trivia": {
      title: "Astana IT University Trivia",
      category: "Astana IT Trivia",
      questions: [
        {
          q: "In which city is Astana IT University located?",
          options: ["Almaty", "Astana", "Shymkent", "Karaganda"],
          correct: 1
        },
        {
          q: "Near which famous EXPO pavilion is the AITU campus located?",
          options: ["Nur Alem Sphere", "Baiterek Tower", "Khan Shatyr", "Palace of Peace"],
          correct: 0
        },
        {
          q: "Which block contains the main atrium and lecture halls?",
          options: ["Block C1", "Block B2", "Block A1", "Block D3"],
          correct: 0
        },
        {
          q: "What is the main language of instruction at AITU?",
          options: ["Kazakh", "Russian", "English", "German"],
          correct: 2
        }
      ]
    },
    "pop-cinema": {
      title: "World Cinema & Anime",
      category: "Pop Culture",
      questions: [
        {
          q: "Who directed the 2023 movie 'Oppenheimer'?",
          options: ["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Steven Spielberg"],
          correct: 0
        },
        {
          q: "In 'Attack on Titan', who is known as humanity's strongest soldier?",
          options: ["Eren Yeager", "Armin Arlert", "Erwin Smith", "Levi Ackerman"],
          correct: 3
        },
        {
          q: "Which studio produced 'Spirited Away' and 'My Neighbor Totoro'?",
          options: ["Studio Ghibli", "MAPPA", "Toei Animation", "Ufotable"],
          correct: 0
        },
        {
          q: "Which South Korean film won the Oscar for Best Picture in 2020?",
          options: ["Oldboy", "Parasite", "Train to Busan", "The Handmaiden"],
          correct: 1
        }
      ]
    },
    "history-ancient": {
      title: "Ancient Civilizations & History",
      category: "World History",
      questions: [
        {
          q: "Which ancient civilization built the Great Pyramid of Giza?",
          options: ["Ancient Egypt", "Mesopotamia", "Ancient Greece", "Roman Empire"],
          correct: 0
        },
        {
          q: "What was the ancient trade route connecting China with the West?",
          options: ["The Amber Road", "The Silk Road", "The King's Highway", "The Spice Path"],
          correct: 1
        },
        {
          q: "Which leader was assassinated on the Ides of March in 44 BC?",
          options: ["Julius Caesar", "Alexander the Great", "Nero", "Augustus"],
          correct: 0
        },
        {
          q: "Between which two rivers did ancient Mesopotamia develop?",
          options: ["Tigris and Euphrates", "Nile and Amazon", "Danube and Rhine", "Indus and Ganges"],
          correct: 0
        }
      ]
    }
  };

  var currentQuiz = null;
  var currentIndex = 0;
  var userScore = 0;
  var modal = new bootstrap.Modal(document.getElementById("quizPlayModal"));

  $(".btn-start-quiz").on("click", function () {
    var key = $(this).attr("data-quiz");
    if (!quizzes[key]) return;

    currentQuiz = quizzes[key];
    currentIndex = 0;
    userScore = 0;

    $("#quizModalTitle").text(currentQuiz.title);
    $("#quizQuestionContainer").show();
    $("#quizResultContainer").hide();
    $("#quizSaveAlert").hide();
    $("#quizPlayerNameInput").val("");

    renderQuestion();
    modal.show();
  });

  function renderQuestion() {
    var qData = currentQuiz.questions[currentIndex];
    var total = currentQuiz.questions.length;

    $("#quizQuestionCounter").text("Question " + (currentIndex + 1) + " of " + total);
    var pct = Math.round(((currentIndex + 1) / total) * 100);
    $("#quizProgressBar").css("width", pct + "%");

    $("#quizQuestionText").text(qData.q);
    $("#quizFeedbackBox").hide().empty();
    $("#quizNextBtn").hide();

    var $optBox = $("#quizOptionsContainer");
    $optBox.empty();

    $.each(qData.options, function (idx, optText) {
      var btn = $('<button type="button" class="quiz-option-btn"></button>')
        .text(optText)
        .attr("data-idx", idx);
      $optBox.append(btn);
    });
  }

  $("#quizOptionsContainer").on("click", ".quiz-option-btn", function () {
    if ($(this).hasClass("correct") || $(this).hasClass("wrong")) return;

    var selectedIdx = Number($(this).attr("data-idx"));
    var qData = currentQuiz.questions[currentIndex];
    var $allBtns = $(".quiz-option-btn");
    $allBtns.prop("disabled", true);

    if (selectedIdx === qData.correct) {
      $(this).addClass("correct");
      userScore++;
      $("#quizFeedbackBox")
        .attr("class", "mt-3 small fw-semibold text-success")
        .text("Correct answer!")
        .show();
    } else {
      $(this).addClass("wrong");
      $allBtns.filter('[data-idx="' + qData.correct + '"]').addClass("correct");
      $("#quizFeedbackBox")
        .attr("class", "mt-3 small fw-semibold text-danger")
        .text("Incorrect! The right answer was: " + qData.options[qData.correct])
        .show();
    }

    $("#quizNextBtn").fadeIn(150);
  });

  $("#quizNextBtn").on("click", function () {
    currentIndex++;
    if (currentIndex < currentQuiz.questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    $("#quizQuestionContainer").hide();
    var total = currentQuiz.questions.length;
    var pct = Math.round((userScore / total) * 100);
    var points = userScore * 250;

    var emoji = "🎉";
    if (pct < 50) emoji = "📚";
    else if (pct < 80) emoji = "👍";

    $("#quizResultEmoji").text(emoji);
    $("#quizResultScore").html("You scored <strong>" + userScore + "</strong> out of <strong>" + total + "</strong> (" + pct + "%) &bull; <strong>" + points + " pts</strong>");
    $("#quizResultContainer").fadeIn(200);
  }

  $("#btnSaveQuizScore").on("click", function () {
    var name = $("#quizPlayerNameInput").val().trim();
    if (!name) {
      alert("Please enter your name first!");
      return;
    }

    var total = currentQuiz.questions.length;
    var pct = Math.round((userScore / total) * 100);
    var points = userScore * 250;

    var storageKey = "quizhub_leaderboard_data";
    var currentData = [];
    var saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        currentData = JSON.parse(saved);
      } catch (e) {
        currentData = [];
      }
    }

    currentData.push({
      id: Date.now(),
      name: name,
      category: currentQuiz.category,
      quizzes: 1,
      accuracy: pct,
      score: points
    });

    localStorage.setItem(storageKey, JSON.stringify(currentData));
    $("#quizSaveAlert").slideDown(200);
    $(this).prop("disabled", true);
  });

  $("#btnRestartQuiz").on("click", function () {
    currentIndex = 0;
    userScore = 0;
    $("#quizQuestionContainer").show();
    $("#quizResultContainer").hide();
    $("#quizSaveAlert").hide();
    $("#btnSaveQuizScore").prop("disabled", false);
    renderQuestion();
  });
}
