function menuButtonHandler(event) {
    let contents = document.querySelectorAll('.content-item');
    for (var i = 0; i < contents.length; i++) {
        contents[i].setAttribute('hidden', true);
    }
    document.getElementById(event.target.dataset.content).removeAttribute('hidden');
}

function validationLetters1(event) {
    if (event.key != 'Alt' &&
        event.key != 'Control' &&
        event.key != 'Shift' &&
        event.key != 'Backspace' &&
        event.key != 'Enter' &&
        event.key.match("^[А-Яа-яЁё ]") === null) {
        event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
}

function validationLetters2(event) {
    if (event.key != 'Alt' &&
        event.key != 'Control' &&
        event.key != 'Shift' &&
        event.key != 'Backspace' &&
        event.key != 'Enter' &&
        event.key.match("^[a-z0-9]") === null) {
        event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
}

function addEventsLab1() {
    let items = document.querySelectorAll(".lab1-item");
    items[0].addEventListener('keyup', (event) => validationLetters1(event));
    items[2].addEventListener('click', lab1Decrypt);
    items[3].addEventListener('click', lab1Hack);
    items[4].addEventListener('click', lab1Encrypt);
}

function addEventsLab2() {
    let items = document.querySelectorAll(".lab2-item");

    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = ' ';
    tr.appendChild(td);
    for (let j = 0; j < 6; j++) {
        let td = document.createElement('td');
        td.textContent = ADFGVX[j];
        tr.appendChild(td);
    }
    items[0].appendChild(tr);

    for (let i = 0; i < 6; i++) {
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        td.textContent = ADFGVX[i];
        tr.appendChild(td);

        for (let j = 0; j < 6; j++) {
            let td = document.createElement('td');
            td.textContent = shuffledSymbols[i * 6 + j];
            tr.appendChild(td);
        }

        items[0].appendChild(tr);
    }

    items[1].addEventListener('keyup', (event) => validationLetters2(event));
    items[3].addEventListener('click', lab2Decrypt);
    items[4].addEventListener('click', lab2Encrypt);
}

window.onload = function () {

    addEventsLab1();
    addEventsLab2();

    let menuButtons = document.querySelectorAll('.menu-item');
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', menuButtonHandler);
    }
};