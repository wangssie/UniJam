module.exports = class Player {
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

}