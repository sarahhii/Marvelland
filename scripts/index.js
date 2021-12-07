// XML-Slideshow 

var m = 0,
    len;
displayMOVIE(m);

/* Call XML-File */

function displayMOVIE(m) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this, m);
        }
    };
    xmlhttp.open("GET", "movies.xml", true);
    xmlhttp.send();
}

/* Get Information */

function myFunction(xml, m) {
    var xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName("MOVIE");
    len = x.length;
    document.getElementById("movie").innerHTML =
        '<img src="images/index/mcu/' + x[m].getElementsByTagName("POSTER")[0].childNodes[0].nodeValue + '" width="250" align="center">'
    document.getElementById("text").innerHTML =
        x[m].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue + "<br>" +
        x[m].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue; +
    "<br>Phase " +
    x[m].getElementsByTagName("PHASE")[0].childNodes[0].nodeValue;
}

/* Slide-Function */

function next() {
    if (m < len - 1) {
        m++;
        displayMOVIE(m);
    }
}

function previous() {
    if (m > 0) {
        m--;
        displayMOVIE(m);
    }
}


// Simple Slideshow

var slideIndex = 1;
showSlides(slideIndex);

/* Slide-Function */

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Get Slides */

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


// Spoiler AJAX

function getspoilers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("spoiler").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "spoiler.txt", true);
    xhttp.send();
}
