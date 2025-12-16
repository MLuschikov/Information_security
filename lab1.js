const topLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
const lowLetters = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

function lab1Decrypt() {
    let items = document.querySelectorAll(".lab1-item");
    let text = items[0].value;
    let key = items[1].value - 0;

    let decrText = '';

    for (let i = 0; i < text.length; i++) {
        let letterCode;
        if(text[i].charCodeAt() < 1072) {
            letterCode = topLetters.indexOf(text[i]);
            decrText += topLetters[(letterCode - key) % 33];
        }
        else{
            letterCode = lowLetters.indexOf(text[i]);
            decrText += lowLetters[(letterCode - key) % 33];
        }
    }
    items[5].innerHTML = decrText;
}

function lab1Hack() {

}

function lab1Encrypt() {
    let items = document.querySelectorAll(".lab1-item");
    let text = items[0].value;
    let key = items[1].value - 0;

    let encrText = '';

    for (let i = 0; i < text.length; i++) {
        let letterCode;
        if(text[i].charCodeAt() < 1072) {
            letterCode = topLetters.indexOf(text[i]);
            encrText += topLetters[(letterCode + key) % 33];
        }
        else{
            letterCode = lowLetters.indexOf(text[i]);
            encrText += lowLetters[(letterCode + key) % 33];
        }
    }
    items[5].innerHTML = encrText;
}