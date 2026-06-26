/*
==========================================================
Project Kitty ❤️
Sprint 1 - scenes.js

This file contains ONLY data.
No rendering logic.
No DOM manipulation.

Future versions can simply add more scenes.
==========================================================
*/

const SCENES = [

    {
        id: 1,

        type: "hero",

        year: "December 2017",

        title: "The Beginning ❤️",

        subtitle: "Where our forever story quietly began.",

        text:
            "Somewhere in December 2017, two strangers met. Neither of us knew that one simple meeting would become the most beautiful journey of our lives.",

        image: "",

        buttonText: "Tell Me More →"
    },

    {
        id: 2,

        type: "hero",

        year: "1 April 2018",

        title: "Forever Begins 💍",

        subtitle: "The day we promised forever.",

        text:
            "Our engagement wasn't just about exchanging rings. It was the moment we promised to walk through every joy and every challenge together.",

        image: "",

        buttonText: "Continue →"
    },

    {
        id: 3,

        type: "hero",

        year: "10 December 2018",

        title: "Our Wedding ❤️",

        subtitle: "Two hearts. One family.",

        text:
            "The day we became husband and wife. Every memory after this day belongs to us, and every birthday became even more special.",

        image: "",

        buttonText: "Our First Birthday →"
    },

    {
        id: 4,

        type: "hero",

        year: "9 July 2018",

        title: "44.5 Kilometres",

        subtitle: "Just to see your smile.",

        text:
            "That night I travelled 44.5 kilometres from Anand to Sokhda just to wish you Happy Birthday at midnight. Seeing your smile made every kilometre worth it.",

        image: "assets/photos/2018/cover.jpg",

        buttonText: "What's Next? →"
    }

];

/*
==========================================================
Application Constants
==========================================================
*/

const APP = {

    title: "Happy Birthday Kitty ❤️",

    author: "Herry",

    version: "Sprint 1",

    totalScenes: SCENES.length

};