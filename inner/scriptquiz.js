const questions = [
    {
        question: "What is the term for the area where an organism or community of organisms lives, including all the living and non-living factors?",
        answers: [
            { text: "ecosystem", correct: false},
            { text: "biome", correct: false},
            { text: "habitat", correct: true},
            { text: "niche", correct: false},
        ]
    },
    {
       question: "Which of the following is a measure of the variety of life in a particular habitat or ecosystem?",
       answers: [
            { text: "eutrophication", correct: false},
            { text: "extinction", correct: false},
            { text: "biodiversity", correct: true},
            { text: "biomass", correct: false},
        
       ] 
    },
    {
        question: "The International Union for Conservation of Nature (IUCN) Red List categorizes species based on their risk of extinction. What is the category for a species that is at an extremely high risk of extinction?",
        answers: [
            { text: "near threatened", correct: false},
            { text: "vulnerable", correct: false},
            { text: "endangered", correct: false},
            { text: "critically endangered", correct: true},

        ]
    },
    {
        question: "What is the phenomenon where animals move from one region to another in search of better living conditions or for reproduction purposes?",
        answers: [
            { text: "hibernation", correct: false},
            { text: "migration", correct: true},
            { text: "camouflage", correct: false},
            { text: "territoriality", correct: false},

        ]
    },
    {
        question: "What is the term for the sustainable use and management of natural resources to ensure their long-term availability?",
        answers: [
            { text: "preservation", correct: false},
            { text: "conservation", correct: true},
            { text: "restoration", correct: false},
            { text: "exploitation", correct: false},
        ]
    },
    {
        question: "In which part of a plant cell does photosynthesis primarily take place?",
        answers: [
            { text: "nucleus", correct: false},
            { text: "chloroplast", correct: true},
            { text: "mitochondria", correct: false},
            { text: "vacuole", correct: false},
        ]
    },
    {
        question: "Which type of plant has specialized tissues called tracheids and vessel elements to transport water and nutrients?",
        answers: [
            { text: "mosses", correct: false},
            { text: "ferns", correct: false},
            { text: "gymnosperms", correct: true},
            { text: "angiosperms", correct: false},
        ]
    },
    {
        question: "The growth of a plant in response to the direction of light is known as:",
        answers: [
            { text: "phototropism", correct: true},
            { text: "geotropism", correct: false},
            { text: "hydrotropism", correct: false},
            { text: "thigmotropism", correct: false},
        ]
    },
    {
        question: "Which plant is the primary source of chocolate?",
        answers: [
            { text: "coffee plant", correct: false},
            { text: "cocoa tree", correct: true},
            { text: "tea bush", correct: false},
            { text: "vanilla orchid", correct: false},
        ]
    },
    {
        question: "What is the process by which plants produce new individuals from their stems, roots, or leaves?",
        answers: [
            { text: "pollination", correct: false},
            { text: "germination", correct: false},
            { text: "vegitative propagation", correct: true},
            { text: "fertilization", correct: false},
        ]
    },
    {
        question: "Which type of forest is characterized by cone-bearing evergreen trees and is commonly found in colder regions with long winters?",
        answers: [
            { text: "tropical rainforest", correct: false},
            { text: "temperate deciduous forest", correct: false},
            { text: "boreal forest", correct: true},
            { text: "coniferous forest", correct: false},
        ]
    },
    {
        question: "What is the term for the layer of a forest where the tallest trees, such as oaks and maples, form a dense canopy, blocking most sunlight?",
        answers: [
            { text: "canopy", correct: true},
            { text: "understory", correct: false},
            { text: "forest floor", correct: false},
            { text: "emergent layer", correct: false},
        ]
    },
    {
        question: "Which of the following is a major driver of deforestation worldwide?",
        answers: [
            { text: "sustainable logging", correct: false},
            { text: "urbanization", correct: true},
            { text: "afforestation", correct: false},
            { text: "forest conservation", correct: false},
        ]
    },
    {
        question: "What is the term for the variety of plant and animal species present in a forest ecosystem?",
        answers: [
            { text: "canopy cover", correct: false},
            { text: "forest density", correct: false},
            { text: "forest biomass", correct: false},
            { text: "forest biodiversity", correct: true},
        ]
    },
    {
        question: "Forests play a crucial role in mitigating climate change by sequestering carbon dioxide. Which component of a tree stores the most carbon?",
        answers: [
            { text: "leaves", correct: false},
            { text: "roots", correct: false},
            { text: "trunk", correct: true},
            { text: "branches", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}




function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();