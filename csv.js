const parse = require('csv-parse');
const fs = require('fs');

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

async function read(csv_route) {
  const websites = await processFile(csv_route);
  return websites;
}

exports.read = read;

