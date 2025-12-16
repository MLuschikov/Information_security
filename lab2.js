const ADFGVX = ['A', 'D', 'F', 'G', 'V', 'X'];

const symbols = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9'
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledSymbols = shuffleArray(symbols);

function sortMatrixByString(str, encrMatrix) {
    let chars = str.split('');

    for (let i = 0; i < chars.length - 1; i++) {
        for (let j = 0; j < chars.length - 1 - i; j++) {
            if (chars[j].localeCompare(chars[j + 1]) > 0) {
                [chars[j], chars[j + 1]] = [chars[j + 1], chars[j]];
                for (let k = 0; k < encrMatrix.length; k++) {
                    let temp = encrMatrix[k][j];
                    encrMatrix[k][j] = encrMatrix[k][j + 1];
                    encrMatrix[k][j + 1] = temp;
                }
            }
        }
    }

    return encrMatrix;
}

function sortMatrixByArr(arr, encrMatrix) {
    let chars = arr;

    for (let i = 0; i < chars.length - 1; i++) {
        for (let j = 0; j < chars.length - 1 - i; j++) {
            if (chars[j] > chars[j + 1]) {
                [chars[j], chars[j + 1]] = [chars[j + 1], chars[j]];
                for (let k = 0; k < encrMatrix.length; k++) {
                    let temp = encrMatrix[k][j];
                    encrMatrix[k][j] = encrMatrix[k][j + 1];
                    encrMatrix[k][j + 1] = temp;
                }
            }
        }
    }

    return encrMatrix;
}

function lab2Decrypt() {
    let items = document.querySelectorAll(".lab2-item");
    let text = items[1].value;
    let key = items[2].value;

    let shufflePlaces = [[]];
    for (let i = 0; i < key.length; i++) {
        shufflePlaces[0].push(i);
    }

    shufflePlaces = sortMatrixByString(key, shufflePlaces)[0];

    let encrMatrix = [];
    for (let i = 0; i < text.length; i += key.length)
        encrMatrix.push(text.substring(i, i + key.length).split(''));

    let lastStr = [];

    let count = 0;
    for (let i = 0; i < key.length; i++) {
        if (shufflePlaces[i] >= encrMatrix[encrMatrix.length - 1].length)
            lastStr.push('');
        else {
            lastStr.push(encrMatrix[encrMatrix.length - 1][count]);
            count++;
        }
    }

    encrMatrix[encrMatrix.length - 1] = lastStr;

    let encrStr = '';
    sortMatrixByArr(shufflePlaces, encrMatrix).forEach(element => {
        encrStr += element.join('');
    });

    let decText = '';
    for (let i = 0; i < encrStr.length; i += 2) {
        decText += shuffledSymbols[ADFGVX.indexOf(encrStr[i]) * 6 + ADFGVX.indexOf(encrStr[i + 1])];
    }

    items[5].innerHTML = decText;
}

function lab2Encrypt() {
    let items = document.querySelectorAll(".lab2-item");
    let text = items[1].value;
    let key = items[2].value;

    let decText = '';

    for (let i = 0; i < text.length; i++) {
        let symbolNumber = shuffledSymbols.indexOf(text[i]);
        decText += ADFGVX[Math.floor(symbolNumber / 6)] + ADFGVX[symbolNumber % 6];
    }

    let encrMatrix = [];
    for (let i = 0; i < decText.length; i += key.length)
        encrMatrix.push(decText.substring(i, i + key.length).split(''));

    for (let i = encrMatrix[encrMatrix.length - 1].length; i < key.length; i++)
        encrMatrix[encrMatrix.length - 1].push('');

    decText = '';
    sortMatrixByString(key, encrMatrix).forEach(element => {
        decText += element.join('');
    });

    items[5].innerHTML = decText;
}