/*
==========================================================
Project Kitty ❤️
Sprint 1 - engine.js

Scene Engine

Responsibilities:
✔ Keep track of current scene
✔ Navigate Next / Previous
✔ Update Scene Counter
✔ Show / Hide Screens
✔ Trigger UI Rendering
==========================================================
*/

const Engine = {

    currentScene: 0,

    totalScenes: CHAPTERS.length

};

/*
==========================================================
DOM Elements
==========================================================
*/

const loaderScreen = document.getElementById("loader");

const introScreen = document.getElementById("intro");

const storyScreen = document.getElementById("story");

/*
==========================================================
Hide Every Screen
==========================================================
*/

function hideAllScreens(){

    loaderScreen.classList.add("hidden");

    introScreen.classList.add("hidden");

    storyScreen.classList.add("hidden");

}

/*
==========================================================
Show Loader
==========================================================
*/

function showLoader(){

    hideAllScreens();

    loaderScreen.classList.remove("hidden");

}

/*
==========================================================
Show Intro
==========================================================
*/

function showIntro(){

    hideAllScreens();

    introScreen.classList.remove("hidden");

}

/*
==========================================================
Show Story
==========================================================
*/

function showStory(){

    hideAllScreens();

    storyScreen.classList.remove("hidden");

}

/*
==========================================================
Get Current Scene
==========================================================
*/

function getCurrentScene(){

    return CHAPTERS[Engine.currentScene];

}

/*
==========================================================
Render Current Scene
==========================================================
*/

function renderCurrentScene(){

    const scene = getCurrentScene();

    if(!scene){

        return;

    }

    renderScene(scene);

    document.dispatchEvent(

        new CustomEvent("kitty:scene-change",{

            detail:{

                scene,

                index:Engine.currentScene,

                total:Engine.totalScenes

            }

        })

    );

    updateSceneCounter();

    updateNavigationButtons();

}

/*
==========================================================
Next Scene
==========================================================
*/

function nextScene(){

    if(Engine.currentScene >= Engine.totalScenes - 1){

        Engine.currentScene = 0;

        renderCurrentScene();

        return;

    }

    Engine.currentScene++;

    renderCurrentScene();

}

/*
==========================================================
Previous Scene
==========================================================
*/

function previousScene(){

    if(Engine.currentScene <= 0){

        return;

    }

    Engine.currentScene--;

    renderCurrentScene();

}

/*
==========================================================
Jump To Scene
==========================================================
*/

function goToScene(index){

    if(index < 0){

        return;

    }

    if(index >= Engine.totalScenes){

        return;

    }

    Engine.currentScene = index;

    renderCurrentScene();

}

/*
==========================================================
Scene Counter
==========================================================
*/

function updateSceneCounter(){

    document.getElementById("sceneCounter").textContent =

        `${Engine.currentScene + 1} / ${Engine.totalScenes}`;

}

/*
==========================================================
Buttons
==========================================================
*/

function updateNavigationButtons(){

    const prev = document.getElementById("prevBtn");

    const next = document.getElementById("nextBtn");

    prev.disabled = Engine.currentScene === 0;

    next.disabled = false;

}

/*
==========================================================
Start Story
==========================================================
*/

function startJourney(){

    Engine.currentScene = 0;

    showStory();

    renderCurrentScene();

}

/*
==========================================================
Expose Functions
==========================================================
*/

window.showLoader = showLoader;

window.showIntro = showIntro;

window.showStory = showStory;

window.startJourney = startJourney;

window.nextScene = nextScene;

window.previousScene = previousScene;

window.goToScene = goToScene;