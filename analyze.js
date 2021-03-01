const fs = require('fs'),
    validUrl = require('valid-url'),
    request = require('request'),
    detect = require('htmldeps'),
    Analyze = {};

function length(websites) {
    console.log('Website name and the content length (in bytes):'.cyan);
    for (var name in websites) {
        if (validUrl.isUri(websites[name])) {
            const remote_url = websites[name],
                path = '/tmp/' + name + '.html',
                media = request(remote_url).pipe(fs.createWriteStream(path));
            media.on("finish", () => {
                console.log(name + ",", fs.statSync(path).size);
            });
        }
        else {
            console.log(name + ",", fs.statSync(websites[name]).size);
        }
    }
}

async function dependencies(websites) {
    console.log('Website name and the dependencies:'.cyan);
    for (var name in websites) {
        try {
            if (validUrl.isUri(websites[name])) {
                const remote_url = websites[name],
                    path = '/tmp/' + name + '.html',
                    media = request(remote_url).pipe(fs.createWriteStream(path));
                media.on("finish", () => {                    
                    const data = fs.readFileSync(path, 'utf8');
                    var deps = detect(data.toString()).filter(check_js);
                    deps.forEach(dependency => {
                        const slug = dependency.split('/').pop();
                        console.log(name + ',', slug.yellow);
                    });
                });
            }
            else {                
                const data = fs.readFileSync(websites[name], 'utf8');
                var deps = detect(data.toString()).filter(check_js);
                deps.forEach(dependency => {
                    const slug = dependency.split('/').pop();
                    console.log(name + ',', slug.yellow);
                });
            }
        } catch (err) {
            console.error(err)
        }
    }
}

function check_js(deps) {
    return deps.includes(".js");
}

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
    console.log('Dependencies and the frequency occurrences:'.cyan);
    for (var dependency in ocurrences) {
        const slug = dependency.split('/').pop();
        console.log(slug + ',', ocurrences[dependency]);
    }
}

Analyze.length = length;
Analyze.dependencies = dependencies;
Analyze.frequency = frequency;
module.exports = Analyze;