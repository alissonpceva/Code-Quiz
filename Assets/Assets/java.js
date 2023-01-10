function random_Func(length) {
    return Math.floor(Math.random() * length);
}

var updateTimer_Func = function (funTime) {
    
    if (funTime >= 75000) {
        return new Date(funTime).toISOString().substr(15, 4);
    } else if (funTime >= 10000) {
        return new Date(funTime).toISOString().substr(17, 2);
    } else {
        return new Date(funTime).toISOString().substr(18, 1);
    }
}

function countdown_Func() {
    startBtnEl.remove(); 
    highScoresBtn_El.remove();

    main_El.appendChild(preambleEl); 

    preambleEl.textContent = "Get Ready!";

    timer_El.textContent = updateTimer_Func(startTime);

    var funTime = 4000; 

    genQuiz_Func(); 

    var funInterval2 = setInterval(function () { // countdown 
        if (funTime > 1000) {    
            preambleEl.textContent = ((funTime - 1000) / 1000)
            funTime -= 1000;
        } else if (funTime == 1000) {
            preambleEl.textContent = "Go!";
            funTime -= 1000;
        } else {
            clearInterval(funInterval2);
            preambleEl.remove();
            preambleEl.textContent = "";
            go_Func(); // at the end of countdown quiz starts
        }
    }, 1000);
}

function genQuiz_Func() {
    var funRand; 
    var funArray = []; 

    var funQuestions = [...questionList]; 
    var funAnswers = [...answerList]; 

    for (var i = 0; i < questionList.length; i++) {

        funRand = random_Func(funQuestions.length); 

        questionArray[i] = funQuestions[funRand];

        funArray[0] = funAnswers[funRand]; 
        answerArray[i] = funArray; 
        funArray = []; 

        funQuestions.splice(funRand, 1); 
        funAnswers.splice(funRand, 1);
    }
    // add 3 more random options 
    for (var i = 0; i < questionArray.length; i++) { 

        for (var j = 0; j < 3; j++) { // place 3 more answers
            funRand = random_Func(funAnswers.length);
            answerArray[i].push(funAnswers[funRand]); 
            funAnswers.splice(funRand, 1); 
                }
    }
}

function go_Func() {
    quizTime = startTime;
    main_El.appendChild(quiz_El);
    quiz_El.appendChild(questionEl)
    quiz_El.appendChild(answersContainer_El)

    var funInterval = setInterval(function() {
        if (quizTime > 1000) {
            quizTime -= 1000;
            timer_El.textContent = updateTimer_Func(quizTime);
        } else {
            quizTime = 0;

            timer_El.textContent = "Finished!";

            clearInterval(funInterval);

            quiz_El.remove();

            scoreboard_Func();
        }
    }, 1000);

    questionnaire_Func();
}

function questionnaire_Func() {
    var answerEl;


    questionEl.textContent = questionArray[clickCounter];

    //clear questions box
    answersContainer_El.textContent = [];

    if (clickCounter < questionArray.length) {
        //add the answers
        for (var i = 0; i < 4; i++) {
            answerEl = document.createElement("button");
            answerEl.className = "answer";
            answerEl.setAttribute("data-button-id", i);
            answerEl.innerText = answerArray[clickCounter][i];
            answerEl.onclick = factCheck_Func;

            //RANDOM PLACEMENT
            if (i > 0 && random_Func(2) == 0) {
               
                answersContainer_El.insertBefore(answerEl, document.querySelector(".answer[data-button-id='0']"));
            } else {
                
                answersContainer_El.appendChild(answerEl);
            }
        }
    }
    else {
        quizTime = 0;
        quiz_El.remove();
    }
}

function factCheck_Func() {
    if (this.dataset.buttonId == 0){
        console.log("CORRECT!");
        correctAnswers += 100;
    } else {
        console.log("WRONG");
        quizTime -= 15000; 

        var funTime = 2000;
        var deductionEl = document.createElement("h1");
            deductionEl.className = "deduction";
            deductionEl.textContent = "-15";
            banner_El.appendChild(deductionEl);

        //deduction animation 
        var funInterval3 = setInterval(function () {
            if (funTime <= 0) {
                deductionEl.remove();
                clearInterval(funInterval3);
            }
            funTime -= 2000;
        }, 1000);
    }
    clickCounter++;
    questionnaire_Func();
}

function scoreboard_Func() { //scoreboard
    main_El.append(scoreboardEl);
    
    var headingEl = document.createElement("div");
    headingEl.className = "heading";
    headingEl.textContent = "SCORE";
    scoreboardEl.appendChild(headingEl);

    var container_El = document.createElement("div");
    container_El.className = "container";
    scoreboardEl.appendChild(container_El);

    var prompt_El = document.createElement("div");
    prompt_El.textContent = "Enter your initials";
    prompt_El.className = "initials-prompt";
    scoreboardEl.appendChild(prompt_El);

    var initialsEntryBox_El = document.createElement("input"); // initial entry box
    initialsEntryBox_El.type = "text";
    initialsEntryBox_El.className = "inital-entry";
    initialsEntryBox_El.maxLength = "3";
    initialsEntryBox_El.placeholder = "here";

    scoreboardEl.appendChild(initialsEntryBox_El);

    var submitBtn_El = document.createElement("button"); // submit button
    submitBtn_El.className = "submit";
    submitBtn_El.textContent = "SUBMIT";
    submitBtn_El.onclick = function(){
        localStorage.setItem((initialsEntryBox_El.value).toUpperCase(), total_R_El.textContent)
        initialsEntryBox_El.remove();
        submitBtn_El.remove();
        prompt_El.remove();
        scoreboardEl.appendChild(returnBtn_El); // allow return only after initals are submitted
    }
    scoreboardEl.appendChild(submitBtn_El);
    
    var returnBtn_El = document.createElement("button"); // return button 
    returnBtn_El.className = "return";
    returnBtn_El.textContent = "RETURN";
    returnBtn_El.onclick = function(){
        // clear the board + scores
        headingEl.remove()
        container_El.remove()
        returnBtn_El.remove();
        scoreboardEl.remove();
        clickCounter = 0;
        correctAnswers = 0;
        // append start and highscores buttons
        main_El.appendChild(startBtnEl);
        document.querySelector("scores").appendChild(highScoresBtn_El);
    };
 // scoreboard data
    var rackLeftEl = document.createElement("div");
    rackLeftEl.className = "rackLeftEl";
    container_El.appendChild(rackLeftEl);
    var correctAnswers_L_El = document.createElement("h4");
    correctAnswers_L_El.className = "correctL";
    correctAnswers_L_El.textContent = ("Correct Answers");
    rackLeftEl.appendChild(correctAnswers_L_El);
    var total_L_El = document.createElement("h4");
    total_L_El.className = "totalL";
    total_L_El.textContent = ("Total");
    rackLeftEl.appendChild(total_L_El);

    //scores
    var rackRightEl = document.createElement("div");
    rackRightEl.className = "rackRightEl";
    container_El.appendChild(rackRightEl);
    
    var correctAnswers_R_El = document.createElement("h4");
    correctAnswers_R_El.className = "correctR";
    correctAnswers_R_El.textContent = (correctAnswers);
    rackRightEl.appendChild(correctAnswers_R_El);
    var total_R_El = document.createElement("h4");
    total_R_El.className = "totalR";
    total_R_El.textContent = (correctAnswers);
    rackRightEl.appendChild(total_R_El);
}

function highScores_Func(){

    highScoresBtn_El.remove();

    var highScores_El = document.createElement("div");
    highScores_El.className = "highscores";
    startBtnEl.remove();
    main_El.appendChild(highScores_El);

    var grabInitials_El = document.createElement("div");
    var grabScores_El = document.createElement("div");
    grabInitials_El.className = "local-initials";
    grabScores_El.className = "local-scores";
    for (var i = 0; i < localStorage.length; i++){
        grabInitials_El.textContent += (localStorage.key(i) + "\r\n");
        grabScores_El.textContent += (localStorage.getItem(localStorage.key(i)) + "\r\n");
    };
    highScores_El.appendChild(grabInitials_El);
    highScores_El.appendChild(grabScores_El);

    var returnBtn_El = document.createElement("button");
    returnBtn_El.className = "return";
    returnBtn_El.textContent = "RETURN";
    returnBtn_El.onclick = function(){
        highScores_El.remove();
        main_El.appendChild(startBtnEl);
        document.querySelector("scores").appendChild(highScoresBtn_El);
    };
    highScores_El.appendChild(returnBtn_El);
}

// HTML Elements
var banner_El = document.querySelector("div");
var main_El = document.querySelector("main"); 
var scoreboardEl = document.createElement("div");
scoreboardEl.className = "scoreboard";
var timer_El = document.getElementById("timer");
var startBtnEl = document.getElementById("start"); 

startBtnEl.onclick = countdown_Func;

var preambleEl = document.createElement("div");
preambleEl.className = "preamble";
var quiz_El = document.createElement("div");
quiz_El.className = "quiz";
var questionEl = document.createElement("div");
questionEl.className = "question";
var answersContainer_El = document.createElement("div");
answersContainer_El.className = "answers";
var highScoresBtn_El = document.getElementById("highscores");


highScoresBtn_El.onclick = highScores_Func;

//1 minute (75 seconds) in milliseconds
const startTime = 75 * 1000;

var quizTime; 

const questionList = [
    'Commonly used data types do NOT include:',
    'The condition in an if / else statement is enclosed with ____.',
    'Arrays in JavaScript can be used to store ___.',
    'String values must be enclosed within ___ when being assigned to variables.',
    ' A very useful tool used during development and debuggin for printing contect to the bugger is:'
];
var questionArray = []; // list of questions

const answerList = [ // 5 correct 15 fillers 20 total
    'Alerts', 'Parenthesis', 'All of the above', 'Parenthesis', 'Console.log',
    'Strings', 'Booleans', 'Numbers', 'Quotes', 'Curly brackets', 
    'Square braquets', 'Number and strings', 'Other Arrays', 'Booleans', 'Commas',
    'Curly Brackets', 'Quotes', 'JavaScript', 'Terminal/Bash', 'Forloopes',
];
var answerArray = []; 

var clickCounter = 0;

var correctAnswers = 0;
