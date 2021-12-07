"use strict";

//Reading Info: Q = Question / A = Answers


// function that will generate new question objects: question, choices and correctAnswer from the following array
function newQuestion(params) {
    var temp = {
        question: params[0],
        choices: params[1],
        correctAnswer: params[2]
    };
    return temp;
}

// Array that contains all Qs, As and the correct A. Attention: Counting starts at 0, therefore if the first A is correct it would be 0, the 2nd 1 etc.
// the .map makes the function newQuestion be applied to each element of the allQuestions Array
var allQuestions = [
    ["<img class='qImg' src='images/Game1_Quiz/img1_MCU.jpg'><p><b>Frage 1:</b><br/>Welcher ist chronologisch der erste Film im MCU?<p/>", ["Captain America: The First Avenger", "The Incredible Hulk", "Iron Man ", "Captain Marvel"], 0],
    ["<img class='qImg' src='images/Game1_Quiz/img2_ThorMum.jpg'><p><b>Frage 2:</b><br/>Wie heißt die Mutter von Thor?<p/>", ["Maryline", "Frigga", "Odin", "Hela"], 1],
    ["<img class='qImg' src='images/Game1_Quiz/img3_captainAmerica_calculating.jpg'><p><b>Frage 3:</b><br/>Wann wurde Captain America geboren?<p/>", ["4. Juni 1917", "4. Juli 1918", "3. Juni 1918", "3. Juli 2017"], 1],
    ["<img class='qImg' src='images/Game1_Quiz/img4_Security.gif'><p><b>Frage 4:</b><br/>Wie heißt der treue Angestellte von Tony Stark in Iron Man I?<p/>", ["Ivan Vanko", "Hulk Hogan", "Peter Parker", "Harold Hogan"], 3],
    ["<img class='qImg' src='images/Game1_Quiz/img5_Loki.gif'><p><b>Frage 5:</b><br/>Welcher Spezies gehört Loki an?<p/>", ["Mensch", "Asgardianer", "Dunkelelfen", "Eisriese"], 3],
    ["<img class='qImg' src='images/Game1_Quiz/img6_Hulk.jpg'><p><b>Frage 6:</b><br/>Welche Farbe hatte Hulk bevor er Grün wurde?<p/>", ["schwarz", "rot", "grau", "blau"], 2],
    ["<img class='qImg' src='images/Game1_Quiz/img7_tonyStark_Dance.gif'><p><b>Frage 7:</b><br/>In 'The Avengers' trägt Tony Stark ein T-Shirt einer Heavy Metal Band. Welche ist das?<p/>", ["Black Sabbath", "AC/DC", "Iron Maiden", "Led Zeppelin"], 0],
    ["<img class='qImg' src='images/Game1_Quiz/img8_babyGroot_Dance.gif'><p><b>Frage 8:</b><br/>Zu welchem Song tanzt Baby Groot am Ende vom ersten Teil der 'Guardian of the Galaxy'?<p/>", ["What makes you beautiful - One Direction", "I want you back - The Jackson 5", "Cherry Bomb - The Runaways", "Because I Got High - Afroman"], 1],
    ["<img class='qImg' src='images/Game1_Quiz/img9_Avengers_Eating.jpg'><p><b>Frage 9:</b><br/>Am Ende von 'The Avengers', was essen die Avengers gemeinsam?<p/>", ["Hamburger", "Hot Dogs", "Shawarma", "Sushi"], 2],
    ["<img class='qImg' src='images/Game1_Quiz/img10_Groot.jpg'><p><b>Frage 10:</b><br/>Stell dir vor du bist Groot, woran denkst du?<p/>", ["Pommes", "Rocket", "Glühwürmchen", "I am Groot."], 3]
   ].map(newQuestion);

// Creation of variables total, number (with value 0), and totalQuestions (with value length of allQuestions) 
var total = 0,
    number = 0, //number of current Q
    totalQuestions = allQuestions.length, //number of total Qs
    answers = []; //users answer


//when the doc is ready the following function starts
$(document).ready(function () {

    function newQuestionAnswers() {

        $("#content").show(0, function () { //content container shows
            $("#answers").empty(); //all answer content is emptied for the next As to come
            if (number < totalQuestions) //if the nr is less than the total Qs
                $("#questCount").text("Dein Fortschritt: Frage " + (number + 1) + " von " + totalQuestions); //gets the text of the p with id questCount and writes how far the user has come
            var query = allQuestions[number]; //gets the current (!) Q-Array
            $("#question").html(query.question); //writes the current Q by selecting it from the just created var query 


            // as long as i is smaller than the length of answer choices (or better said: for each answer choice there is)..
            for (var i = 0; i < query.choices.length; i++)
                //...a radio input is appended to the elem with #answers. The input gets a fixed type, name & class . Id and value are depending on the current Q-Nr. (e.g.: radio0 for the first answer option). Same is the label's "for". The answer texts are then written between the label tags. 
                $("#answers").append("<input type='radio' name='answers' class='checkmark' id='radio" + i + "' value='answer" + i +
                    "'><label for='radio" + i + "' class='checkmarkContainer'>" + query.choices[i] + "</label><br>");


        });
        //the elem #content fades in
        $("#content").fadeIn(500);
    }




    //function that checks if a button is checked before proceeding
    function checkAnswer() {

        //as long as i is less than the inputs length (each answer choice = one input button)
        for (var i = 0; i < $("input").length; i++) {

            //goes through elements with class radio1, radio2 etc., if one is checked, the number of the array answers is i (1 if radio 1, 2 if radio 2 etc.). ALso the div with #dontSkip is hidden and the loop breaks
            if ($("#radio" + i).is(":checked")) {
                answers[number] = i;
                $("#dontSkip").hide();
                break;


                // else if the last radio button is reached and it is not checked a text occurs telling the user that they must select an answer.
            } else if (i === $("input").length - 1 && !$("#radio" + i).is(":checked")) {
                $("#dontSkip").show();
                return false;
            }
        }

        // Checks to see if the current radio button checked is the correct answer. If so 10 points are added to the score.
        var query = allQuestions[number];
        if ($("#radio" + query.correctAnswer).is(":checked"))
            updateScore(10);
        number += 1;
        return true;
    }


    // writes the final score in the elem with #score. All other Q & A elems are hidden.  
    function finalScore() {
        $("#score").text("Dein Ergebnis: " + total + "/" + totalQuestions * 10).show(500);
        $("#question, #answers, #questCount, #next").hide(10);
        $("#startagain").show(500);

        //stores the last score (of this browser session!) which the user had when finishing the quiz and adds the info to the page
        sessionStorage.finalScore1 = total;

        //depending on the Score one of three texts is shown on the page
        if (total < 40)
            $("#resultBad").show(500);
        else if (total < 70)
            $("#resultOk").show(500);
        else if (total > 60)
            $("#resultGood").show(500);
    }


    //function that updates the score. total now is total plus change. total is stored in the elem #score (which is hidden)
    function updateScore(change) {
        total += change;
        $("#score").text("Score: " + total);
    }

    // at the beginning all Buttons - except the start button - and some further text is hidden
    $("#next").hide();
    $("#startagain").hide();
    $("#score").hide();
    $("#bar10").hide();
    $("#resultGood").hide();
    $("#resultOk").hide();
    $("#resultBad").hide();
    $("#dontSkip").hide();



    //on start-button hide the button and instead show the next button, the first Q + As and update the Score to 0
    $("#start").on('click', function () {
        $("#start").hide(0);
        $("#next").show(300);
        $("#bar").width('5%');
        newQuestionAnswers();
        updateScore(0);
        //shows the last score which the user had when finishing the quiz on the page (if no prev session the score would be "undefined" so this func wouldnt run)
        if (sessionStorage.finalScore1 != undefined) {
            $("#finalScore1").html("<b>Beim vorherigen Versuch erzielte Punkte: </b>" + sessionStorage.finalScore1 + "/" + totalQuestions * 10 + "<br/>");
        }
    });


    //when clicked on start-again-button the page is  reloaded from the cache.
    $("#startagain").on('click', function () {
        location.reload();
    });



    //when clicked on next-button the following func runs: If the nr of the current Q is less than the total Qs the func newQuestionAnswers will run showing the next Q + As. Otherwise the func finalScore runs showing the user his result.
    $("#next").on('click', function () {
        if (checkAnswer()) {
            if (number < totalQuestions)
                newQuestionAnswers();
            else
                finalScore();



            // If current Q number is > 0 the progress bar is loaded 10%. 
            if (number > 0)
                $("#bar").width('10%');
            //Next steps fill the progress bar step by step.
            if (number > 1)
                $("#bar").width('20%');
            if (number > 2)
                $("#bar").width('30%');
            if (number > 3)
                $("#bar").width('40%');
            if (number > 4)
                $("#bar").width('50%');
            if (number > 5)
                $("#bar").width('60%');
            if (number > 6)
                $("#bar").width('70%');
            if (number > 7)
                $("#bar").width('80%');
            if (number > 8)
                $("#bar").width('90%');
            if (number > 9)
                $("#bar").width('100%');


            //stores the current Score and adds the info to the page
            localStorage.currentScore = total;
            $("#progressDiv").append("<b>Bisherige Punkte: </b>" + localStorage.currentScore + "/" + totalQuestions * 10 + "<br/>");
        }
    });

});
