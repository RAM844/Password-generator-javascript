const resultEl = document.getElementById('result')
//for length
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

//symbols.checked works
//lengthEl.value works

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
//event listener to copy the generated password
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;
    if(password === ''){
        alert("generate password and then copy");
        return 
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert("Password Copied to clipBoard");
})
//eventListener that sends the checked items and calls generatePassword function to send psw
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const isUpper = uppercaseEl.checked;
    const isLower = lowercaseEl.checked;
    const isSymbol = symbolsEl.checked;
    const isNumber = numbersEl.checked;
    console.log(length,isUpper,isLower,isSymbol,isNumber);
    let psw = generatePassword(isLower,isUpper,isNumber,isSymbol,length);

    resultEl.textContent = psw ;  
})

//function takes boolean as input and generates the respective ones in order;
function generatePassword(lower, upper, number, symbol, length) {
    let count = lower + upper + number + symbol;
    const Arr = [{ lower }, { upper }, { number }, { symbol }].filter
    ( item =>
        Object.values(item)[0]
    );
    if(count === 0){
        return '';
    }

    let psw=''
    for(let i =0; i < (+lengthEl.value);i+=count){
        Arr.forEach(type =>{
            const  fName = Object.keys(type)[0];
            console.log(Object.keys(type)[0]);
            psw += randomFunc[fName]();
        })
        
    }
    return psw.slice(0,+lengthEl.value);
}




//getRandomLower for getting lower letter 
function getRandomLower() {
    let lowerAlphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','Q','r','s','t','u','v','w','x','y','z'];
    return lowerAlphabets[Math.floor(Math.random()*26)] 
}

//getRandomUpper for getting upper letter
function getRandomUpper() {
    let upperAlphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    return upperAlphabets[Math.floor(Math.random()*26)] 
}

//getRandomNumber for getting numbers
function getRandomNumber() {
    return Math.floor(Math.random()*10)
}
//getRandomSymbol for getting random symbols
function getRandomSymbol() {
    let symbols = ['!','@','#','$','%','^','&','*','(',')','_','+','-','=',';',':','','<','>','?','/','{','}','[',']','|'];
    return symbols[Math.floor(Math.random()*26)] 
}