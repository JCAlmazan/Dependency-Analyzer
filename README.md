# Dependency-Analyzer
Analyze js dependencies from a list of websites (.csv).

Reading a list of websites in csv format, this program returns:

1. Length:
Retrieve the list of results containing the website name and the content length( in bytes).
```
Output example:
Trello, 20032
La Nación, 32323
...
```
2. Dependencies:
Retrieve the list of results containing the website name and the dependencies.
```
Output example:
Trello, analytics.js
Trello, bootstrap.js
La Nación, analytics.js
La Nación, d3.js
...
```
3. Frequency:
Retrieve the dependencies and the frequency occurrences.
```
Output example:
analytics.js, 8
d3.js, 2
bootstrap.js, 3
…
```

Website's html content will be available from two sources, one from the local file system and the other one using http resources.

## Requirements

* Node.js version 14 or above is needed

## How to execute the application

* Clone or download this proyect into a local folder

* Open a terminal into this new folder

* To install dependencies execute: ```npm install```

* To start the program execute: ```npm start```

* Enter "websites.csv" to use the example .csv file

* Follow the instructions to analyze dependencies.

Implemented in Node.js
