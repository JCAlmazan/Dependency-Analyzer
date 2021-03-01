const analyze = require('./analyze.js'),
    csv = require('./csv.js'),
    readLineSync = require('readline-sync');
    colors = require('colors');

function welcome() {
    console.log('Welcome to Dependency Analyzer Program(DAP)!'.cyan);
    let csv_route = readLineSync.question("Please enter your .csv file route: ");
    return csv.read(csv_route);
}

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

menu();


/*
fs.createReadStream('websites.csv')
    .pipe(parser())
    .on('data', (row) => {
        getFilesizeInBytes(row.Path);
        //var scriptCount = row.Path.getElementsByTagName('script').length;
        //console.log(row.Website + " length,", scriptCount);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

function getFilesizeInBytes(route) {

    if (validUrl.isUri(route)) {
        const remote_url = route,
            path = '/tmp/tmp.html',
            media = Promise.resolve(request(remote_url).pipe(fs.createWriteStream(path)));
        media.then(()=>{
            console.log("pagina length,", fs.statSync(path).size);
        });
    }
    else {
        console.log("pagina length,", fs.statSync(route).size);
    }
}*/