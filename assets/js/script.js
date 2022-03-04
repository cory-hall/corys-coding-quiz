var count = 0;

var test = [
   {
      "question": "What are the three components to Web Development?",
      "answer1": "A. Java, CSS, HTML",
      "answer2": "B. CSS, Python, HTML",
      "answer3": "C. JavaScript, C++, HTML",
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

   pagePop.push("<header><a href=#>High Scores</a>");
   pagePop.push("<p id=timer>Time: </p></header>")
   pagePop.push("<main class=test>");
   
   var question = test[count].question;
   pagePop.push("<h1 class=question>" + question + "</h1>");
   pagePop.push("<section class='answers'>");
 

   var answer1 = test[count].answer1;
   var answer2 = test[count].answer2;
   var answer3 = test[count].answer3;
   var answer4 = test[count].answer4;
   pagePop.push("<button class='btn' id='answer1'>" + answer1 + "</button>");
   pagePop.push("<button class='btn' id='answer2'>" + answer2 + "</button>");
   pagePop.push("<button class='btn' id='answer3'>" + answer3 + "</button>");
   pagePop.push("<button class='btn' id='answer4'>" + answer4 + "</button>");
   pagePop.push("</main>");

   pagePop = pagePop.join("");
   document.body.innerHTML = pagePop;

   console.log(test[count]);
};

$("body").on("click", "#start-btn", function(){
   console.log("first");
   testPage(count);
});

$("body").on("click", ".btn", function() {
   if (count < test.length) {
      testPage();
      count++;
   } else {
      alert("Yes");
   }
});
$("#timer")
var time = setInterval(function () {time.innerHTML += "Hello"}, 1000);

addEventListener("load", landing);

