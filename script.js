//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submit = document.getElementById("submit");
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill("");
const score = JSON.parse(localStorage.getItem("score")) || "";


if(score){
	scoreElement.innerHTML = `Your score is ${score} out of ${questions.length}.`
}

function onCheck(index, value){
	userAnswers[index] = value;
	sessionStorage.setItem("progress", JSON.stringify(userAnswers))
}
// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
	   choiceElement.addEventListener("click", () => onCheck(i,choice))
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

function handleSubmit(){
	const answers = [];
	let score = 0;
	for(let i=0; i<questions.length; i++){
		const radios = document.querySelectorAll(`input[name=question-${i}]`);
		Array.from(radios).forEach(radio => {
			if(radio.checked){
				answers.push(radio.value)
				if(radio.value === questions[i].answer) {
					score++;
				}
			}
		})
	};

	scoreElement.innerHTML = `Your score is ${score} out of ${questions.length}.`
	localStorage.setItem("score", JSON.stringify(score))
}
submit.addEventListener("click",handleSubmit)









