function displayLeaderBoard(text) { 
    console.log(text)
    scores = text.split('\n')

    console.log(scores)
    for (i = 0; i < 10; i++) {
        var li = $('<li>' + scores[i] + '</li>');

        $('.scores').append(li);
    }

}

$( document ).ready(function() {
    fetch('../../backend/leaderboard.txt')
    .then(response => response.text())
    .then(text => displayLeaderBoard(text))
});

