// Start Game
class Game{
constructor(){
    this.score = 0;
}
addScore(){
    return this.score++
}
}
    // Remove Splash Screen
let game = "";
let index = 0;
let wrongAnswers =[];
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", e =>{
        e.preventDefault();
        game = new Game
        document.getElementById("start-screen").classList.add("hide");
        document.getElementById("flash-cards").classList.remove("hide");
        playGame(getQuestions());
    })

function playGame(questions){
    if (index ==0){
        document.getElementById("state-name").innerHTML=questions[index].state;
        document.getElementById("answer").innerHTML=questions[index].capital;
    }
}


    // Display Question

    // Set Progress bar


// Playling The Game

    // IF
        // last question AND there are no incorrect ones left, then end the game

    // ELSE

        // Flip the card
        document.getElementsByClassName("card")[0].addEventListener("click", e =>{
            e.preventDefault();
            document.getElementsByClassName("card")[0].classList.add("flipped");
        });
        document.addEventListener("keydown", e =>{

            document.getElementsByClassName("card")[0].classList.add("flipped");
        });
        document.getElementById("yes").addEventListener("click", e =>{
            e.preventDefault();
        })

        // Log Answer/Score

        // Update The Score

        // Go To next card

        // Update Progress
