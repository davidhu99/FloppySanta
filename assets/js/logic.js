const GENERATE_SPEED = 3000;
const OBSTACLE_HEIGHT = 400;
const OBSTACLE_GAP = 150;
const KEYS = {
    up: 38,
    down: 40,
    spacebar: 32
};

let start_x = window.innerWidth - 80;
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
    player = $('#player');  // set the global player handle
    $(window).keydown(keydownRouter);
    console.log("begin game")
    start_game();
});

function start_game(){
    movement_interval_handle = setInterval(create_obstacle, GENERATE_SPEED);
    gravity_interval_handle = setInterval(function() {
        let newPos = parseInt(player.css('top'))+15;
        // if (newPos > maxPersonPosY) {
        //     newPos = maxPersonPosY;
        // }
        player.css('top', newPos);
    }, 100);
};

function get_random_height(){
    // return (Math.random() * (max - min)) + min;
    let max = window.innerHeight - (OBSTACLE_HEIGHT + 200);
    let min = 200 - OBSTACLE_HEIGHT; // negative
    return (Math.random() * (max - min)) + min;
}

function create_obstacle(){
    let top_height = get_random_height();
    let bottom_height = top_height + OBSTACLE_HEIGHT + OBSTACLE_GAP; 
    let middle_height = top_height + OBSTACLE_HEIGHT + (OBSTACLE_GAP / 2) - 30; // 30 is half of coin size

    let icicle_string = "<div id='i-" + obstacle_idx + "' style='position: absolute; left:" 
                        + start_x + "px; top:" + top_height + "px' class='icicle'><img class='icicle' src='" 
                        + icicle_pic + "'>";
    let coin_string = "<div id='co-" + obstacle_idx + "' style='position: absolute; left:" 
                        + (start_x + 10) + "px; top:" + middle_height + "px' class='coin'><img class='coin' src='" 
                        + coin_pic + "'>";
    let chimney_string = "<div id='c-" + obstacle_idx + "' style='position: absolute; left:" 
                        + start_x + "px; top:" + bottom_height + "px' class='chimney'><img class='chimney' src='" 
                        + chimney_pic + "'>";
    $(icicle_string).appendTo("body");
    $(coin_string).appendTo("body");
    $(chimney_string).appendTo("body");
    move_obstacles(obstacle_idx);
    obstacle_idx++;
};

function create_present(upwards) {
    let present_string = "<div id='p-" + present_idx + "' class='present'><img class='present' src='" + present_pic + "'>";
    $(present_string).appendTo("body");
    move_presents(present_idx);
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
            icicleObj.css('left', newXPos); 
            coinObj.css('left', newXPos + 10); 
            chimneyObj.css('left', newXPos); 
            // console.log("moving item");
        }, i * 10);
    }
}

function move_presents(id){
    
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
            let newPos = parseInt(player.css('top'))-25;
            if (newPos < 0) {
                newPos = 0;
            }
            player.css('top', newPos);
            break;
        }
    }
}