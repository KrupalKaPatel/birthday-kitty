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

const memoryQuiz = document.getElementById("memoryQuiz");

const memoryQuizProgress = document.getElementById("memoryQuizProgress");

const memoryQuizScoreBadge = document.getElementById("memoryQuizScore");

const memoryQuizImage = document.getElementById("memoryQuizImage");

const memoryQuizOptions = document.getElementById("memoryQuizOptions");

const memoryQuizFeedback = document.getElementById("memoryQuizFeedback");

const heartGame = document.getElementById("heartGame");

const heartGameTimer = document.getElementById("heartGameTimer");

const heartGameScore = document.getElementById("heartGameScore");

const heartGameStart = document.getElementById("heartGameStart");

const heartGameArena = document.getElementById("heartGameArena");

const heartGameFeedback = document.getElementById("heartGameFeedback");

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

const MEMORY_QUIZ = {

    chapterId:"memoryquiz",

    rounds:[
        {
            src:"assets/photos/2018/hero.png",
            options:["2017","2018","2020"],
            answer:"2018"
        },
        {
            src:"assets/photos/2020/IMG_20200709_173357.jpg",
            options:["2019","2020","2022"],
            answer:"2020"
        },
        {
            src:"assets/photos/2023/hero.jpeg",
            options:["2021","2022","2023"],
            answer:"2023"
        }
    ]

};

const HEART_GAME = {

    chapterId:"heartgame",

    seconds:12,

    spawnMs:420

};

let activeTransitionToken = 0;

let confettiPrepared = false;

let nextLockedByMiniGame = false;

let memoryQuizToken = 0;

let memoryQuizIndex = 0;

let memoryQuizScore = 0;

let sceneTextTypingTimer = null;

let heartGameActiveToken = 0;

let heartGameCountdownInterval = null;

let heartGameSpawnInterval = null;

let heartGameTimeLeft = HEART_GAME.seconds;

let heartGameHits = 0;

const SCENE_TEXT_TYPING = {

    charMs:40

};

window.isNextLocked = function(){

    return nextLockedByMiniGame;

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

    updateMemoryQuiz(chapter.id);

    updateHeartGame(chapter.id);

    renderHero(chapter);

    renderGallery(chapter);

    placeSceneNavigationAfterGallery();

    resetSceneScrollPosition();

}

function updateHeartGame(chapterId){

    const isHeartGameScene = chapterId === HEART_GAME.chapterId;

    if(!heartGame){

        return;

    }

    heartGame.classList.toggle("hidden",!isHeartGameScene);

    if(!isHeartGameScene){

        stopHeartGame();

        return;

    }

    prepareHeartGame();

}

function prepareHeartGame(){

    stopHeartGame();

    heartGameActiveToken++;

    heartGameTimeLeft = HEART_GAME.seconds;

    heartGameHits = 0;

    nextLockedByMiniGame = true;

    if(heartGameTimer){

        heartGameTimer.textContent = `${HEART_GAME.seconds}s`;

    }

    if(heartGameScore){

        heartGameScore.textContent = "Score 0";

    }

    if(heartGameFeedback){

        heartGameFeedback.textContent = "Tap Start and catch as many hearts as you can.";

    }

    if(heartGameStart){

        heartGameStart.disabled = false;

        heartGameStart.onclick = () => startHeartGameRound(heartGameActiveToken);

    }

    if(nextButton){

        nextButton.disabled = true;

    }

    clearHeartNodes();

}

function startHeartGameRound(token){

    if(token !== heartGameActiveToken){

        return;

    }

    if(heartGameStart){

        heartGameStart.disabled = true;

    }

    if(heartGameFeedback){

        heartGameFeedback.textContent = "Catch them fast, Kitty! 💖";

    }

    heartGameSpawnInterval = setInterval(() => {

        if(token !== heartGameActiveToken){

            stopHeartGame();

            return;

        }

        spawnHeartNode(token);

    },HEART_GAME.spawnMs);

    heartGameCountdownInterval = setInterval(() => {

        if(token !== heartGameActiveToken){

            stopHeartGame();

            return;

        }

        heartGameTimeLeft--;

        if(heartGameTimer){

            heartGameTimer.textContent = `${Math.max(heartGameTimeLeft,0)}s`;

        }

        if(heartGameTimeLeft <= 0){

            finishHeartGame(token);

        }

    },1000);

}

function spawnHeartNode(token){

    if(token !== heartGameActiveToken || !heartGameArena){

        return;

    }

    const heartNode = document.createElement("button");

    heartNode.type = "button";

    heartNode.className = "heart-game-heart";

    heartNode.textContent = "❤";

    const maxX = Math.max(heartGameArena.clientWidth - 36,10);

    const maxY = Math.max(heartGameArena.clientHeight - 36,10);

    heartNode.style.left = `${Math.floor(Math.random() * maxX)}px`;

    heartNode.style.top = `${Math.floor(Math.random() * maxY)}px`;

    heartNode.onclick = () => {

        heartGameHits++;

        if(heartGameScore){

            heartGameScore.textContent = `Score ${heartGameHits}`;

        }

        heartNode.remove();

    };

    heartGameArena.appendChild(heartNode);

    setTimeout(() => {

        if(heartNode.isConnected){

            heartNode.remove();

        }

    },1000);

}

function finishHeartGame(token){

    if(token !== heartGameActiveToken){

        return;

    }

    stopHeartGameIntervals();

    clearHeartNodes();

    const message = heartGameHits >= 12
        ? `Wow ${heartGameHits} hearts! Love magnet unlocked 💘 Tap Continue.`
        : `You caught ${heartGameHits} hearts! Tap Continue to move ahead ✨`;

    if(heartGameFeedback){

        heartGameFeedback.textContent = message;

    }

    nextLockedByMiniGame = false;

    if(nextButton){

        nextButton.disabled = false;

        nextButton.textContent = "Continue Journey →";

    }

}

function stopHeartGame(){

    stopHeartGameIntervals();

    clearHeartNodes();

}

function stopHeartGameIntervals(){

    if(heartGameCountdownInterval){

        clearInterval(heartGameCountdownInterval);

        heartGameCountdownInterval = null;

    }

    if(heartGameSpawnInterval){

        clearInterval(heartGameSpawnInterval);

        heartGameSpawnInterval = null;

    }

}

function clearHeartNodes(){

    if(!heartGameArena){

        return;

    }

    heartGameArena.innerHTML = "";

}

function updateMemoryQuiz(chapterId){

    const isMemoryQuizScene = chapterId === MEMORY_QUIZ.chapterId;

    if(!memoryQuiz){

        nextLockedByMiniGame = false;

        return;

    }

    memoryQuiz.classList.toggle("hidden",!isMemoryQuizScene);

    if(!isMemoryQuizScene){

        nextLockedByMiniGame = false;

        memoryQuizToken++;

        return;

    }

    startMemoryQuiz();

}

function startMemoryQuiz(){

    memoryQuizToken++;

    memoryQuizIndex = 0;

    memoryQuizScore = 0;

    nextLockedByMiniGame = true;

    if(memoryQuizScoreBadge){

        memoryQuizScoreBadge.textContent = "Score 0";

    }

    if(nextButton){

        nextButton.disabled = true;

    }

    renderMemoryQuizRound(memoryQuizToken);

}

function renderMemoryQuizRound(token){

    if(token !== memoryQuizToken){

        return;

    }

    const round = MEMORY_QUIZ.rounds[memoryQuizIndex];

    if(!round || !memoryQuizImage || !memoryQuizOptions || !memoryQuizProgress || !memoryQuizFeedback){

        return;

    }

    memoryQuizProgress.textContent = `${memoryQuizIndex + 1} / ${MEMORY_QUIZ.rounds.length}`;

    if(memoryQuizScoreBadge){

        memoryQuizScoreBadge.textContent = `Score ${memoryQuizScore}`;

    }

    memoryQuizImage.src = round.src;

    memoryQuizFeedback.textContent = "Pick the correct year.";

    memoryQuizOptions.innerHTML = "";

    const shuffledOptions = shuffleQuizOptions(round.options);

    shuffledOptions.forEach((yearOption) => {

        const optionButton = document.createElement("button");

        optionButton.type = "button";

        optionButton.className = "memory-quiz-option";

        optionButton.textContent = yearOption;

        optionButton.addEventListener("click",() => {

            handleMemoryQuizAnswer(optionButton,yearOption,round,token);

        });

        memoryQuizOptions.appendChild(optionButton);

    });

}

function handleMemoryQuizAnswer(button,yearOption,round,token){

    if(token !== memoryQuizToken || !memoryQuizOptions || !memoryQuizFeedback){

        return;

    }

    const optionButtons = memoryQuizOptions.querySelectorAll("button");

    optionButtons.forEach((item) => {

        item.disabled = true;

        if(item.textContent === round.answer){

            item.classList.add("correct");

        }

    });

    if(yearOption === round.answer){

        button.classList.add("correct");

        memoryQuizScore++;

        if(memoryQuizScoreBadge){

            memoryQuizScoreBadge.textContent = `Score ${memoryQuizScore}`;

        }

        memoryQuizFeedback.textContent = "Perfect! You got it right ❤️";

    }

    else{

        button.classList.add("wrong");

        memoryQuizFeedback.textContent = `Close! Correct year was ${round.answer}.`;

    }

    const localToken = token;

    setTimeout(() => {

        if(localToken !== memoryQuizToken){

            return;

        }

        memoryQuizIndex++;

        if(memoryQuizIndex >= MEMORY_QUIZ.rounds.length){

            finishMemoryQuiz(localToken);

            return;

        }

        renderMemoryQuizRound(localToken);

    },700);

}

function finishMemoryQuiz(token){

    if(token !== memoryQuizToken || !memoryQuizOptions || !memoryQuizFeedback){

        return;

    }

    memoryQuizOptions.innerHTML = "";

    if(memoryQuizScore === MEMORY_QUIZ.rounds.length){

        memoryQuizFeedback.textContent = `Perfect ${memoryQuizScore}/${MEMORY_QUIZ.rounds.length}! Memory Queen unlocked 👑 Tap Continue ✨`;

    }

    else{

        memoryQuizFeedback.textContent = `Quiz complete: ${memoryQuizScore}/${MEMORY_QUIZ.rounds.length}. Tap Continue to move ahead ✨`;

    }

    nextLockedByMiniGame = false;

    if(nextButton){

        nextButton.disabled = false;

        nextButton.textContent = "Continue Journey →";

    }

}

function shuffleQuizOptions(options){

    const shuffled = options.slice();

    for(let i = shuffled.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        const temp = shuffled[i];

        shuffled[i] = shuffled[j];

        shuffled[j] = temp;

    }

    return shuffled;

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

    if(chapterId === HEART_GAME.chapterId){

        return "Play Heart Game to Continue 💖";

    }

    if(chapterId === MEMORY_QUIZ.chapterId){

        return "Complete Quiz to Continue ✨";

    }

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