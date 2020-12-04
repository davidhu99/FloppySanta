function displayLeaderBoard(text) { 
    scores = text.split('\n')

    for (i = 0; i < 10; i++) {
        var li = $('<li>' + scores[i] + '</li>');
        $('.scores').append(li);
    }
    localStorage.lowestScore = parseInt(scores[9].split(' ')[1])
}

$( document ).ready(function() {
    fetch('../../backend/leaderboard.txt')
    .then(response => response.text())
    .then(text => displayLeaderBoard(text))
});