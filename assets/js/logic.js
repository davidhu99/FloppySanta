const GENERATE_SPEED = 3000;
const OBSTACLE_HEIGHT = 400;
const OBSTACLE_GAP = 150;

let start_x = window.innerWidth - 80;
let chimney_pic = "../../images/chimney_temp.png";
let icicle_pic = "../../images/ice_temp.png";
let coin_pic = "../../images/coin_temp.png"
let movement_interval_handle;
let obstacle_idx = 0;

$(document).ready( function() {
    console.log("begin game")
    start_game();
});

function start_game(){
    movement_interval_handle = setInterval(create_obstacle, GENERATE_SPEED);
    // create_obstacle()
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