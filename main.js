document.getElementById('quadratic-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        displayResults('係数を正しい数値で入力してください。');
        return;
    }

    let discriminant = b * b - 4 * a * c;
    let results = '';

    if (discriminant > 0) {
        let sqrtDiscriminant = simplifySqrt(discriminant);
        let numerator1 = simplifyFraction(-b + sqrtDiscriminant[0], 2 * a);
        let numerator2 = simplifyFraction(-b - sqrtDiscriminant[0], 2 * a);
        if (sqrtDiscriminant[1] !== 1) {
            numerator1[0] = `${numerator1[0]}√${sqrtDiscriminant[1]}`;
            numerator2[0] = `${numerator2[0]}√${sqrtDiscriminant[1]}`;
        }
        results = `方程式の解は次の通りです:<br>x1 = ${formatFraction(numerator1)}<br>x2 = ${formatFraction(numerator2)}`;
    } else if (discriminant === 0) {
        let x = simplifyFraction(-b, 2 * a);
        results = `方程式の解は重解です:<br>x = ${formatFraction(x)}`;
    } else {
        let realPart = simplifyFraction(-b, 2 * a);
        let imaginaryPart = simplifyFraction(Math.sqrt(Math.abs(discriminant)), 2 * a);
        if (imaginaryPart[1] !== 1) {
            imaginaryPart[0] = `√${Math.abs(discriminant)}`;
        }
        results = `方程式の解は次の通りです:<br>x1 = ${formatFraction(realPart)} + ${formatFraction(imaginaryPart)}i<br>x2 = ${formatFraction(realPart)} - ${formatFraction(imaginaryPart)}i`;
    }

    displayResults(results);
});

function simplifySqrt(n) {
    let largestSquare = 1;
    for (let i = 2; i * i <= n; i++) {
        if (n % (i * i) === 0) {
            largestSquare = i;
        }
    }
    let outsideRoot = largestSquare;
    let insideRoot = n / (largestSquare * largestSquare);
    return [outsideRoot, insideRoot];
}

function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    let gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / gcdValue, denominator / gcdValue];
}

function formatFraction([numerator, denominator]) {
    if (denominator === 1) {
        return `${numerator}`;
    }
    return `${numerator}/${denominator}`;
}

function displayResults(message) {
    document.getElementById('results').innerHTML = message;
}
