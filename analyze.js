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
        fs.readFile(websites[name], function (err, data) {
            if (err) throw err;
            else {
                var deps = detect(data.toString()).filter(check_js);
                deps.forEach(dependency => {
                    console.log(name, dependency);
                });
            }
        });
    }
}

async function dependencies(websites) {
    await process_dependencies(websites);
}

function check_js(deps) {
    return deps.includes(".js");
}

function frequency(websites) {
    /*fs.readFile('./local_pages/band.html', function (err, data) {
        if (err) throw err;
        else {
            var deps = detect(data.toString());
            console.log('dependencias:', deps.filter(check_js));
        }
    });*/

    var ocurrences = Promise.resolve(recorrer(websites));
    ocurrences.then(function (value) {
        console.log('entro frequency: ', value);
        for (var dependency in value) {
            console.log(dependency, value[dependency]);
        }
    });
}

async function recorrer(websites) {
    var ocurrences = {};
    for (var name in websites) {
        fs.readFile(websites[name], function (err, data) {
            if (err) throw err;
            else {
                var deps = detect(data.toString()).filter(check_js);
                console.log('dependencias:', deps);
                for (let i = 0; i < deps.length; i++) {
                    if (ocurrences[deps[i]]) {
                        ocurrences[deps[i]] += 1;
                    }
                    else {
                        ocurrences[deps[i]] = 1;
                    }
                }
            }
            console.log('ocurrencias1', ocurrences);
        });

    }
    console.log('ocurrencias2', ocurrences);
    return ocurrences;
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