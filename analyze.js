const fs = require('fs'),
    validUrl = require('valid-url'),
    request = require('request'),
    detect = require('htmldeps'),
    Analyze = {};

function length(websites) {
    console.log('Website name and the content length (in bytes):');
    for (var name in websites) {
        if (validUrl.isUri(websites[name])) {
            const remote_url = websites[name],
                path = '/tmp/' + name + '.html',
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

const process_dependencies = async (websites) => {
    for (var name in websites) {
        try {
            const data = fs.readFileSync(websites[name], 'utf8');
            var deps = detect(data.toString()).filter(check_js);
            deps.forEach(dependency => {
                console.log(name, dependency);
            });
        } catch (err) {
            console.error(err)
        }
    }
}

async function dependencies(websites) {
    await process_dependencies(websites);
}

function check_js(deps) {
    return deps.includes(".js");
}

/*async function frequency(websites) {
    var ocurrences = await process_frequency(websites);
    for (var dependency in ocurrences) {
        console.log(dependency, ocurrences[dependency]);
    }
}*/

async function frequency(websites) {
    var ocurrences = {};
    for (var name in websites) {
        try {
            const data = fs.readFileSync(websites[name], 'utf8');
            var deps = detect(data.toString()).filter(check_js);
            deps.forEach(dependency => {
                if (ocurrences[dependency]) {
                    ocurrences[dependency] += 1;
                }
                else {
                    ocurrences[dependency] = 1;
                }
            });
        } catch (err) {
            console.error(err)
        }
    }
    console.log('Dependencies and the frequency occurrences:');
    for (var dependency in ocurrences) {
        console.log(dependency+',', ocurrences[dependency]);
    }
}



/*
function frequency(websites) {
    let ocurrencies {};
    for (var name in websites) {
        fs.readFile(websites[name], function (err, data) {
            if (err) throw err;
            if (data.includes('<script>')) {
                if(ocurrencies[dependency]){
                    ocurrencies[dependency] += 1;
                }
                else{
                    ocurrencies[dependency] = 1;
                }
            }
        });
    }
    for (var dependency in ocurrencies){
        console.log(dependency, ocurrencies[dependency]);
    }
}*/

Analyze.length = length;
Analyze.dependencies = dependencies;
Analyze.frequency = frequency;
module.exports = Analyze;