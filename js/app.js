const years = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "Journey Ready ❤️"
];

const progressBar = document.getElementById("progress-bar");
const loadingText = document.getElementById("loading-text");

let index = 0;

const loader = setInterval(() => {

    progressBar.style.width = `${((index + 1) / years.length) * 100}%`;

    loadingText.innerHTML = years[index];

    index++;

    if (index === years.length) {

        clearInterval(loader);

        setTimeout(showIntro,600);

    }

},450);

function showIntro(){

    document.getElementById("loader").classList.add("hidden");

    document.getElementById("intro").classList.remove("hidden");

    typeStory();

}

const lines=[

"Hi Kitty...",

"Before today begins...",

"I want to take you through our journey ❤️"

];

let line=0;

function typeStory(){

    const heading=document.getElementById("typing");

    const subtitle=document.getElementById("subtitle");

    heading.innerHTML="";

    let i=0;

    const typing=setInterval(()=>{

        heading.innerHTML+=lines[line][i];

        i++;

        if(i>=lines[line].length){

            clearInterval(typing);

            if(line<2){

                line++;

                setTimeout(typeStory,900);

            }else{

                subtitle.innerHTML="A birthday gift made with ❤️ by Herry";

            }

        }

    },55);

}

document.getElementById("beginBtn").onclick=()=>{

    alert("✨ Chapter 1 arrives in v0.2");

};