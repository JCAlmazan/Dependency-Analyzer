const parse = require('csv-parse');
const fs = require('fs');
const { finished } = require('stream/promises');
 
const processFile = async (csv_route) => {
  records = {};
  const parser = fs
  .createReadStream(csv_route)
  .pipe(parse({
    delimiter: ',',
    columns: true
  }));
  parser.on('readable', function(){
    let record;
    while (record = parser.read()) {
        records[record.Website] = record.Path;
    }
  });
  await finished(parser);
  return records
}

async function read(csv_route){
  const websites = await processFile(csv_route);
  return websites;
};


/*const parser = require('csv-parser'),
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
};*/

exports.read = read;

