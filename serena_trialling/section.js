var Round = require('round.js').Round;

class Section {
    round;
    constructor(round) {
        this.round;
    }
    start() {}
    update() {}
    
    /* Section has finished, begin next section in round */
    isFinished() {
        this.round.startNextSection();
    }
}