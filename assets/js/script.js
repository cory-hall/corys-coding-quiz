var count = 0;
var initials = "";
var score = null;
var localHighScores = [];
var userScore = [];



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

function getHighScores() {
   var highScores = []
   highScores = localStorage.getItem("high-scores");

   if (highScores !== null) {
      highScores = JSON.parse(highScores);
      for (var i = 0; i < highScores.length; i++) {
         localHighScores.push(highScores[i]);
      }
   }
}

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

function testPage() {
   var pagePop = [];

   if (count === test.length) {
      return endPage();
   }

   pagePop.push("<header>");
   pagePop.push("<p id=timer>Time Left:</p></header>");
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

function endPage() {
   var pagePop = [];

   pagePop.push("<main class=end-page>");
   pagePop.push("<h1>Great job, you completed this challenge and received a score of:</h1>");
   pagePop.push("<h1 id=personal-score>" + timer + "</h1>");
   pagePop.push("<p>Enter your initials to save your score.</p>");
   pagePop.push("<input type=text id=initials name=initials>");
   pagePop.push("<input type=submit value=submit id=submit>");
   pagePop.push("<button class=btn id=try-again>Try Again</button>");
   pagePop.push("<button class=btn id=high-scores>High Scores</button></main>");

   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;

   initials = document.querySelector("#initials");
};

function highScoresPage() {
   var pagePop = [];

   pagePop.push("<main class=high-scores>");
   pagePop.push("<h1>Local High Scores:");
   pagePop.push("<ul id=high-score-list>");

   for (var i = 0; i < localHighScores.length; i++) {
      pagePop.push("<li>" + localHighScores[i].initials + " " + localHighScores[i].score);
   }

   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;
};

var timer = 10;
var time = null

function startTime() {
   time = setInterval(timeInterval, 1000);
};

var timeInterval = function updateTime() {
   $("#timer").html("Time Left: " + timer);
   timer--;

   if (timer == 0) {
      clearInterval(timeInterval);
      retry();
      endPage();
   }
};

function retry() {
   clearInterval(time);
   count = 0;
}

$("body").on("click", "#start-btn", function () {
   testPage(count);
   startTime();
   console.log(count);
});

$("body").on("click", ".answer-btn", function (event) {

   var selection = event.target.id;
   if (count < test.length) {
      if (selection == test[count].correctAnswer) {
         alert("Correct");
         count++;
         testPage(count);
      } else {
         timer = timer - 10;
         alert("Wrong");
         count++;
         testPage(count);
      }
   } else {
      retry();
      endPage();
   }
});

$("body").on("click", "#try-again", function () {
   retry();
   startTime();
   testPage(count);
});

$("body").on("click", "#submit", function () {
   initials = $("#initials").val();

   userScore = {
      name: initials,
      score: timer
   };
   getHighScores();
   localHighScores.push(userScore);
   localStorage.setItem("high-scores", JSON.stringify(localHighScores));

   alert("Data is saved. Thank you.");
})

$("body").on("click", "#high-score-btn", function () {
   highScoresPage();
})




addEventListener("load", landing);

