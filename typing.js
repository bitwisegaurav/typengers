// Declaration of variables
const textBox = document.getElementById('textBox');
let para = document.getElementById('para');
const input = document.getElementById('inputFromUser');
const restart = document.getElementById('restart');
const timediv = document.getElementById('time');
const check = document.getElementById('check');
const wpmdiv = document.getElementById('wpm');
const rawdiv = document.getElementById('raw');
const accuracydiv = document.getElementById('accuracy');
const capital = document.getElementById('capital');
const num = document.getElementById('number');
const special = document.getElementById('special');
const btns = document.querySelectorAll('.btn');
let stTime = 60,m = 0, s = 0,time = stTime;
let wordCount = 0, correctWord = 0, incorrectWord = 0, accuracy = 0, wpm = 0, raw, typedWord = '';
let index = 0, words = [];
let noOfFiles = 7;
let capitalFlag = true, numFlag = true, specialFlag = true, restartFlag = false;
let defaultData = "Computer programming is the process of writing code to facilitate specific actions in a computer, application or software program, and instructs them on how to perform. Computer programmers are professionals that create instructions for a computer to execute by writing and testing code that enables applications and software programs to operate successfully.";

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
    // para.textContent = defaultData;
    // convert textcontent of para to array
    console.log(capitalFlag, specialFlag, numFlag);
    capitalLetter();
    specialLetter();
    numLetter();
    console.log(capitalFlag, specialFlag, numFlag);
    // console.log(words);
}

getData();

// Function to add and remove capital letters
function capitalLetter(){
    if(!capitalFlag){
        capital.classList.remove('on');
        para.textContent = para.textContent.toLowerCase();
        words = para.textContent.split(' ');
        words = words.filter((word) => word !== '' && word !== '\n');
    }
    else{
        capital.classList.add('on');
        let text = defaultData;
        if(!numFlag){
            // remove numbers from text
            // text = text.replace(/[0-9]/g, '');
            // remove numbers from text using concise method
            text = text.replace(/\d/g, '');
        }
        if(!specialFlag){
            // remove special characters from text
            text = text.replace(/[^a-zA-Z0-9\s]/g, '');
        }
        para.textContent = text;
        words = para.textContent.split(' ');
        words = words.filter((word) => word !== '' && word !== '\n');
    }
}

// Function to add and remove special characters
function specialLetter(){
    if(!specialFlag){
        special.classList.remove('on');
        // remove special characters from text
        para.textContent = para.textContent.replace(/[^a-zA-Z0-9\s]/g, '');
        words = para.textContent.split(' ');
        words = words.filter((word) => word !== '' && word !== '\n');
    }
    else{
        special.classList.add('on');
        let text = defaultData;
        if(!numFlag){
            // remove numbers from text
            text = text.replace(/[0-9]/g, '');
        }
        if(!capitalFlag){
            // remove capital letters from text
            text = text.toLowerCase();
        }
        para.textContent = text;
        words = para.textContent.split(' ');
        words = words.filter((word) => word !== '' && word !== '\n');
    }
}

// Function to add and remove numbers
function numLetter(){
    if(numFlag){
        num.classList.add('on');
    }
    else{
        num.classList.remove('on');
    }
}

// Function to calculate wpm, raw and accuracy
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
    accuracydiv.innerHTML = `${accuracy.toFixed(2)}`;
}

// Updating time
function chTime(){
    if(restartFlag){
        restartFlag = false;
        return;
    }
    if(time > 0){
        time -= 1;
        m = Math.floor(time / 60);
        s = time % 60;
        // console.log(m, s);
        timediv.innerHTML = `${m}:${s.toString().padStart(2, '0')}`;
        // const inputbox = document.getElementById('input');
        // let paraheight = para.offsetHeight;
        // let avg = (textBox.offsetHeight + inputbox.offsetHeight)/2;
        // if(avg > paraheight){
        // }
        // textBox.offsetHeight -= 0.1*(document.documentElement.clientHeight);
        // console.log(textBox.offsetHeight, para.offsetHeight, avg, document.documentElement.clientHeight);
        calculateWpm();
        setTimeout(chTime, 1000);
    }
    else if(index === words.length){
        calculateWpm();
        textBox.innerHTML = `You completed it before time <br> Wpm =  ${correctWord} words/min <br> Raw = ${raw} words/min <br> Accuracy = ${accuracy.toFixed(2)}%`;
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
        textBox.innerHTML = `Time's up! <br> Wpm =  ${wpm} words/min <br> Raw = ${raw} words/min <br> Accuracy = ${accuracy.toFixed(2)}%`;
    }
}

// Getting input from user
window.addEventListener("keydown", (event) => {
    let key = event.key;
    // console.log(key);
    if (time === stTime && key !== " " && event.key.length === 1) {
        // restartFlag = false;
        chTime();
    }

    if (key === " ") {
        // checking is the typed word is correct or not
        // console.log(typedWord, words[index]);
        if (typedWord != "" && typedWord.trim() === words[index++]) {
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
            if(typedWord === ""){
                typedWord = words[index++];   
            }
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
    restartFlag = true;
    m = 0, s = 0,time = stTime;
    wordCount = 0, correctWord = 0, incorrectWord = 0, accuracy = 0, wpm = 0, raw = 0, typedWord = '';
    index = 0;
    textBox.innerHTML = "";
    para = document.createElement('span');
    para.id = "para";
    para.textContent = "";
    textBox.appendChild(para);

    getData();
    m = Math.floor(time / 60);
    s = time % 60;
    timediv.innerHTML = `${m}:${s.toString().padStart(2, '0')}`;
    wpmdiv.innerHTML = "00";
    rawdiv.innerHTML = "00";
    accuracydiv.innerHTML = "00";
});

// captial letters adding and removing
capital.addEventListener('click', () => {
    capitalFlag = !capitalFlag;
    capitalLetter();
});

// special characters adding and removing
special.addEventListener('click', () => {
    specialFlag = !specialFlag;
    specialLetter();
});

// numbers adding and removing
num.addEventListener('click', () => {
    numFlag = !numFlag;
    numLetter();
});

// Changing time for test and remove and add checked attribute in btns clicked value
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btns.forEach((otherBtn) => {
            otherBtn.classList.remove('active');
        });
        btn.classList.add('active');
        stTime = parseInt(btn.dataset.value);
        console.log(stTime);
        time = stTime;
        let m = Math.floor(stTime / 60);
        let s = stTime % 60;
        timediv.innerHTML = `${m}:${s.toString().padStart(2, '0')}`;
    });
});