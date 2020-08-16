var Section1 = require('./section.js').Section1;
var Section2 = require('./section.js').Section2;
class round {
    usersWords;
    id;
    currentSection;
    sections;
    user;
    constructor(id, user) {
        this.usersWords = [];
        this.id = id;
        this.currentSection=0;
        this.sections = [new Section1(this), new Section2(this)];
        this.user = user;
    }

    /* Methods*/

    /* start round */
    startRound() {
        this.sections[this.currentSection].start();
    }

    /* start next section*/
    startNextSection() {
        this.currentSection++;
        this.sections[this.currentSection].start();
    }

    /* GETTER */

    get id() {
        return this.id;
    }
    get userWords() {
        this.usersWords;
    }
    get givenWords() {
        this.givenWords;
    }
    get firstWord() {
        this.givenWords[0];
    }
    get lastWord() {
        this.givenWords[1];
    }
    get user() {
        return this.user;
    }

   


}