/*
==========================================================
Project Kitty ❤️
Sprint 1 - navigation.js

Navigation Controller

Responsibilities:
✔ Next Button
✔ Previous Button
✔ Keyboard Navigation
✔ Prevent invalid navigation

Future:
✔ Swipe Support
==========================================================
*/

/*
==========================================================
DOM Elements
==========================================================
*/

const navBeginButton = document.getElementById("beginBtn");

const navNextButton = document.getElementById("nextBtn");

const navPreviousButton = document.getElementById("prevBtn");
/*
==========================================================
Begin Journey
==========================================================
*/

navBeginButton.addEventListener("click", () => {

    startJourney();

});

/*
==========================================================
Next
==========================================================
*/

navNextButton.addEventListener("click", () => {

    nextScene();

});

/*
==========================================================
Previous
==========================================================
*/

navPreviousButton.addEventListener("click", () => {

    previousScene();

});

/*
==========================================================
Keyboard Navigation
==========================================================
*/

document.addEventListener("keydown", (event) => {

    switch(event.key){

        case "ArrowRight":

            nextScene();

            break;

        case "ArrowLeft":

            previousScene();

            break;

        case " ":

            event.preventDefault();

            nextScene();

            break;

        case "Enter":

            if(!document.getElementById("intro").classList.contains("hidden")){

                startJourney();

            }

            break;

        case "Home":

            goToScene(0);

            break;

        case "End":

            goToScene(APP.totalScenes - 1);

            break;

    }

});

/*
==========================================================
Future Swipe Support

Reserved for Sprint 2
==========================================================
*/

let touchStartX = 0;

let touchEndX = 0;

document.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});

document.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    const distance = touchEndX - touchStartX;

    if(Math.abs(distance) < 70){

        return;

    }

    if(distance > 0){

        previousScene();

    }

    else{

        nextScene();

    }

}

/*
==========================================================
Disable Context Menu (Optional)

Comment this block if you want right-click enabled.
==========================================================
*/

// document.addEventListener("contextmenu",(e)=>{

//     e.preventDefault();

// });

/*
==========================================================
Navigation Loaded
==========================================================
*/

console.log("✅ Navigation Ready");