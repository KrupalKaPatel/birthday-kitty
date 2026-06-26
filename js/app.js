/*
==========================================================
Project Kitty ❤️
Sprint 1 - app.js

Application Bootstrap

Responsibilities
✔ Loader Animation
✔ Progress Bar
✔ Loading Messages
✔ Intro Screen
✔ Typing Effect
✔ Initialize Application
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});

/*
==========================================================
Loading Messages
==========================================================
*/

const loadingMessages = [

    "Collecting Memories...",

    "Finding Beautiful Moments...",

    "Polishing Every Smile...",

    "Wrapping Everything With Love...",

    "Almost Ready..."

];

/*
==========================================================
Initialize
==========================================================
*/

function initializeApplication(){

    showLoader();

    startLoader();

}

/*
==========================================================
Loader Animation
==========================================================
*/

function startLoader(){

    const progressBar = document.getElementById("progress-bar");

    const loadingText = document.getElementById("loadingText");

    let progress = 0;

    let messageIndex = 0;

    const timer = setInterval(() => {

        progress += 2;

        progressBar.style.width = progress + "%";

        if(progress % 20 === 0){

            loadingText.textContent =

                loadingMessages[messageIndex];

            messageIndex++;

            if(messageIndex >= loadingMessages.length){

                messageIndex = loadingMessages.length - 1;

            }

        }

        if(progress >= 100){

            clearInterval(timer);

            setTimeout(() => {

                showIntro();

                startTyping();

            },500);

        }

    },50);

}

/*
==========================================================
Typing Effect
==========================================================
*/

function startTyping(){

    const element = document.getElementById("typing");

    const text = "Hi Kitty... ❤️";

    element.textContent = "";

    let index = 0;

    const timer = setInterval(() => {

        element.textContent += text.charAt(index);

        index++;

        if(index >= text.length){

            clearInterval(timer);

            document
                .getElementById("beginBtn")
                .classList
                .add("pulse");

        }

    },90);

}

/*
==========================================================
Restart Journey

Future Feature
==========================================================
*/

function restartJourney(){

    Engine.currentScene = 0;

    startJourney();

}

/*
==========================================================
Preload Images

Future Feature
==========================================================
*/

function preloadImages(){

    SCENES.forEach(scene => {

        if(scene.image){

            preloadImage(scene.image);

        }

    });

}

// Reserved for Sprint 2
// preloadImages();

/*
==========================================================
Application Ready
==========================================================
*/

console.log(

    `❤️ ${APP.title} | ${APP.version} Ready`

);