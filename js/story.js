/*
=========================================
Story Renderer
=========================================
*/

function renderScene(){

    const scene=scenes[currentScene];

    if(!scene){

        return;

    }

    document.getElementById("sceneYear").textContent=scene.year;

    document.getElementById("sceneTitle").textContent=scene.title;

    document.getElementById("sceneText").textContent=scene.text;

}

document
.getElementById("beginBtn")
.onclick=()=>{

    showStoryScreen();

    renderScene();

};

document
.getElementById("nextBtn")
.onclick=()=>{

    nextScene();

};