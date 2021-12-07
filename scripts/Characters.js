"use strict";


//gets the button with stated id and on click toggles the slide
$(".charactersAccordion").click(function () {
    $(this).next("div").slideToggle("slow"); //opens the following div
});

