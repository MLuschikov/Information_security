function lab4GenerateKey() {
    let items = document.querySelectorAll(".lab4-item");
    items[1].value = GenerateKey();
}

function lab4Decrypt() {
    let items = document.querySelectorAll(".lab4-item");
    let text = items[0].value;
    let key = items[1].value;

    for (let i = 0; i < text.length; i++) {
        if (text[i] != '0' && text[i] != '1') {
            alert('Ошибка ввода');
            return;
        }
    }

    let gamma = '';
    while (gamma.length < text.length) {
        gamma += GOSTEncrypt('Трусов', key);
    }

    console.log(XOR(text, gamma));

    items[5].innerHTML = binToString(XOR(text, gamma));
}

function lab4Encrypt() {
    let items = document.querySelectorAll(".lab4-item");
    let text = items[0].value;
    let key = items[1].value;

    let binText = strToBin(text);

    let gamma = '';
    while (gamma.length < binText.length) {
        gamma += GOSTEncrypt('Трусов', key);
    }

    items[5].innerHTML = XOR(binText, gamma);
}