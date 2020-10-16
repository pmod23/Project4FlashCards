// Start Game

    // Remove Splash Screen

    // Display Question

    // Set Progress bar


// Playling The Game

    // IF
        // last question AND there are no incorrect ones left, then end the game

    // ELSE

        // Flip the card

        // Log Answer/Score

        // Update The Score

        // Go To next card

        // Update Progress


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

                document.addEventListener('keyup', event => {

                    console.log(event.code);

                    switch (event.code) {

                        case 'Space':
                            this.flipCard();
                            break;

                        case 'KeyY':
                            this.reportAnswer(true);
                            break;

                        case 'KeyN':
                            this.reportAnswer(false);
                            break;

                    }


                });

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

                console.log('flip the card');

                this.elements.card.classList.toggle('flipped');


                if (this.flipped) this.flipped = false;
                else this.flipped = true;


            }


            reportAnswer(isCorrect) {

                if (isCorrect) {
                    console.log('You got it right');
                }

                else {
                    console.log('you got it wrong');
                }

            }


            nextQuestion() {

            }


            endOfCards() {

                // This means there are incorrect questions
                if (this.incorrectQuestions.length) {

                    this.questions = this.incorrectQuestions;
                    this.incorrectQuestions = [];
                    this.currentQuestion = 0;
                    this.trackProgress = false;

                }

                else this.finish();

            }


            finish() {

            }

        }


        const game = new Flashcards();
