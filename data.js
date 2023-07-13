// let numberOfFiles = 0;
// const folderPath = window.location.pathname + '/textFiles';
// console.log(window.location.pathname, folderPath);
// fetch(folderPath)
//   .then(response => response.text())
//   .then(data => {
//     const files = data.split('\n').filter(file => file !== ''); // Split the response by newlines and filter out empty lines
//     numberOfFiles = files.length;
//     console.log('Number of files:', numberOfFiles);
//   })
//   .catch(error => {
//     console.error('Error reading folder:');
//   });


// Fetching data from text files
// function getData(){
//     // fetch('https://raw.githubusercontent.com/Anshul1507/Typing-Test/main/para.txt')
//     // .then(response => response.text())
//     // .then(data => {
//     //     para.textContent = data;
//     // })
//     // .catch(error => {
//     //     console.log('Error:', error);
//     // });
//     const randomNumber = Math.floor(Math.random() * 2) + 1;
//     // console.log(randomNumber);

//     fetch(`${randomNumber}.txt`)
//     .then(response => response.text())
//     .then(data => {
//         para.textContent = data;
//     })
//     .catch(error => {
//         para.textContent = defaultData;
//         console.log('Error:');
//     });
// }