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

const sceneWrapper = document.querySelector(".scene-wrapper");

const memoryDate = document.getElementById("sceneDate");

const memoryLocation = document.getElementById("sceneLocation");

const memoryQuote = document.getElementById("sceneQuote");

const galleryBlock = document.getElementById("gallery");

const finaleMoment = document.getElementById("finaleMoment");

const finaleConfetti = document.getElementById("finaleConfetti");

const sceneNavigation = document.querySelector(".scene-navigation");

const BACKGROUND_WORLDS = [

    "world-dawn",

    "world-promise",

    "world-wedding",

    "world-playful",

    "world-family",

    "world-finale"

];

const SCENE_TRANSITION = {

    fadeOutMs:180,

    fadeInMs:460,

    staggerStepMs:48

};

let activeTransitionToken = 0;

let confettiPrepared = false;

let sceneTextTypingTimer = null;

const SCENE_TEXT_TYPING = {

    charMs:40

};

/*
==========================================================
Render Scene
==========================================================
*/

function renderScene(chapter){

    if(!chapter){

        return;

    }

    const transitionToken = ++activeTransitionToken;

    stopSceneTextTyping();

    beginSceneFadeOut();

    setTimeout(() => {

        if(transitionToken !== activeTransitionToken){

            return;

        }

        applySceneContent(chapter,transitionToken);

        beginSceneFadeIn(transitionToken);

    },SCENE_TRANSITION.fadeOutMs);

}

function applySceneContent(chapter,transitionToken){

    memoryYear.textContent = chapter.year;

    memoryTitle.textContent = chapter.title;

    updateOptionalField(memoryDate,chapter.date);

    updateOptionalField(memoryLocation,chapter.location);

    updateOptionalField(memoryQuote,chapter.quote);

    typeSceneText(chapter.story,transitionToken);

    nextButton.textContent = getNextButtonText(chapter.id);

    applyBackgroundWorld(chapter.id);

    applyFinalChapterTheme(chapter.id);

    updateFinaleMoment(chapter.id);

    renderHero(chapter);

    renderGallery(chapter);

    placeSceneNavigationAfterGallery();

    resetSceneScrollPosition();

}

function typeSceneText(text,transitionToken){

    if(!memoryText){

        return;

    }

    stopSceneTextTyping();

    const fullText = text ? String(text) : "";

    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches){

        memoryText.textContent = fullText;

        memoryText.classList.remove("scene-text-typing");

        return;

    }

    memoryText.textContent = "";

    memoryText.classList.add("scene-text-typing");

    let charIndex = 0;

    sceneTextTypingTimer = setInterval(() => {

        if(transitionToken !== activeTransitionToken){

            stopSceneTextTyping();

            return;

        }

        charIndex++;

        memoryText.textContent = fullText.slice(0,charIndex);

        if(charIndex >= fullText.length){

            stopSceneTextTyping();

        }

    },SCENE_TEXT_TYPING.charMs);

}

function stopSceneTextTyping(){

    if(sceneTextTypingTimer){

        clearInterval(sceneTextTypingTimer);

        sceneTextTypingTimer = null;

    }

    if(memoryText){

        memoryText.classList.remove("scene-text-typing");

    }

}

function placeSceneNavigationAfterGallery(){

    if(!sceneNavigation || !galleryBlock){

        return;

    }

    galleryBlock.insertAdjacentElement("afterend",sceneNavigation);

}

function resetSceneScrollPosition(){

    const storyScreen = document.getElementById("story");

    const scrollTargets = [

        document.scrollingElement,

        document.documentElement,

        document.body,

        storyScreen,

        sceneWrapper,

        sceneCard,

        memoryText,

        galleryBlock

    ];

    scrollTargets.forEach((target) => {

        if(!target){

            return;

        }

        target.scrollTop = 0;

        target.scrollLeft = 0;

    });

    window.scrollTo(0,0);

}

function applyBackgroundWorld(chapterId){

    const worldClass = getBackgroundWorldClass(chapterId);

    document.body.classList.remove(...BACKGROUND_WORLDS);

    if(worldClass){

        document.body.classList.add(worldClass);

    }

}

function getBackgroundWorldClass(chapterId){

    if(chapterId === "intro"){

        return "world-dawn";

    }

    if(chapterId === "engagement"){

        return "world-promise";

    }

    if(chapterId === "wedding"){

        return "world-wedding";

    }

    if(chapterId === "birthday2018" ||
       chapterId === "birthday2019" ||
       chapterId === "birthday2020" ||
       chapterId === "birthday2021"){

        return "world-playful";

    }

    if(chapterId === "birthday2022" ||
       chapterId === "birthday2023" ||
       chapterId === "birthday2024" ||
       chapterId === "birthday2025"){

        return "world-family";

    }

    return "world-finale";

}

function updateFinaleMoment(chapterId){

    if(!finaleMoment){

        return;

    }

    const isHappyBirthdayScene = chapterId === "happybirthday";

    finaleMoment.classList.toggle("hidden",!isHappyBirthdayScene);

    finaleMoment.classList.remove("finale-active");

    if(!isHappyBirthdayScene){

        return;

    }

    prepareConfetti();

    void finaleMoment.offsetWidth;

    finaleMoment.classList.add("finale-active");

}

function prepareConfetti(){

    if(confettiPrepared || !finaleConfetti){

        return;

    }

    const confettiColors = [

        "#C084FC",

        "#E879F9",

        "#A78BFA",

        "#F9A8D4",

        "#F5D0FE",

        "#D8B4FE"

    ];

    for(let i = 0; i < 36; i++){

        const piece = document.createElement("span");

        piece.className = "finale-confetti-piece";

        piece.style.left = `${Math.random() * 100}%`;

        piece.style.backgroundColor = confettiColors[i % confettiColors.length];

        piece.style.setProperty("--fall-duration",`${2.9 + Math.random() * 2.1}s`);

        piece.style.setProperty("--fall-delay",`${Math.random() * .55}s`);

        piece.style.setProperty("--drift",`${(Math.random() * 42) - 21}px`);

        piece.style.setProperty("--spin",`${(Math.random() * 220) - 110}deg`);

        piece.style.setProperty("--size",`${6 + Math.random() * 5}px`);

        finaleConfetti.appendChild(piece);

    }

    confettiPrepared = true;

}

function updateOptionalField(element,value){

    if(!element){

        return;

    }

    const cleanValue = value ? String(value).trim() : "";

    element.textContent = cleanValue;

    element.classList.toggle("hidden",cleanValue === "");

}

function getNextButtonText(chapterId){

    if(chapterId === "birthday2026"){

        return "Final Surprise →";

    }

    if(chapterId === "happybirthday"){

        return "Replay Journey ↺";

    }

    return "Continue →";

}

function applyFinalChapterTheme(chapterId){

    if(!sceneCard){

        return;

    }

    const isFinalChapter =

        chapterId === "birthday2026" ||
        chapterId === "happybirthday";

    sceneCard.classList.toggle("final-chapter",isFinalChapter);

}

/*
==========================================================
Render Hero Image
==========================================================
*/

function renderHero(chapter){

    if(sceneWrapper){

        sceneWrapper.classList.remove("has-hero","no-hero");

    }

    if(chapter.hero && chapter.hero.trim() !== ""){

        memoryImage.classList.remove("scene-image-out","scene-image-in");

        memoryImage.src = chapter.hero;

        memoryImage.classList.remove("hidden");

        void memoryImage.offsetWidth;

        memoryImage.classList.add("scene-image-in");

        if(sceneWrapper){

            sceneWrapper.classList.add("has-hero");

        }

    }

    else{

        memoryImage.src = "";

        memoryImage.classList.add("hidden");

        if(sceneWrapper){

            sceneWrapper.classList.add("no-hero");

        }

    }

}

/*
==========================================================
Scene Animation
==========================================================
*/

function beginSceneFadeOut(){

    if(sceneCard){

        sceneCard.classList.remove("scene-transition-in");

        sceneCard.classList.add("scene-transition-out");

    }

    if(memoryImage && !memoryImage.classList.contains("hidden")){

        memoryImage.classList.remove("scene-image-in");

        memoryImage.classList.add("scene-image-out");

    }

}

function beginSceneFadeIn(transitionToken){

    if(!sceneCard){

        return;

    }

    sceneCard.classList.remove("scene-transition-out");

    sceneCard.classList.remove("scene-transition-in");

    void sceneCard.offsetWidth;

    sceneCard.classList.add("scene-transition-in");

    animateSceneElementsStagger(transitionToken);

}

function animateSceneElementsStagger(transitionToken){

    const sequence = [

        memoryYear,

        memoryTitle,

        memoryDate,

        memoryLocation,

        memoryQuote,

        memoryText,

        galleryBlock,

        finaleMoment,

        sceneNavigation

    ];

    sequence.forEach((element,index) => {

        if(!element || element.classList.contains("hidden")){

            return;

        }

        element.classList.remove("scene-stagger-in");

        element.style.animationDelay = `${index * SCENE_TRANSITION.staggerStepMs}ms`;

        void element.offsetWidth;

        if(transitionToken !== activeTransitionToken){

            return;

        }

        element.classList.add("scene-stagger-in");

    });

    setTimeout(() => {

        if(transitionToken !== activeTransitionToken){

            return;

        }

        sequence.forEach(element => {

            if(!element){

                return;

            }

            element.classList.remove("scene-stagger-in");

            element.style.animationDelay = "";

        });

    },SCENE_TRANSITION.fadeInMs + (sequence.length * SCENE_TRANSITION.staggerStepMs));

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

//window.renderChapter = renderChapter;
window.renderScene  = renderScene;

window.preloadImage = preloadImage;