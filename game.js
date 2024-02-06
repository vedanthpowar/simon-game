var buttonColors=["red","green","blue","yellow"];
var userClicked=[];
var gamePattern=[];
var level=0;
$(".container").on("click",function(evt){
    var color=evt.target.id;
    userClicked.push(color);

    var currentLevel=userClicked.length-1;
    checkanswer(currentLevel);

    playaudio(color);
    animatepress(color);
    console.log("user");
    console.log(userClicked);
    console.log("game");
    console.log(gamePattern);
    // console.log(jQuery.type(evt.target.id));
})

$(document).on("keypress",function(){
    if(level==0)    
    nextSequence();
    else if($("h1").text()=="Game Over, Press Any Key to Restart"){
        startOver();
    }
})

function checkanswer(currentLevel){
    if(userClicked[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(currentLevel==gamePattern.length-1){
            nextSequence();
        }
    }
    else{
        console.log("fail");
        playaudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}
function startOver(){
    userClicked=[];
    gamePattern=[];
    level=0;
    nextSequence();
}

function playaudio(color){
    var audio= new Audio(); 
    audio.src="sounds/"+color+".mp3"; 
    audio.play();
}

function nextSequence(gameState){
    level++;
    userClicked=[];
    $("h1").text("level "+level);
    var randnum=Math.floor(Math.random() * 4);
    var randcolor=buttonColors[randnum]
    gamePattern.push(randcolor);
    newanimatepress(randcolor);
    console.log(gamePattern)
}

function newanimatepress(color){
    $("#"+color).addClass("black");
    setTimeout(function() {
        $("#"+color).removeClass("black",100);
    }, 200);
}

function animatepress(color){
    $("#"+color).animate({opacity:"0.5"},"fast").animate({opacity:"1"},"fast");
    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed",100);
    }, 100);
}
