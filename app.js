const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Diamond", correct: true },
      { text: "Iron", correct: false },
      { text: "Platinum", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Nauru", correct: false },
      { text: "San Marino", correct: false },
    ],
  },
  {
    question: "What is the largest continent by area?",
    answers: [
      { text: "Africa", correct: false },
      { text: "Asia", correct: true },
      { text: "Europe", correct: false },
      { text: "North America", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Osmium", correct: false },
      { text: "Ozone", correct: false },
      { text: "Oganesson", correct: false },
    ],
  },
  {
    question: "Who was the first President of the United States?",
    answers: [
      { text: "Thomas Jefferson", correct: false },
      { text: "George Washington", correct: true },
      { text: "Abraham Lincoln", correct: false },
      { text: "John Adams", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
    ],
  },
];

const questionBtn = $('#question');
const answer_buttons = $('#answer-buttons');
const next_btn = $('#next-btn');

let index = 0;
let score = 0;

const startQuiz = () => {
  next_btn.html("Next");
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[index];
  let questionNo = index + 1;
  questionBtn.html(`${questionNo}. ${currentQuestion.question}`);

  currentQuestion.answers.forEach(answer => {
    const button = $('<button></button>');
    button.text(answer.text);
    $(button).addClass('btn');
    $(button).data('correct', answer.correct);  
    $(answer_buttons).append(button);

    $(button).click(selectAnswer);
  });
};

function resetState() {
  $(next_btn).css('display', 'none');
  answer_buttons.empty();  
}

const selectAnswer = (e) => {
  const selectBtn = e.target;
  console.log(e.target);

  const isCorrect = $(selectBtn).data('correct') === true;

  if (isCorrect) {
    $(selectBtn).addClass("correct");
    score++; 
  } else {
    $(selectBtn).addClass("incorrect");
  }


  Array.from(answer_buttons.children()).forEach(btn => {
    $(btn).prop('disabled', true);  
    if ($(btn).data('correct') === true) {
      $(btn).addClass('correct');
    }
  });

  next_btn.show();
};

function showScore() {
  resetState();
  questionBtn.html(`Your score: ${score} out of ${questions.length}!`);
  $(next_btn).html("Play Again!");
  $(next_btn).css('display', 'block');
}

function handleNext() {
  index++;
  if (index < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

$(next_btn).click(function () {
  if (index < questions.length) {
    handleNext();
  } else {
    
    score = 0; 
    index = 0; 
    startQuiz(); 
  }
});


startQuiz();
