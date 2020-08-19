var xlsx = require('xlsx');
var fileName = 'Wordlist.xlsx';
var sheetName = 'word_list';


class WordDatabase {
    
    static wordListTable = xlsx.readFile(fileName).Sheets[sheetName];
    static wordCount = Number(WordDatabase.wordListTable["!ref"].split(':')[1].slice(1));

    static getRandomWord() {
        var num = Math.floor((Math.random()*WordDatabase.wordCount)+1);
        var cell = 'A'+num;
        return WordDatabase.wordListTable[cell].v;
    }

}

module.exports = WordDatabase;