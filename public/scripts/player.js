class Player {
    username;
    score;
    constructor(username) {
        this.score = 0;
        this.username = username;
    }

    get score() {
        return this.score;
    }

    get username() {
        return this.username;
    }

    setScore(score){
        this.score = score;
    }

    addScore(score=1) {
        this.score+=score;
    }

    removeScore(score=1) {
        this.score -= score;
    }

    restart() {
        this.score = 0;
    }


}
module.exports = Player;