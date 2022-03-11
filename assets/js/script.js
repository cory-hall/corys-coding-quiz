// global variables
var count = 0;
var initials = "";
var score = null;
var localHighScores = [];
var userScore = [];
var timer = 90;
var time;

// test questions
var test = [
   {
      "question": "What are the three components to Web Development?",
      "answer1": "A. Java, CSS, HTML",
      "answer2": "B. CSS, Python, HTML",
      "answer3": "C. JavaScript, CSS, HTML",
      "answer4": "D. Mark Up, Mark Down, Mark Sideways",
      "correctAnswer": "answer3"
   },
   {
      "question": "Which is NOT a JavaScript library.",
      "answer1": "A. JQuery",
      "answer2": "B. Bootstrap",
      "answer3": "C. React",
      "answer4": "D. Python",
      "correctAnswer": "answer4"
   },
   {
      "question": "Which HTML element is used to access JavaScript?",
      "answer1": "A. javascript",
      "answer2": "B. script",
      "answer3": "C. scripting",
      "answer4": "D. js",
      "correctAnswer": "answer2"
   }
];

// function to populate the landing page
function landing() {
   var pagePop = [];

   pagePop.push("<main class=landing>");
   pagePop.push("<h1>Cory's Coding Quiz!</h1>")
   pagePop.push("<p>This is just a simple web page designed to showcase my abilities to dynamically populate a page with JavaScript, " +
      "although it is fully functioning with a personal score and a leader board.</p>");
   pagePop.push("<button class=btn id='start-btn'>Begin</button>");
   pagePop.push("<button class=btn id=high-score-btn>High Scores</button></main>")

   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;
};

// function to populate the testing page
function testPage() {
   var pagePop = [];

   if (count === test.length) {
      return endPage();
   }

   pagePop.push("<header>");
   pagePop.push("<p id=timer>Time left:</p></header>");
   pagePop.push("<main class=test>");

   var question = test[count].question;
   pagePop.push("<h1 class=question>" + question + "</h1>");
   pagePop.push("<section class='answers'>");


   var answer1 = test[count].answer1;
   var answer2 = test[count].answer2;
   var answer3 = test[count].answer3;
   var answer4 = test[count].answer4;
   pagePop.push("<button class='answer-btn' id='answer1'>" + answer1 + "</button>");
   pagePop.push("<button class='answer-btn' id='answer2'>" + answer2 + "</button>");
   pagePop.push("<button class='answer-btn' id='answer3'>" + answer3 + "</button>");
   pagePop.push("<button class='answer-btn' id='answer4'>" + answer4 + "</button>");
   pagePop.push("</main>");

   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;

};

// function to populate the ending page
function endPage() {
   var pagePop = [];

   if (timer < 0) {
      timer = 0;
   }

   pagePop.push("<main class=end-page>");
   pagePop.push("<h1>Great job, you completed this challenge and received a score of:</h1>");
   pagePop.push("<h1 id=personal-score>" + timer + "</h1>");
   pagePop.push("<p>Enter your initials to save your score.</p>");
   pagePop.push("<div id=submit-score> <input type=text id=initials name=initials>");
   pagePop.push("<input type=submit value=submit id=submit></div>");
   pagePop.push("<button class=btn id=try-again>Try Again</button>");
   pagePop.push("<button class=btn id=high-score-btn>High Scores</button></main>");

   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;

   initials = document.querySelector("#initials");
   clearInterval(time);
};

// function to populate the high scores page
function highScoresPage() {
   var pagePop = [];

   pagePop.push("<main class=high-scores>");
   pagePop.push("<h1>Local High Scores:</h1>");


   getHighScores();
   if (localHighScores) {
      for (var i = 0; i < localHighScores.length; i++) {
         var name = localHighScores[i].name;
         var score = localHighScores[i].score;

         pagePop.push("<p>" + name + ": " + score + "</p><br>");
      }
   }


   pagePop.push("<button class=btn id=landing-page-btn>Go Back</button>")
   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;
};

// function to start the countdown timer
function startTime() {

   time = setInterval(function () {
      $("#timer").html("Time left: " + timer);
      if (timer >= 1) {
         timer--;
      } else {
         clearInterval(time);
         endPage();
      }
   }, 1000);
};

// function to reset timer and index for question array
function retry() {
   clearInterval(time);
   count = 0;
   timer = 90;
   testPage(count);
}

// eventListener to start the test from landing page
$("body").on("click", "#start-btn", function () {
   testPage(count);
   retry();
   startTime();
});

// eventListener to go to next test question
// also houses logic for keeping test score
$("body").on("click", ".answer-btn", function (event) {

   var selection = event.target.id;
   if (count < test.length) {
      if (selection == test[count].correctAnswer) {
         alert("Correct!");
         count++;
         testPage(count);
      } else {
         timer = timer - 10;
         alert("Wrong, 10 points deducted from score.");
         count++;
         testPage(count);
      }
   } else {
      endPage();
   }
});

// eventListener to restart the quiz
$("body").on("click", "#try-again", function () {
   retry();
   startTime();
});

// eventListener to submit personal score to high scores
$("body").on("click", "#submit", function () {
   initials = $("#initials").val();

   if (initials !== null) {
      userScore = {
         "name": initials,
         "score": timer
      };
      localHighScores.push(userScore);
      localStorage.setItem("high-scores", JSON.stringify(localHighScores));

      alert("Data is saved. Thank you.");
      $("#initials").hide();
      $("#submit").hide();
      $("p").hide();
   } else {
      alert("Score not saved");
   }
});

// function to get high scores from localStorage
function getHighScores() {
   localHighScores = JSON.parse(localStorage.getItem("high-scores"));

   if (localHighScores) {
      return localHighScores
   } else {
      localHighScores = [];
   }
};

// eventListener to go to high scores page
$("body").on("click", "#high-score-btn", function () {
   highScoresPage();
})

$("body").on("click", "#landing-page-btn", function () {
   landing();
})

// on page load, run landing function
addEventListener("load", landing);

