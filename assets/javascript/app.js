let numCorrect = 0;
let numWrong = 0;
let numBlank = 0;
let returned = false;
let timer;
let clock;
const timeConst = 60;
let time = timeConst
const audio = new Audio("assets/audio/nmh_scream1.mp3");

const scoring = function(){
    const q1Response = $('input[name="q1"]:checked').val();
    const q2Response = $('input[name="q2"]:checked').val();
    const q3Response = $('input[name="q3"]:checked').val();
    if(q1Response === 'a'){
        numCorrect++;
    }else if($('input[name="q1"]:checked').val() === undefined){
        numBlank++;
    }else{
        numWrong++;
    }

    if(q2Response === 'b'){
        numCorrect++;
    }else if($('input[name="q2"]:checked').val() === undefined){
        numBlank++;
    }else{
        numWrong++;
    }

    if(q3Response === 'c'){
        numCorrect++;
    }else if($('input[name="q3"]:checked').val() === undefined){
        numBlank++;
    }else{
        numWrong++;
    }

    hideQs();
    returned = true;
    time = timeConst;

    const cDiv = $('<div>')
    cDiv.html('Number Correct: ' + numCorrect);
    const wDiv = $('<div>')
    wDiv.html('Number Incorrect: ' + numWrong);
    const bDiv = $('<div>')
    bDiv.html('Number Blank: ' + numBlank);
    $('#answerHolder').append(cDiv);
    $('#answerHolder').append(wDiv);
    $('#answerHolder').append(bDiv);
    $('#timer').text('00:00');
    clearTimeout(timer);
    clearInterval(clock);
}

const hideQs = function(){
    $('.questions').css('display', 'none');
    $('#submit').css('display', 'none');
    $('#start').css('display', 'inline');
    $('#dontPush').css('display', 'none');
}

const showQs = function(){
    numCorrect = 0;
    numWrong = 0;
    numBlank = 0;
    returned = false;
    clock = setInterval(countDown, 1000);
    $('input[name="q1"]').prop('checked', false);
    $('input[name="q2"]').prop('checked', false);
    $('input[name="q3"]').prop('checked', false);
    $('#iToldYouNotTo').css('display', 'none');
    $('.questions').css('display', 'inline');
    $('#submit').css('display', 'inline');
    $('#dontPush').css('display', 'inline');
    $('#start').css('display', 'none');
}

function timeConverter(t) {

    console.log(t);
    let minutes = Math.floor(t / 60);
    console.log(minutes);
    let seconds = t - (minutes * 60);
    console.log(seconds);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }
  
function countDown(){
    time--;
    let converted = timeConverter(time);
    // console.log(converted);
    $('#timer').text(converted);
}

$('#start').on('click', function(){
    showQs();
    setTimeout(timer, (time * 1000));
    function timer(){
        if(returned === false){
            scoring();
        }
    }
    $('#answerHolder').empty();
    $('.header').css('display', 'inline');
})

$('#submit').on("click", function(){
    scoring();
})

$('#dontPush').on("click", function(){
    $('#iToldYouNotTo').css('display', 'inline');
    audio.play();
    $('.header').css('display', 'none');
    hideQs();
    clearTimeout(timer);
    clearInterval(clock);
    time = timeConst;
})

