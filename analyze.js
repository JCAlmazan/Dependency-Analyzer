const fs = require('fs'),
    validUrl = require('valid-url'),
    request = require('sync-request'),
    detect = require('htmldeps'),
    Analyze = {};

//for each website checks if it's an http resource or a local file and prints its size
function length(websites) {
    console.log('Website name and the content length (in bytes):'.cyan);
    for (var name in websites) {
        if (validUrl.isUri(websites[name])) {
            const path = '/tmp/' + name + '.html';
            var res = request('GET', websites[name]);
            var body = res.getBody();
            fs.writeFileSync(path, body, 'utf8');
            console.log(name + ",", fs.statSync(path).size);
        }
        else {
            console.log(name + ",", fs.statSync(websites[name]).size);
        }
    }
}

//for each website checks if it's an http resource or a local file and prints every dependency
function dependencies(websites) {
    console.log('Website name and the dependencies:'.cyan);
    for (var name in websites) {
        try {
            if (validUrl.isUri(websites[name])) {
                const path = '/tmp/' + name + '.html';
                var res = request('GET', websites[name]);
                var body = res.getBody();
                fs.writeFileSync(path, body, 'utf8');
                const data = fs.readFileSync(path, 'utf8');
                var deps = detect(data.toString()).filter(check_js);
                deps.forEach(dependency => {
                    const slug = dependency.split('/').pop();
                    console.log(name + ',', slug.yellow);
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

//checks if deps is a .js dependency
function check_js(deps) {
    return deps.includes(".js");
}

//for each website checks if it's an http resource or a local file, count every dependency's ocurrency, then prints it
function frequency(websites) {
    var ocurrences = {};
    for (var name in websites) {
        try {
            if (validUrl.isUri(websites[name])) {
                const path = '/tmp/' + name + '.html';
                var res = request('GET', websites[name]);
                var body = res.getBody();
                fs.writeFileSync(path, body, 'utf8');
                const data = fs.readFileSync(path, 'utf8');
                var deps = detect(data.toString()).filter(check_js);
            }
            else {
                const data = fs.readFileSync(websites[name], 'utf8');
                var deps = detect(data.toString()).filter(check_js);
            }
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