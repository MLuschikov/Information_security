function lab5GenerateKey() {
    let items = document.querySelectorAll(".lab5-item");

    let p;
    let q;
    if (items[1].value == '' && items[2].value == '') {
        p = simpleNumbers[Math.floor(Math.random() * (Math.floor(simpleNumbers.length / 100)))];
        q = simpleNumbers[Math.floor(Math.random() * (Math.floor(simpleNumbers.length / 100)))];
    }
    else {
        p = items[1].value - 0;
        q = items[2].value - 0;      
        if(!simpleTest(p) || !simpleTest(q)){
            alert('p и q должны быть простыми числами');
            return;
        }
    }

    let N = p * q;
    let phiN = (p - 1) * (q - 1);
    let e = getRndE(phiN);

    let d = modInverse(e, phiN);
    while ((e * d) % phiN != 1) {
        e = getRndE(phiN);
        d = modInverse(e, phiN);
    }

    items[3].value = '' + e + ' ' + N;
    items[4].value = '' + d + ' ' + p + ' ' + q;
}

function simpleTest(number) {
    for (let i = 2; i < number; i++)
        if (number % i == 0)
            return false;
    return true;
}

function extendedGCD(a, b) {
    if (b == 0) {
        return {
            gcd: a,
            x: 1,
            y: 0
        };
    }
    const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return { gcd, x, y };
}

function modInverse(e, mod) {
    const { gcd, x } = extendedGCD(e, mod);
    if (gcd != 1) {
        return null;
    }
    const d = ((x % mod) + mod) % mod;
    return d;
}

function getRndE(N) {
    let e = N;
    while (e >= N) {
        e = simpleNumbers[Math.floor(Math.random() * simpleNumbers.length)];
    }
    return e;
}

function lab5Decrypt() {
    let items = document.querySelectorAll(".lab5-item");
    let text = items[0].value - 0;
    let sekKeys = items[4].value.split(' ');

    items[8].innerHTML = BigInt(text) ** BigInt(sekKeys[0]) % BigInt(sekKeys[1] * sekKeys[2]);

}

function lab5Encrypt() {
    let items = document.querySelectorAll(".lab5-item");
    let text = items[0].value - 0;
    let keys = items[3].value.split(' ');

    if (text >= keys[1]) {
        alert('Сообщение не может быть больше N(второе число в открытом ключе)');
        return;
    }

    items[8].innerHTML = BigInt(text) ** BigInt(keys[0]) % BigInt(keys[1]);
}