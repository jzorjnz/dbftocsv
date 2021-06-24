var parseDBF = require('parsedbf');
const fs = require('fs')

const dbfFilePath = './test.dbf';
const csvFilePath = './test.csv';
const separator = ',';

function readDBFFile(file) {
    var dbfFile = fs.readFileSync(file);
    if (dbfFile && dbfFile.length) {
        var dbfData = parseDBF(dbfFile);
        if (dbfData && dbfData.length) {
            return dbfData;
        }
    }
    return null;
}

function createCSV(dbfData) {
    const rows = dbfData != null ? dbfData.length : 0;
    if (rows > 0) {
        const keys = Object.keys(dbfData[0]);
        let csvData = '';
        csvData += `${keys.join('~')}\n`;
        csvData += dbfData.map(row => keys.map(key => row[key]).join(separator)).join('\n');
        return csvData;
    }
    else {
        console.error('DBF file does not exist or invalid!');
        return null;
    }
}

function writeCSV(csvData, csvFile) {
    fs.writeFile(csvFile, csvData, function (err) {
        if (err) throw err;
        console.log('Done!');
    });
}

function start() {
    let dbfData = readDBFFile(dbfFilePath);
    if (dbfData) {
        let csvData = createCSV(dbfData);
        if (csvData) {
            writeCSV(csvData, csvFilePath);
        }
    }
}

start();
