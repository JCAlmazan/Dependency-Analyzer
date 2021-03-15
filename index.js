const analyze = require('./analyze.js'),
    csv = require('./csv.js'),
    readLineSync = require('readline-sync');
    colors = require('colors');

//waits for csv file, then returns an object with all websites
function welcome() {
    console.log('Welcome to Dependency Analyzer Program(DAP)!'.cyan);
    let csv_route = readLineSync.question("Please enter your .csv file route: ");
    while (!csv.validate(csv_route)){
        csv_route = readLineSync.question("Please enter your .csv file route: ");
    }
    return csv.read(csv_route);
}

//receives websites, then they are sent to selected option
function menu() {
    var websites = Promise.resolve(welcome());
    websites.then(function (value) {
        let userRes;
        while (userRes !== '0') {  
            console.log("1 ".green, "Length");
            console.log("2 ".green, "Dependencies");
            console.log("3 ".green, "Frequency");
            console.log("0 ".red, "Exit");
            userRes = readLineSync.question("Pick an option: ");
            if (userRes === '1') {                
                analyze.length(value);
            } else if (userRes === '2') {                
                analyze.dependencies(value);
            } else if (userRes === '3') {                
                analyze.frequency(value);
            }
            if (userRes !== '0') {
                console.log('Continue?'.magenta);
                console.log("0 ".red+"No ");
                console.log("1 ".green+"Yes ");
                userRes = readLineSync.question("Pick an option: ");
            }
        }
    });
}

//execute menu function when program starts
menu();