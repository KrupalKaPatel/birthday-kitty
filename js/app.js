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

    applyPerformanceProfile();

    initializeApplication();

});

/*
==========================================================
Performance Profile
==========================================================
*/

function applyPerformanceProfile(){

    const perfOverride = getPerformanceOverride();

    const prefersReducedMotion =

        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lowCpu =

        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency > 0 &&
        navigator.hardwareConcurrency <= 4;

    const lowMemory =

        typeof navigator.deviceMemory === "number" &&
        navigator.deviceMemory > 0 &&
        navigator.deviceMemory <= 4;

    const saveData =

        navigator.connection && navigator.connection.saveData === true;

    const shouldUsePerformanceLite =

        prefersReducedMotion || lowCpu || lowMemory || saveData;

    const isLiteMode =

        perfOverride === "lite"
            ? true
            : perfOverride === "full"
                ? false
                : shouldUsePerformanceLite;

    document.body.classList.toggle("performance-lite",isLiteMode);

}

function getPerformanceOverride(){

    const params = new URLSearchParams(window.location.search);

    const value = (params.get("perf") || "").trim().toLowerCase();

    if(value === "lite" || value === "full"){

        return value;

    }

    return "";

}

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

    CHAPTERS.forEach(chapter => {

        if(chapter.hero){

            preloadImage(chapter.hero);

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