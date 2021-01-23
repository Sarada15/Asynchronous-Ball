var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var a = database.ref("Ball/Position");

    //.on function is going to listen to the values
    a.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("Ball/Position").set({
        "x": position.x + x,
        "y": position.y + y
    })
    /*ball.x = ball.x + x;
    ball.y = ball.y + y;*/
}

function readPosition(data) {
    
    //data.val contains the value of the .on ..... (x and y)
    position = data.val();
    ball.x = position.x;
    ball.y = position.y; 
}


function showError () {
    console.log("error made in writing the code");
}