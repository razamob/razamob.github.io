var array = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0; 
var level = 0;
var check = false;

PlaySound = function (name) {
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/'+name+".mp3");
    audio.loop = false;
    audio.play(); 
}

function nextSequence(){
    var randomNum =  Math.floor(Math.random()*4);
    var randomChosenColour = array[randomNum];
    gamePattern.push(randomChosenColour);
    PlaySound(randomChosenColour);
    $("h1").text("Level " + level)
    level++;
    }

window.onkeydown = function(){
    //var level = "Level 0";
    if(count < 1){
        count++;
       // $("h1").text(level)
        nextSequence();
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
}


//does it for each click.. should be on final click
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    PlaySound(userChosenColour);
    animatePress(userChosenColour);
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    }, 100);
        

    checkError();
    
    if(userClickedPattern.length == gamePattern.length && gamePattern.length != 0) {
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }
})

function checkError(){
    for(var i=0;i<userClickedPattern.length;i++){
        console.log(userClickedPattern.length);
        console.log(gamePattern.length);
        if (userClickedPattern[i] !== gamePattern[i]){
                var audio = new Audio('sounds/wrong.mp3');
                audio.loop = false;
                audio.play(); 
        
                $("body").addClass("game-over");
                setTimeout(function(){
                    $("body").removeClass("game-over");
                }, 2000)
        
                $("h1").text("Game Over! Press any key to restart.");
                userClickedPattern = [];

                count = 0;
                level = 0;
                gamePattern = []
        }
    }
}

