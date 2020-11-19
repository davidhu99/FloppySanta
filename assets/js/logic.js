const GENERATE_SPEED = 3000;
// const OBSTACLE_HEIGHT = ;
const OBSTACLE_GAP = 150;
const KEYS = {
    up: 38,
    down: 40,
    spacebar: 32
};

let game_window;
let start_x;
let chimney_pic = "../../images/chimney.svg";
let icicle_pic = "../../images/icicle.svg";
let coin_pic = "../../images/coin.svg";
let present_pic = "../../images/present_temp.svg";
let movement_interval_handle;
let gravity_interval_handle;
let obstacle_idx = 0;
let present_idx = 0;
let player;

$(document).ready( function() {
    game_window = $(".container");
    start_x = parseInt(game_window.css("left")) + 300;
    // start_x = 100;
    // set the global player handle
    player = $('#player');

    // user keyboard input
    $(window).keydown(keydownRouter);

    // periodically check for collisions
    setInterval(function() {
        checkCollisions();
    }, 25);

    console.log("begin game")
    start_game();
});

function start_game(){
    // create_obstacle();
    movement_interval_handle = setInterval(create_obstacle, GENERATE_SPEED);
    // gravity_interval_handle = setInterval(function() {
    //     let newPos = parseInt(player.css('top'))+15;
    //     // if (newPos > maxPersonPosY) {
    //     //     newPos = maxPersonPosY;
    //     // }
    //     player.css('top', newPos);
    // }, 100);
};

function get_random_height(){
    // return (Math.random() * (max - min)) + min;
    let max = -10;
    let min = -350;
    return (Math.random() * (max - min)) + min;
}

function create_obstacle(){
    let top_height = get_random_height();
    let bottom_height = top_height + 400; 
    let middle_height = top_height + 450; // 30 is half of coin size
    // let top_height = 0;
    // let bottom_height = 0;
    // let middle_height = 0;

    let icicle_string = "<div id='i-" + obstacle_idx + "' style='position: absolute; left:" 
                        + (start_x + 10 )+ "px; top:" + top_height + "px' class='icicle'><img class='icicle' src='" 
                        + icicle_pic + "'>";
    let coin_string = "<div id='co-" + obstacle_idx + "' style='position: absolute; left:" 
                        + (start_x + 115) + "px; top:" + middle_height + "px' class='coin'><img class='coin' src='" 
                        + coin_pic + "'>";
    let chimney_string = "<div id='c-" + obstacle_idx + "' style='position: absolute; left:" 
                        + start_x + "px; top:" + bottom_height + "px' class='chimney'><img class='chimney' src='" 
                        + chimney_pic + "'>";
    $(icicle_string).appendTo(".container");
    $(coin_string).appendTo(".container");
    $(chimney_string).appendTo(".container");
    move_obstacles(obstacle_idx);
    obstacle_idx++;
};

function create_present(upwards) {
    let present_string = "<div id='p-" + present_idx + "' style='position: absolute; left:" 
                        + parseInt(player.css('left')) + "px; top:" + parseInt(player.css('top')) + "px' class='present'><img class='present' src='" 
                        + present_pic + "'>";
    $(".container").append(present_string);
    move_presents(present_idx, upwards);
    present_idx++;
};

function move_obstacles(id){
    let xChange = 2;
    let iterationsLeft = window.innerWidth / xChange;
    let icicleObj = $("#i-" + id);
    let coinObj = $("#co-" + id);
    let chimneyObj = $("#c-" + id);
    for (let i = 0; i < iterationsLeft; i++){
        setTimeout(function(){ 
            let newXPos = parseInt(chimneyObj.css("left")) - xChange;
            if (newXPos < -100){
                icicleObj.remove();
                coinObj.remove();
                chimneyObj.remove();
            }
            icicleObj.css('left', newXPos + 10); 
            coinObj.css('left', newXPos + 115); 
            chimneyObj.css('left', newXPos); 
            // console.log("moving item");
        }, i * 10);
    }
}

function move_presents(id, upwards){
    let xChange = 2;
    let yChange = 5;
    let iterationsLeft = Math.max(window.innerWidth / xChange, window.innerHeight / yChange);
    let presentObj = $("#p-" + id);
    for (let i = 0; i < iterationsLeft; i++){
        setTimeout(function(){ 
            let newXPos = parseInt(presentObj.css("left")) - xChange;
            if (newXPos < -40){
                presentObj.remove();
            }
            presentObj.css('left', newXPos); 
            let newYPos = parseInt(presentObj.css("top")) + yChange;
            if (newYPos > 560){
                presentObj.remove();
            }
            presentObj.css('top', newYPos); 
        }, i * 10);
    }
}

function increase_Score(){
    let score = parseInt($("#score").text().slice(7)) + 1;
    $("#score").text("Score: " + score);
}

function keydownRouter(e) {
    switch (e.which) {
        case KEYS.spacebar:
        case KEYS.up:
        case KEYS.down:
            movePerson(e.which);
            break;
        default:
            console.log("Invalid input!");
    }
}

// Handle player movement events
function movePerson(arrow) {
    switch (arrow) {
        case KEYS.up: { // throw present up
            console.log("Up!");
            create_present(true);
            break;
        }
        case KEYS.down: { // throw present down
            console.log("Down!");
            create_present(false);
            break;
        }
        case KEYS.spacebar: { // fly up once
            console.log("Spacebar!");
            let newPos = parseInt(player.css('top'))-50;
            if (newPos < 0) {
                newPos = 0;
            }
            player.css('top', newPos);
            break;
        }
    }
}

// Check if two objects are colliding
function isCollidingPlayer(o1, o2) {
    const o1D = { 'left': o1.offset().left,
          'right': o1.offset().left + o1.width(),
          'top': o1.offset().top,
          'bottom': o1.offset().top + o1.height()
        };
    var tempImg = o2.getElementsByTagName('img')[0];
    var itemClass = "." + tempImg.className;
    const o2D = { 'left': parseInt(o2.style.left),
            'right': parseInt(o2.style.left) + $(itemClass).width(),
            'top': parseInt(o2.style.top),
            'bottom': parseInt(o2.style.top) + $(itemClass).height()
    };
    // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    // if collision detected
    if (o1D.left < o2D.right &&
      o1D.right > o2D.left &&
      o1D.top < o2D.bottom &&
      o1D.bottom > o2D.top) {
        return true;
    }
    return false;
}

// Check if two objects are colliding
function isColliding(o1, o2) {
    var tempImg1 = o1.getElementsByTagName('img')[0];
    var itemClass1 = "." + tempImg1.className;
    const o1D = { 'left': parseInt(o1.style.left),
          'right': parseInt(o1.style.left) + $(itemClass1).width(),
          'top': parseInt(o1.style.top),
          'bottom': parseInt(o1.style.top) + $(itemClass1).height()
    };
    var tempImg2 = o2.getElementsByTagName('img')[0];
    var itemClass2 = "." + tempImg2.className;
    const o2D = { 'left': parseInt(o2.style.left),
            'right': parseInt(o2.style.left) + $(itemClass2).width(),
            'top': parseInt(o2.style.top),
            'bottom': parseInt(o2.style.top) + $(itemClass2).height()
    };
    // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    // if collision detected
    if (o1D.left < o2D.right &&
      o1D.right > o2D.left &&
      o1D.top < o2D.bottom &&
      o1D.bottom > o2D.top) {
        return true;
    }
    return false;
}

// Also Santa NON-collision with icicle/chimney -> add to score
function checkCollisions() {
    // 1. Santa collision with icicle -> game over
    var icicles = $('[id^="i-"]');
    for (var i = 0; i < icicles.length; i++) {
        if (isCollidingPlayer(player, icicles[i])) {
            console.log("Icicle hit");
            // game over state
        }
    }

    // 2. Santa collision with chimney -> game over
    var chimneys = $('[id^="c-"]');
    for (var i = 0; i < chimneys.length; i++) {
        if (isCollidingPlayer(player, chimneys[i])) {
            console.log("Chimney hit");
            // game over state
        }
    }

    // 3. Santa collision with coin -> add to coin count
    var coins = $('[id^="co-"]');
    for (var i = 0; i < coins.length; i++) {
        if (isCollidingPlayer(player, coins[i])) {
            console.log("Coin hit");
            // add to coin count
        }
    }

    // 4. Santa collision with ground -> game over
    

    var presents = $('[id^="p-"]');
    for (var i = 0; i < presents.length; i++) {
        // 5. Present collision with chimney -> add to score
        for (var j = 0; j < chimneys.length; j++) {
            if (isColliding(presents[i], chimneys[j])) {
                console.log("Present hit chimney");
                // add to score
            }
        }
        // 6. Present collision with icicle/ground/non-chimney -> subtract from score
        for (var j = 0; j < icicles.length; j++) {
            if (isColliding(presents[i], icicles[j])) {
                console.log("Present hit icicle");
                // subtract from score
            }
        }
        // 7. Present collision with window edge -> subtract from score
    }
}