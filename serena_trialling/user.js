class user {
    username;
    score;
    pastWords;
    constructor(username) {
        this.username = username;
        this.score = 0;
        this.pastWords = [];
    }

    // adds score to user after first part of round is complete 
    addScorePart1(arrayOfWords) {
        this.score += arrayOfWords.length;
    }
    // deducts score from user after second part of round is complete 
    addScorePart2(time) {
        this.score -= time;
    }

}