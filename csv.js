const parse = require('csv-parse');
const fs = require('fs');

//parse csv file, then saves values into an object and returns
const processFile = async (csv_route) => {
  records = {};
  const parser = fs
    .createReadStream(csv_route)
    .pipe(parse({
      delimiter: ',',
      columns: true
    }));
  for await (const record of parser) {
    records[record.Website] = record.Path;
  }
  return records
}

//waits for websites, then returns
async function read(csv_route) {
  const websites = await processFile(csv_route);
  console.log('CSV file successfully processed.'.yellow);
  return websites;
}

exports.read = read;

