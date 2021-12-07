// Quiz Script

$("#quiz").submit(function getPoints() {
    // Creating variables with the checked answers value.

    var age = parseInt($('input[name = "age"]:checked').val());

    var color = parseInt($('input[name = "color"]:checked').val());

    var power = parseInt($('input[name = "power"]:checked').val());

    var morning = parseInt($('input[name = "morning"]:checked').val());

    var zodiac = parseInt($('input[name = "zodiac"]:checked').val());

    var sugar = parseInt($('input[name = "sugar"]:checked').val());

    // Summing up each value.

    var total = age + color + power + morning + zodiac + sugar;


    // If-Szenarios for different amounts of Points.

    if (total < 150) {
        $("#answer").html("<p class='answer'>Shuri</p>" + "<br>" + "<br>" + '<img src="images/Game2_Test/shuri.gif" alt="shuri" width="520">');
    }
    if (total >= 150 && total < 300) {
        $("#answer").html("<p class='answer'>Pepper Pots</p>" + "<br>" + "<br>" + '<img src="images/Game2_Test/pepper.gif" alt="pepper" width="520">');
    }
    if (total >= 300 && total < 450) {
        $("#answer").html("<p class='answer'>Aunt May</p>" + "<br>" + "<br>" + '<img src="images/Game2_Test/may.gif" alt="may" width="520">');
    }
    if (total >= 450 && total < 600) {
        $(".answer").html("<p class='answer'>Carol Danvers</p>" + "<br>" + "<br>" + '<img src="images/Game2_Test/carol.gif" alt="carol" width="520">');
    }
    if (total >= 600 && total < 750) {
        $("#answer").html("<p class='answer'>Natasha Romanoff</p>" + "<br>" + "<br>" + '<img src="images/Game2_Test/natasha.gif" alt="natasha" width="520">');
    }
    if (total >= 750) {
        $("#answer").html("<p class='answer'>Wanda Maximoff</p>" + "<br>" + "<br>" + '<img src="images/Game2_Test/wanda.gif" alt="wanda" width="520">');
    }

    // So there is no need to refresh.	

    return false;
});
