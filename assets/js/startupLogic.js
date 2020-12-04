function getLowestScore(text) { 
    scores = text.split('\n')
    lowestScore = parseInt(scores[9].split(' ')[1])
    localStorage.lowestScore = lowestScore
}

$( document ).ready(function() {
    console.log('hello')

    fetch('../../backend/leaderboard.txt')
    .then(response => response.text())
    .then(text => getLowestScore(text))
    // if there's no current skin, set to default
    if (localStorage.getItem("currSkin") == null) {
        localStorage.setItem("currSkin", '../../images/santa.png')
        inventory = dict()
        localStorage.setItem("inventory", JSON.stringify(inventory));
        localStorage.setItem("coins", 0)
        console.log(localStorage.getItem("currSkin"))
    } 
    console.log(localStorage.getItem("currSkin"))

});