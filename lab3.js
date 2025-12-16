const letters = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
];

const SBlockSymbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createSBlocks() {
    let matr = [];
    for (let i = 0; i < 8; i++) {
        let temp = Array.from(SBlockSymbols);
        matr.push(shuffleArray(temp));
    }
    return matr;
}

const SBlocks = createSBlocks();

function GenerateKey() {
    let rndKey = '';
    for (let i = 0; i < 16; i++)
        rndKey += letters[Math.floor(Math.random() * 66)];
    return rndKey;
}

function binToString(binaryString) {
    const cleaned = binaryString.replace(/[^01]/g, '');

    const bytes = [];
    for (let i = 0; i < cleaned.length; i += 8) {
        const byte = cleaned.slice(i, i + 8);
        const paddedByte = byte.padStart(8, '0');
        bytes.push(parseInt(paddedByte, 2));
    }

    const uint8Array = new Uint8Array(bytes);
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(uint8Array);
}

function strToBin(str) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(str);
    const binaryArray = Array.from(encoded).map(byte => { return byte.toString(2).padStart(8, '0'); });
    return binaryArray.join('');
}

function binToInt(bits) {
    let intNum = 0;
    for (let i = 0; i < bits.length; i++) {
        intNum += (bits[bits.length - 1 - i].toString()) * 2 ** i;
    }
    return intNum;
}

function intToBin(intNum, symbolCount) {
    return (intNum).toString(2).padStart(symbolCount, '0');
}

function PQmod232(elem, Qj) {
    return intToBin((binToInt(elem) + binToInt(Qj)) % 2 ** 32, 32);
}

function SBlocking(str) {
    let result = [];

    for (let i = 0; i < str.length / 4; i++) {
        let substr = str.substring(4 * i, 4 * i + 4);
        let intSubstr = binToInt(substr);
        let SBlockSubstr = SBlocks[i % 8][intSubstr];
        result.push(intToBin(SBlockSubstr, 4));
    }
    return result.join('');
}

function cycleMoving11(str) {
    return str.substr(11, str.length) + str.substr(0, 11);
}

function XOR(a, b) {
    let result = '';
    for (let i = 0; i < a.length; i++)
        result += (a[i] - 0) ^ (b[i] - 0);
    return result;
}

function GOSTDecrypt(text, key) {

    let binText = text;

    let C = [];

    for (let i = 0; i < binText.length; i += 64)
        C.push(binText.substring(i, i + 64));

    for (let i = C[C.length - 1].length; i < 64; i += 8)
        C[C.length - 1] += '00100000';

    let Q = [];
    key = strToBin(key);
    for (let i = 0; i <= 7; i++) {
        Q.push(key.substring(32 * i, 32 * (i + 1)));
    }

    let T = [];
    for (let k = 0; k < C.length; k++) {

        let L = C[k].substring(0, C[k].length / 2);
        let R = C[k].substring(C[k].length / 2, C[k].length);

        for (let i = 1; i <= 32; i++) {
            let v = L;
            let j = i <= 8 ? (i - 1) % 8 : (32 - i) % 8;
            L = PQmod232(L, Q[j]);
            L = SBlocking(L);
            L = cycleMoving11(L);
            L = XOR(L, R);
            R = v;
        }
        T.push(L + R);
    }

    return binToString(T.join(''));
}

function GOSTEncrypt(text, key) {

    let binText = strToBin(text);

    let T = [];

    for (let i = 0; i < binText.length; i += 64)
        T.push(binText.substring(i, i + 64));

    for (let i = T[T.length - 1].length; i < 64; i += 8)
        T[T.length - 1] += '00100000';

    let Q = [];
    key = strToBin(key);
    for (let i = 0; i <= 7; i++) {
        Q.push(key.substring(32 * i, 32 * (i + 1)));
    }

    let C = [];
    for (let k = 0; k < T.length; k++) {

        let L = T[k].substring(0, T[k].length / 2);
        let R = T[k].substring(T[k].length / 2, T[k].length);

        for (let i = 1; i <= 32; i++) {
            let v = R;
            let j = i < 25 ? (i - 1) % 8 : (32 - i) % 8;
            R = PQmod232(R, Q[j]);
            R = SBlocking(R);
            R = cycleMoving11(R);
            R = XOR(R, L);
            L = v;
        }
        C.push(L + R);
    }

    return C.join('');
}

function lab3GenerateKey() {
    let items = document.querySelectorAll(".lab3-item");
    items[2].value = GenerateKey();
}

function lab3Decrypt() {
    let items = document.querySelectorAll(".lab3-item");
    let text = items[1].value;
    console.log(text)
    for (let i = 0; i < text.length; i++) {
        if (text[i] != '0' && text[i] != '1') {
            alert('Ошибка ввода');
            return;
        }
    }
    items[6].innerHTML = GOSTDecrypt(text, items[2].value);
}

function lab3Encrypt() {
    let items = document.querySelectorAll(".lab3-item");
    items[6].innerHTML = GOSTEncrypt(items[1].value, items[2].value);
}