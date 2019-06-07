let mistakeCounter = 0;
let boardSize = 18;
let clickBlocker = true;
let academia = false;
var audioWrong = new Audio('../sound/wrong.mp3');
var audioCorrect = new Audio('../sound/correct.mp3');
var audioWin = new Audio('../sound/win.mp3');
let namesArray = [];


let animalPictures = [
    '../images/fox.jpg',
    '../images/fox.jpg',
    '../images/rabbits.jpg',
    '../images/rabbits.jpg',
    '../images/mouse.jpg',
    '../images/mouse.jpg',
    '../images/panda.jpg',
    '../images/panda.jpg',
    '../images/miniMouse.jpg',
    '../images/miniMouse.jpg',
    '../images/hedgehog.jpg',
    '../images/hedgehog.jpg',
    '../images/jiraff.png',
    '../images/jiraff.png',
    '../images/straus.jpg',
    '../images/straus.jpg',
    '../images/snake.jpg',
    '../images/snake.jpg',
    '../images/dog.jpg',
    '../images/dog.jpg',
    '../images/monkey.jpg',
    '../images/monkey.jpg',
    '../images/hedgehog2.jpg',
    '../images/hedgehog2.jpg',
    '../images/cat.jpg',
    '../images/cat.jpg',
    '../images/goat.jpg',
    '../images/goat.jpg',
    '../images/toad.jpg',
    '../images/toad.jpg'
];

let philosophers = [
    '../images/socrates.jpg',
    '../images/socrates.jpg',
    '../images/plato.jpg',
    '../images/plato.jpg',
    '../images/aristotles.jpg',
    '../images/aristotles.jpg',
    '../images/marc-aurel.jpg',
    '../images/marc-aurel.jpg',
    '../images/diogenes.jpg',
    '../images/diogenes.jpg',
    '../images/Hobbes.jpg',
    '../images/Hobbes.jpg',
    '../images/Locke.jpg',
    '../images/Locke.jpg',
    '../images/kant.jpg',
    '../images/kant.jpg',
    '../images/Spinoza.jpg',
    '../images/Spinoza.jpg',
    '../images/Nietzsche.jpg',
    '../images/Nietzsche.jpg',
    '../images/Pascal.jpg',
    '../images/Pascal.jpg',
    '../images/Feuerbach.jpg',
    '../images/Feuerbach.jpg',
    '../images/Hume.jpg',
    '../images/Hume.jpg',
    '../images/Dekart.jpg',
    '../images/Dekart.jpg',
    '../images/hegel.jpg',
    '../images/hegel.jpg',
];

shufflePictures = arr => {
    let counter = arr.length - boardSize;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

shuffeledPics = shufflePictures(animalPictures);

let index = 0;

dealCards = size => {
    for (index = 0; index < shuffeledPics.length - size; index++) {
        let image = $('<img/>');
        image.addClass('animal-class');
        image.attr('id', index);
        if (academia) {
            image.css({
                'background-image': `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgLWi8dvl49_HOYMpjc-JsKNg6UHgv6LThsVh8qLP0hoLINlx")`,
                'background-size': 'cover',
                width: 19 + '%',
                height: 150 + 'px',
                margin: 1 + '%',
                'background-position': 'center',
                border: '3px solid white',
            });
        } else {
            image.css({
                'background-image': `url("https://image.freepik.com/free-vector/cute-animals-head-background_1042-90.jpg")`,
                'background-size': 'cover',
                width: 19 + '%',
                height: 150 + 'px',
                margin: 1 + '%',
                'background-position': 'center',
                border: '3px solid white',
            });
        }
        $('.row.mt-5').append(image);
    }
};

dealCards(boardSize);

let winCounter = 0;
let checkedArray = [];

gamePlay = () => {
    $('.animal-class').click(function () {
        if (clickBlocker) {
            $(this).css('background-image', `url(${shuffeledPics[this.id]})`);
            checkedArray.push(this);

            //make sure that only two pictures are selected
            if (checkedArray.length === 2) {
                clickBlocker = false;
                checkedArray[0].style.border = "5px solid green";
                checkedArray[1].style.border = "5px solid green";

                //correct choice case
                if (checkedArray[0].style.backgroundImage === checkedArray[1].style.backgroundImage) {
                    audioCorrect.play();
                    winCounter++;
                    checkedArray[0].style.pointerEvents = "none";
                    checkedArray[1].style.pointerEvents = "none";
                    setTimeout(() => {
                        clickBlocker = true;
                    }, 250);
                    // if you won the game
                    if ((shuffeledPics.length - boardSize) / 2 === winCounter) {
                        winCounter = 0;
                        $('.row').empty();
                        let winBox = $('<div/>');
                        winBox.addClass("win-class");
                        let myInput = $("<input/>");
                        myInput.addClass("form-control");
                        let enterNameBtn = $('<button/>');
                        enterNameBtn.addClass("btn btn-primary input-name");
                        enterNameBtn.text("Insert Winner Name!");

                        audioWin.play();
                        winBox.text(`You won!!! You had ${mistakeCounter} mistakes`);


                        enterNameBtn.click(() => {

                            let winnersList = JSON.parse(localStorage.getItem('winners') || '[]');
                            winnersList.forEach(() => {
                                let item = {
                                    name: myInput.val(),
                                    score: mistakeCounter,
                                };
                                namesArray.push(item);
                            });

                            winnersList = JSON.parse(localStorage.getItem('winners') || '[]');

                            let person = {
                                name: myInput.val(),
                                score: mistakeCounter,
                            };

                            winnersList.push(person);
                            localStorage.setItem('winners', JSON.stringify(winnersList));
                            let superScore = 1000;
                            let name = "";
                            winnersList.forEach((person) => {
                                if (superScore > person.score) {
                                    superScore = person.score;
                                    name = person.name;
                                }

                            });
                            let message = $("<h4/>");
                            message.text("The champion of the game is " +
                                `${name} that was able to win with ${superScore} guesses!`);
                            winBox.append(message);

                        });

                        winBox.append(myInput);
                        winBox.append(enterNameBtn);
                        let button = $('<button/>');
                        let buttonBox = $('<div/>');
                        buttonBox.addClass("col text-center");
                        button.addClass('btn btn-success mt-5 reload-btn');
                        button.text('start the game again!');
                        buttonBox.append(button);
                        winBox.append(buttonBox);

                        $('.animal-theme').append(winBox);
                        $('.reload-btn').on('click', function () {
                            location.reload(true);
                        });
                    }
                    checkedArray = [];
                } else {
                    checkedArray[0].style.border = "5px solid red";
                    checkedArray[1].style.border = "5px solid red";
                    let id1 = checkedArray[0].id;
                    let id2 = checkedArray[1].id;
                    $(`#${id1}`).slideToggle(1500);
                    $(`#${id2}`).slideToggle(1500);

                    audioWrong.play();
                    setTimeout(() => {
                        mistakeCounter++;
                        if (academia) {
                            checkedArray[0].style.backgroundImage =
                                `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgLWi8dvl49_HOYMpjc-JsKNg6UHgv6LThsVh8qLP0hoLINlx")`;
                            checkedArray[1].style.backgroundImage =
                                `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgLWi8dvl49_HOYMpjc-JsKNg6UHgv6LThsVh8qLP0hoLINlx")`;
                            $(`#${id1}`).slideToggle(1500);
                            $(`#${id2}`).slideToggle(1500);

                            checkedArray[0].style.border = "5px solid white";
                            checkedArray[1].style.border = "5px solid white";
                        } else {
                            checkedArray[0].style.backgroundImage =
                                `url("https://image.freepik.com/free-vector/cute-animals-head-background_1042-90.jpg")`;
                            checkedArray[1].style.backgroundImage =
                                `url("https://image.freepik.com/free-vector/cute-animals-head-background_1042-90.jpg")`;
                            $(`#${id1}`).slideToggle(1500);
                            $(`#${id2}`).slideToggle(1500);
                            checkedArray[0].style.border = "5px solid white";
                            checkedArray[1].style.border = "5px solid white";
                        }

                        checkedArray = [];
                        clickBlocker = true;
                    }, 1000);
                }
            }
        }
    });
};

gamePlay();

// change game-board size;

$('#small').click(() => {
    $('.for-delete').empty();
    winCounter = 0;
    boardSize = 18;
    dealCards(boardSize);
    gamePlay();
});

$('#medium').click(() => {
    $('.for-delete').empty();
    boardSize = 10;
    winCounter = 0;
    if (academia) {
        shuffeledPics = shufflePictures(philosophers);
    } else {
        shuffeledPics = shufflePictures(animalPictures);
    }
    dealCards(boardSize);
    gamePlay();
});

$('#big').click(() => {
    $('.for-delete').empty();
    boardSize = 0;
    winCounter = 0;
    if (academia) {
        shuffeledPics = shufflePictures(philosophers);
    } else {
        shuffeledPics = shufflePictures(animalPictures);
    }

    dealCards(boardSize);
    gamePlay();
});

//change game Theme

$('.btn-danger').click(() => {
    academia = !academia;
    winCounter = 0;
    $('.for-delete').empty();
    if (academia) {
        $('body').css({
            backgroundImage: `url("../images/academia.jpg")`,
            backgroundSize: 'cover',
        });
        
        shuffeledPics = shufflePictures(philosophers);
    } else {
        $('body').css({
            backgroundImage: `url("https://newforestwildlifepark.co.uk/media/1008/nfwpmap.jpg")`,
            backgroundSize: 'cover',
        });
        shuffeledPics = shufflePictures(animalPictures);
    }

    dealCards(boardSize);
    gamePlay();
});

// New Game on header

$('.big-new-game').click(() => {
    location.reload(true);
});