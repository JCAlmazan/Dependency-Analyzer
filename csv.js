const parser = require('csv-parser'),
    fs = require('fs');
var websites = {};

function read(csv_route){
    fs.createReadStream(csv_route)
    .pipe(parser())
    .on('data', (row) => {
            websites[row.Website] = row.Path;
    }) 
    .on('end', () => {
        console.log('websites1:',  websites)
        console.log('terminó de hace el websites');
        var websites = Promise.resolve(websites);
        websites.then(()=>{
            console.log('websites2: ',websites);
            return websites;
        });
    });
};
/*
function read(csv_route) {
    const save = Promise.resolve(save_websites(csv_route));
    save.then(()=>{
        console.log('websites2: ',websites);
        return websites;
    });
}*/

exports.read = read;

