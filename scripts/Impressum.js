//slideshow thing
var imgSlides_i = 0;

//Array containing all images for slideshow
var imgSlides_array = ['images/Impressum/1.jpg', 'images/Impressum/2.jpg', 'images/Impressum/3.jpg', 'images/Impressum/4.jpg', 'images/Impressum/5.jpg', 'images/Impressum/6.png', 'images/Impressum/7.jpg', 'images/Impressum/8.jpg', 'images/Impressum/9.jpg', 'images/Impressum/10.jpg', 'images/Impressum/11.jpg', 'images/Impressum/12.png'];
var imgSlides_elem;

//function that changes the src attribute (therefore the img) 
function imgSlidesNext() {
    imgSlides_elem.setAttribute("src", imgSlides_array[imgSlides_i]);
    imgSlides_i++;
    if (imgSlides_i > 11) {
        imgSlides_i = 0;
    }
    setTimeout('imgSlidesSlide()', 1000)
}

function imgSlidesSlide() {
    imgSlides_elem.html = imgSlides_array[imgSlides_i];
    imgSlides_elem.style.opacity = 1;
    setTimeout('imgSlidesNext()', 2000);
}

//selecting the element with id imgSlides and saving it as the variable imgSlides_i
imgSlides_elem = $('#imgSlides')[0];

//calling the function
imgSlidesSlide();
