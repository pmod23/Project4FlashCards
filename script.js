// Start Game

    // Remove Splash Screen

    // Display Question

    // Set Progress bar


// Playing The Game

    // IF
        // last question AND there are no incorrect ones left, then end the game

    // ELSE

        // Flip the card

        // Log Answer/Score

        // Update The Score

        // Go To next card

        // Update Progress

        const keyboardEvents = (event) => {

            switch (event.code) {

                case 'Space':
                    game.flipCard();
                    break;

                case 'KeyY':
                    game.reportAnswer(true);
                    break;

                case 'KeyN':
                    game.reportAnswer(false);
                    break;

            }

        }

        const restartGame = () => {

            document.getElementById("end-screen").classList.add("hide");
            document.getElementById("start-screen").classList.remove("hide");

            const main = document.querySelector('#game-container');

            main.parentElement.replaceChild(main.cloneNode(true), main);

            game = new Flashcards();

        }


        class Flashcards {
            // this will always refer to the flashcards object

            constructor() {

                this.score = 0;
                this.currentQuestion = 0;

                // Our Initial Deck
                this.allQuestions = getQuestions();

                // Current Working Deck
                this.questions = this.allQuestions;

                // Incorrect Questions
                this.incorrectQuestions = [];

                // Whether or not to update score
                this.trackProgress = true;

                // Track State of Card
                this.flipped = false;

                // Define Constantly Used Elements
                this.elements = {
                    stateName: document.getElementById('state-name'),
                    capital: document.getElementById('capital'),
                    progress: document.getElementById('progress'),
                    instructions: document.getElementById('instructions'),
                    score: document.getElementById('score'),
                    card: document.querySelector('.card')
                };

                document.getElementById('start-button').addEventListener('click', () => this.start());

            }


            attachEvents() {

                document.querySelector('.card__front').addEventListener('click', () => this.flipCard());

                document.addEventListener('keyup', keyboardEvents);


                document.querySelectorAll('.btn-circle').forEach((button) => {

                    button.addEventListener('click', () => this.reportAnswer(button.dataset.correct === 'true'));

                });


                document.getElementById('restart').addEventListener('click', restartGame);

            }


            start() {

                // Attach Game Event Listeners
                this.attachEvents();


                // Add First Card
                this.elements.stateName.textContent = this.questions[this.currentQuestion].state;
                this.elements.capital.textContent = this.questions[this.currentQuestion].capital;

                // Update Progress
                this.elements.progress.textContent = `${this.currentQuestion + 1}/${this.questions.length}`;

                // Dispaly Start Screen
                document.getElementById("start-screen").classList.add("hide");
                document.getElementById("flash-cards").classList.remove("hide");

            }


            flipCard() {

                this.elements.card.classList.toggle('flipped');
                this.elements.instructions.classList.toggle('flipped');

                this.flipped = this.flipped ? false : true;

            }


            reportAnswer(isCorrect) {

                if (!this.flipped) return;


                if (isCorrect) {
                    // Increase Score
                    if (this.trackProgress) this.score++;
                }

                else {
                    this.incorrectQuestions.push(this.questions[this.currentQuestion]);
                }

                this.nextQuestion();

            }


            nextQuestion() {

                this.currentQuestion++;

                if (this.currentQuestion === this.questions.length) return this.endOfCards();

                this.elements.score.textContent = this.score;

                this.elements.progress.textContent = `${this.currentQuestion + 1}/${this.questions.length}`;

                this.elements.stateName.textContent = this.questions[this.currentQuestion].state;
                this.elements.capital.textContent = this.questions[this.currentQuestion].capital;

                this.flipCard();

            }


            endOfCards() {

                // This means there are incorrect questions
                if (this.incorrectQuestions.length) {

                    console.log(this.incorrectQuestions);

                    this.questions = this.incorrectQuestions;
                    this.incorrectQuestions = [];
                    this.currentQuestion = -1;
                    this.trackProgress = false;

                    this.nextQuestion();

                }

                else this.finish();

            }


            finish() {

                // Remove Event Listener For Keyboard Events
                document.removeEventListener('keyup', keyboardEvents);

                const percent = (this.score / this.allQuestions.length) * 100;
                const score = `${this.score}/${this.allQuestions.length}`;
                let message = `Good Job! You got ${score} correct!`;

                if (percent < 50) message = `Try again! You got ${score} correct.`;
                else if (percent >= 90) message = `Great work! You got ${score} correct!`;


                document.getElementById('results').textContent = message;
                document.getElementById("end-screen").classList.remove("hide");
                document.getElementById("flash-cards").classList.add("hide");

                if (this.flipped) this.flipCard();

            }

        }


        // Start Game
        let game = new Flashcards();
