var Round = require('./round.js');

class Section {
    round;
    word;
    constructor() {
        this.round;
        this.word = getWord();
    }

    /* Section has finished, begin next section in round */
    isFinished() {
        this.round.startNextSection();
    }

    /* get new word from DB */
    getWord() {
        let newWord = 'word';
        /*do {
            var newWord;
            // retrieve word from DB
        }
        while (!this.checkWordNew(newWord)) // makes sure word has not been used in game
        this.round.user.addPastWord(newWord);*/
        return newWord;
    }

    /* make sure word has not been played by user */
    checkWordNew() {

    }

}


