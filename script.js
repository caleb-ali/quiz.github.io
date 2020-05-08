const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;


// questions,options and answers

const questions = [
    {
        q: 'How many years did the "One Hundred Years War" last ?',
        options: ['100', '99', '116', '101'],
        answer: 2
    },
    {
        q: 'What was the name of the research ship Charles Darwin travelled with?',
        options: ['Turtle', 'Mermaid', 'Eagle', 'Beagle'],
        answer: 3
    },
    {
        q: 'What year saw Adolph Hitler committing suicide?',
        options: ['1946', '1944', '1947', '1945'],
        answer: 3
    },
    {
        q: 'In which year was JFK assassinated?',
        options: ['1962', '1960', '1968', '1963'],
        answer: 3
    },
    {
        q: 'Which country did the USSR invade in 1979 ?',
        options: ['Afghanistan', 'iraq', 'china', 'iran'],
        answer: 0
    }

]

//set questions and options and question number
totalQuestionSpan.innerHTML = questions.length;
function load() {
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;
}

function check(element) {
    if (element.id == questions[questionIndex].answer) {
        element.classList.add("correct");
        updateAnswerTracker("correct")
        score++;
        console.log("score:" + score)
    }
    else {
        element.classList.add("wrong");
        updateAnswerTracker("wrong")

    }
    disabledOptions()
}

function disabledOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
        if (options[i].id == questions[questionIndex].answer) {
            options[i].classList.add("correct");
        }
    }
}

function enableOptions() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}

// check if an option has been selected
function validate() {
    if (!options[0].classList.contains("disabled")) {
        alert("you have not selected any option")
    }
    else {
        enableOptions();
        randomQuestion();
    }
}
//goes to the next question if option has been selected
function next() {
    validate();
}
//generate random questions
function randomQuestion() {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = 0;
   if (index == questions.length) {
        quizOver();
    }
    else {
        if (myArray.length > 0) {
            for (let i = 0; i < myArray.length; i++) {
                if (myArray[i] == randomNumber) {
                    hitDuplicate = 1;
                    break;
                }
            }
            if (hitDuplicate == 1) {
                randomQuestion();
            }
            else {
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }
        }
        if (myArray.length == 0) {
            questionIndex = randomNumber;
            load();
            myArr.push(questionIndex);
        }

        myArray.push(randomNumber);
    }

}
//display results for each question
function answerTrakcer() {
    for (let i = 0; i < questions.length; i++) {
        const div = document.createElement("div")
        answerTrackerContainer.appendChild(div);
    }
}
function updateAnswerTracker(classNam) {
    answerTrackerContainer.children[index - 1].classList.add(classNam);

}
// ends quiz and displays result by changing display property of an element
function quizOver() {
    document.getElementById("quiz-over").style.display = "flex";
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score / questions.length) * 100 + "%";
}

//reload the quiz
function tryAgain() {
    window.location.reload();
}

window.onload = function () {
    randomQuestion();
    answerTrakcer();
    
}