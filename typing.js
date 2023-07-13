// Declaration of variables
const textBox = document.getElementById('textBox');
const para = document.getElementById('para');
const input = document.getElementById('inputFromUser');
const restart = document.getElementById('restart');
const timediv = document.getElementById('time');
const check = document.getElementById('check');
const wpmdiv = document.getElementById('wpm');
const rawdiv = document.getElementById('raw');
const accuracydiv = document.getElementById('accuracy');
let stTime = 60,m = 0, s = 0,time = stTime;
let wordCount = 0, correctWord = 0, incorrectWord = 0, accuracy = 0, wpm = 0, raw, typedWord = '';
let index = 0, words = [];
let noOfFiles = 7;
// let capitalFlag = false, numFlag = false, specialFlag = false;

// Fetching data from text files
async function getData(){
    const randomNumber = Math.floor(Math.random() * noOfFiles) + 1;

    const response = await fetch(`textFiles/${randomNumber}.txt`);
    if (response.ok) {
        const data = await response.text();
        para.textContent = data;
        defaultData = data;
    } else {
        para.textContent = defaultData;
        console.log('Error:', response.status);
    }

    // convert of para into lowercase
    para.textContent = para.textContent.toLowerCase();

    // remove special characters from para
    para.textContent = para.textContent.replace(/[^a-zA-Z\s]/g, '');

    // convert textcontent of para to array
    words = para.textContent.split(' ');
    // remove spaces from words array and \n
    words = words.filter((word) => word !== '' && word !== '\n');
    console.log(words);
}

getData();

function calculateWpm() {
    if (correctWord === 0) {
        accuracy = 0;
        wpm = 0;
        raw = 0;
    } else {
        accuracy = (correctWord / wordCount) * 100;
        let x = stTime - time;
        wpm = 60*correctWord / x;
        raw = 60*wordCount / x;
    }
    wpmdiv.innerHTML = `${wpm.toFixed(2)}`;
    rawdiv.innerHTML = `${raw.toFixed(2)}`;
    accuracydiv.innerHTML = `${accuracy.toFixed(2)}%`;
}

// Updating time
function chTime(){
    if(time > 0){
        time -= 1;
        m = Math.floor(time / 60);
        s = time % 60;
        console.log(m, s);
        timediv.innerHTML = `${m}:${s.toString().padStart(2, '0')}`;
        const inputbox = document.getElementById('input');
        let paraheight = para.offsetHeight;
        let avg = (textBox.offsetHeight + inputbox.offsetHeight)/2;
        // if(avg > paraheight){
        // }
        textBox.offsetHeight -= 0.1*(document.documentElement.clientHeight);
        console.log(textBox.offsetHeight, para.offsetHeight, avg, document.documentElement.clientHeight);
        calculateWpm();
        setTimeout(chTime, 1000);
    }
    else if(index === words.length){
        calculateWpm();
        textBox.innerHTML = `You completed it before time \n Wpm =  ${correctWord} words per minute \n Raw = ${raw} \n Accuracy = ${accuracy.toFixed(2)}%`;
    }
    else if(time == 0){
        if (correctWord === 0) {
            accuracy = 0;
            wpm = 0;
            raw = 0;
        } else {
            accuracy = (correctWord / wordCount) * 100;
            let x = stTime - time;
            wpm = 60*correctWord / x;
            raw = 60*wordCount / x;
        }
        textBox.innerHTML = `Time's up! \n Wpm =  ${correctWord} words per minute \n Raw = ${raw} \n Accuracy = ${accuracy.toFixed(2)}%`;
    }
}

// Getting input from user
window.addEventListener("keydown", (event) => {
    let key = event.key;

    if (time === stTime && key !== " " && event.key.length === 1) {
        chTime();
    }

    if (key === " ") {

        // checking is the typed word is correct or not
        if (typedWord.trim() === words[index++]) {
            correctWord++;

            if(!para.previousElementSibling || (para.previousElementSibling && para.previousElementSibling.id !== "correct")){
                const correct = document.createElement('span');
                correct.classList.add('correct');
                correct.innerText = typedWord + " ";
                para.insertAdjacentElement('beforebegin', correct);
            }
            else{
                // select last span with class correct
                const correctSpans = document.querySelectorAll('span.correct');
                const lastCorrectSpan = correctSpans[correctSpans.length - 1];
                lastCorrectSpan.innerText += typedWord + " ";
            }
        } 
        else {
            incorrectWord++;
            if(!para.previousElementSibling || (para.previousElementSibling && para.previousElementSibling.id !== "incorrect")){
                const incorrect = document.createElement('span');
                incorrect.classList.add('incorrect');
                incorrect.innerText = typedWord + " ";
                para.insertAdjacentElement('beforebegin', incorrect);
            }
            else{
                // creae a new span with id correct
                const incorrectSpans = document.querySelectorAll('span.incorrect');
                const lastInorrectSpan = correctSpans[incorrectSpans.length - 1];
                lastInorrectSpan.innerText += typedWord + " ";
            }
        }

        // updating the para
        if(index !== words.length){
            para.textContent = para.textContent.slice(para.textContent.indexOf(" ") + 1);
        }
        else if(index === words.length){
            para.textContent = "";
            time = 0;
        }
        input.innerText = "";
        typedWord = "";
        wordCount++;
    } 
    else if (key === "Backspace") {
        typedWord = typedWord.slice(0, -1);
        input.innerText = typedWord;
    }
    // else if((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z') || key === '.' || key === ',' || key === '?' || key === '!' || key === '-' || key === '\'' || key === '"' || key === '(' || key === ')' || key === ':' || key === ';') {}
    else if(event.key.length === 1){
        typedWord += key;
        input.innerText = typedWord;
    }
});

// Restarting the test
restart.addEventListener('click', () => {
    // location.reload();
    stTime = 60,m = 0, s = 0,time = stTime;
    wordCount = 0, correctWord = 0, incorrectWord = 0, accuracy = 0, wpm = 0, raw, typedWord = '';
    index = 0;
    textBox.innerHTML = "";
    const para = document.createElement('span');
    para.id = "para";
    para.textContent = "";

    getData();
    wpmdiv.innerHTML = "00";
    rawdiv.innerHTML = "00";
    accuracydiv.innerHTML = "00";
});

/*
if(capitalFlag){
    console.log("capital flag");
    // add capital letters to para and words array from defaultData string
    for(let i = 0; i < defaultData.length; i++){
        if(defaultData[i] >= 'A' && defaultData[i] <= 'Z'){
            para.textContent[i] = defaultData[i];
        }
    }
    words = para.textContent.split(' ');
    // remove spaces from words array and \n
    words = words.filter((word) => word !== '' && word !== '\n');
}

if(numFlag){
    // console.log("num flag");
    // add numbers to para and words array from defaultData string
    for(let i = 0; i < defaultData.length; i++){
        if(defaultData[i] >= '0' && defaultData[i] <= '9'){
            para.textContent = para.textContent.slice(0, position) + defaultData[i] + para.textContent.slice(position);
        }
    }
    words = para.textContent.split(' ');
    // remove spaces from words array and \n
    words = words.filter((word) => word !== '' && word !== '\n');
}

if(specialFlag){
    // console.log("special flag");
    // add special characters to para and words array from defaultData string
    for(let i = 0; i < defaultData.length; i++){
        if((defaultData[i] >= '!' && defaultData[i] <= '/') ||
            (defaultData[i] >= ':' && defaultData[i] <= '@') ||
            (defaultData[i] >= '[' && defaultData[i] <= '`') ||
            (defaultData[i] >= '{' && defaultData[i] <= '~')){
            // insert special character at index i
            para.textContent = para.textContent.slice(0, position) + defaultData[i] + para.textContent.slice(position);
        }
    }
    words = para.textContent.split(' ');
    // remove spaces from words array and \n
    words = words.filter((word) => word !== '' && word !== '\n');
}
*/