class round {
    usersWords;
    givenWords;
    id;
    currentSection;
    sections;
    constructor(id) {
        this.usersWords = [];
        this.givenWords = [];
        this.id = id;
        this.currentSection=-1;
        this.sections = [new Section1(this), new Section2(this)];
    }

    /* Methods*/

    /* Get words from word DB */

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

   


}