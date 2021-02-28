const analyze = require('./analyze.js'),
    csv = require('./csv.js'),
    validUrl = require('valid-url'),
    readLineSync = require('readline-sync'),
    parser = require('csv-parser'),
    request = require('request'),
    fs = require('fs');

function welcome() {
    console.log('Welcome to Dependency Analyzer Program (DAP)!');
    let csv_route = readLineSync.question("Please enter your .csv file route: ");
    /*var websites = Promise.resolve(csv.read(csv_route));
    websites.then(()=>{
        return websites;
    });*/
    return csv.read(csv_route);
}

function menu() {
    var websites = Promise.resolve(welcome());
    websites.then(function (value) {
        let userRes;
        while (userRes !== '0') {
            console.log("0) Exit")
            console.log("1) Length")
            console.log("2) Dependencies")
            console.log("3) Frequency")
            userRes = readLineSync.question("Pick an option: ");
            if (userRes === '1') {
                console.log('you pick option 1');
                analyze.length(value);
            } else if (userRes === '2') {
                console.log('you pick option 2');
                analyze.dependencies(value);
            } else if (userRes === '3') {
                console.log('you pick option 3');
                analyze.frequency(value);
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