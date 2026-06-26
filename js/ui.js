/*
==========================================================
Project Kitty ❤️
Sprint 1 - ui.js

UI Renderer

Responsibilities:
✔ Render scene data
✔ Update text
✔ Update image
✔ Update button text
✔ Apply animations

No navigation logic here.
==========================================================
*/

/*
==========================================================
DOM Elements
==========================================================
*/

const memoryYear = document.getElementById("sceneYear");

const memoryTitle = document.getElementById("sceneTitle");

const memoryText = document.getElementById("sceneText");

const memoryImage = document.getElementById("sceneImage");

const nextButton = document.getElementById("nextBtn");

const sceneCard = document.querySelector(".scene-card");

/*
==========================================================
Render Scene
==========================================================
*/

function renderScene(scene){

    if(!scene){

        return;

    }

    animateScene();

    memoryYear.textContent = scene.year;

    memoryTitle.textContent = scene.title;

    memoryText.textContent = scene.text;

    nextButton.textContent = scene.buttonText;

    renderImage(scene);

}

/*
==========================================================
Render Hero Image
==========================================================
*/

function renderImage(scene){

    if(scene.image && scene.image.trim() !== ""){

        memoryImage.src = scene.image;

        memoryImage.classList.remove("hidden");

    }

    else{

        memoryImage.src = "";

        memoryImage.classList.add("hidden");

    }

}

/*
==========================================================
Scene Animation
==========================================================
*/

function animateScene(){

    sceneCard.classList.remove("scene-enter");

    void sceneCard.offsetWidth;

    sceneCard.classList.add("scene-enter");

}

/*
==========================================================
Update Subtitle (Future)
==========================================================
*/

function updateSubtitle(text){

    // Reserved for Sprint 2

}

/*
==========================================================
Update Theme (Future)
==========================================================
*/

function updateTheme(theme){

    // Reserved for Sprint 2

}

/*
==========================================================
Preload Image (Future)
==========================================================
*/

function preloadImage(path){

    if(!path){

        return;

    }

    const img = new Image();

    img.src = path;

}

/*
==========================================================
Expose Functions
==========================================================
*/

window.renderScene = renderScene;

window.preloadImage = preloadImage;