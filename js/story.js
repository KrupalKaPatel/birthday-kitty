const storyData = [
    {
        year: "2017",
        title: "The Beginning",
        text: "Every beautiful story starts with one unexpected meeting."
    },
    {
        year: "1 April 2018",
        title: "Forever Begins",
        text: "The day we got engaged."
    },
    {
        year: "10 December 2018",
        title: "Our Wedding",
        text: "The day we became one."
    }
];

let currentScene = 0;

function showScene(){

    const intro = document.getElementById("intro");

    intro.innerHTML = `
        <div class="glass scene">

            <span class="year">${storyData[currentScene].year}</span>

            <h1>${storyData[currentScene].title}</h1>

            <p>${storyData[currentScene].text}</p>

            <button id="nextScene">

                Continue ❤️

            </button>

        </div>
    `;

    document
        .getElementById("nextScene")
        .onclick = nextScene;

}

function nextScene(){

    currentScene++;

    if(currentScene >= storyData.length){

        alert("Birthday Timeline coming in v0.3 ❤️");

        return;

    }

    showScene();

}