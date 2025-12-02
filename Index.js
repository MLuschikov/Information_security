function menuButtonHandler(event) {
    let contents = document.querySelectorAll('.content-item');
    for (var i = 0; i < contents.length; i++) {
        contents[i].setAttribute('hidden', true);
    }
    document.getElementById(event.target.dataset.content).removeAttribute('hidden');
}

function validationLetters(event) {
    if (event.key != 'Alt' && event.key != 'Control' && event.key != 'Shift' && event.key != 'Backspace' && event.key != 'Enter' && event.key.match("^[А-Яа-яЁё ]") === null) {
        event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
}

function addEventsLab1() {
    let items = document.querySelectorAll(".lab1-item");
    items[0].addEventListener('keyup', (event) => validationLetters(event));
    items[2].addEventListener('click', lab1Decrypt);
    items[3].addEventListener('click', lab1Hack);
    items[4].addEventListener('click', lab1Encrypt);
}

window.onload = function () {
    addEventsLab1();
    let menuButtons = document.querySelectorAll('.menu-item');
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', menuButtonHandler);
    }
};