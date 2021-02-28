const fs = require('fs'),
    validUrl = require('valid-url'),
    request = require('request'),
    Analyze = {};

function length(websites) {
    console.log("length websites:", websites);
    for (var name in websites) {
        console.log("paso el for");
        if (validUrl.isUri(websites[name])) {
            const remote_url = websites[name],
                path = '/tmp/' + websites[name],
                media = request(remote_url).pipe(fs.createWriteStream(path));
            media.on("finish", () => {
                console.log(name + " length,", fs.statSync(path).size);
            });
        }
        else {
            console.log(name + " length,", fs.statSync(websites[name]).size);
        }
    }
}

/*function dependencies(websites) {
    for (var name in websites) {
        fs.readFile(websites[name], function (err, data) {
            if (err) throw err;
            if (data.includes('<script>')) {
                console.log(data)
            }
        });
    }
}*/

Analyze.length = length;
//Analyze.dependencies = dependencies;
//Analyze.frequency = frequency;
module.exports = Analyze;