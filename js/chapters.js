/*
==========================================================
Project Kitty ❤️
Sprint 2.1

chapters.js

Every object represents one chapter
of our journey together.

Future:
✔ Hero Image
✔ Gallery
✔ Music
✔ Quote
✔ Animation
==========================================================
*/

const CHAPTERS = [

    {
        id: "intro",

        year: "2017",

        date: "December 2017",

        title: "The Beginning ❤️",

        location: "",

        hero: "assets/photos/2017/hero.jpeg",

        gallery: [],

        quote:
            "Every beautiful story begins with one unexpected meeting.",

        story:
            `Somewhere in December 2017, our paths crossed. 
            Neither of us knew that one simple meeting at Vadtal temple would become
            the most beautiful journey of our lives.`
    },

    {
        id: "engagement",

        year: "2018",

        date: "1 April 2018",

        title: "Forever Begins 💍",

        location: "",

        hero: "assets/photos/engagement/hero.jpg",

        gallery: [],

        quote:
            "Two hearts. One promise.",

        story:
            `On this day we promised forever.
            It wasn't just an engagement.
            It was the beginning of our lifetime together.`
    },

    {
        id: "wedding",

        year: "2018",

        date: "10 December 2018",

        title: "Our Wedding ❤️",

        location: "",

        hero: "assets/photos/wedding/hero.jpg",

        gallery: [],

        quote:
            "Two souls became one family.",

        story:
            `The day we became husband and wife.
            Every dream after this day became OUR dream.`
    },

    {
        id: "birthday2018",

        year: "2018",

        date: "9 July 2018",

        title: "44.5 Kilometres of Love ❤️",

        location: "Anand ➜ Sokhda",

        hero: "assets/photos/2018/hero.png",

        gallery: [],

        quote:
            "Some distances are measured in kilometres. Some are measured in love.",

        story:
            `That night, I travelled 44.5 kilometres from Anand to Sokhda
            just to wish you Happy Birthday at midnight.
            Seeing your smile made every kilometre worth travelling.
            After the celebration, we enjoyed beautiful decorations,
            cake cutting, and later created unforgettable memories
            at Orsang Camp.`
    },

    {
        id: "birthday2019",

        year: "2019",

        date: "9 July 2019",

        title: "The Panipuri Surprise 😄",

        location: "At Mango",

        hero: "assets/photos/2019/hero.jpeg",

        gallery: [],

        quote:
            "Sometimes the best surprises begin with a small lie.",

        story:
            `I told you that we were simply going to eat Panipuri.
            Instead...
            I surprised you with a beautiful dinner
            at At Mango.
            The look on your face
            made the surprise unforgettable.`
    },

    {
        id: "birthday2020",

        year: "2020",

        date: "9 July 2020",

        title: "Together Through Everything ❤️",

        location: "Home",

        hero: "assets/photos/2020/IMG_20200709_173357.jpg",

        gallery: [],

        quote:
            "Even during difficult times, love always finds a celebration.",

        story:
            `The world was fighting Corona. We celebrated at home. Simple decorations.
            Boat headphones.
            Lots of love.
            And one beautiful message...
            Happy Birthday to my soul, my pillow, my jam, my soyastick, my Kitty, my everything.`
    },

    {
        id: "birthday2021",

        year: "2021",

        date: "9 July 2021",

        title: "Made With My Own Hands ❤️",

        location: "HD Cafe",

        hero: "assets/photos/2021/IMG_20210709_202255.jpg",

        gallery: [],

        quote:
            "The most valuable gifts are made with love.",

        story:
            `A surprise celebration. A handmade craft.
            A handwritten letter.
            Every little thing was created just for you.`
    },

    {
        id: "birthday2022",

        year: "2022",

        date: "9 July 2022",

        title: "Waiting For Our Little Miracle 👶",

        location: "",

        hero: "assets/photos/2022/08972AFB-D0A9-43C1-8603-B72089F97569.JPG",

        gallery: [],

        quote:
            "Sometimes the greatest celebration is waiting for someone new.",

        story:
            `This birthday was different.
            We didn't celebrate much. 
            Because our hearts were already celebrating
            our biggest blessing who was about to arrive.`
    },

    {
        id: "birthday2023",

        year: "2023",

        date: "9 July 2023",

        title: "A New Chapter ❤️",

        location: "Sokhda",

        hero: "assets/photos/2023/hero.jpeg",

        gallery: [],

        quote:
            "Our family became even more beautiful.",

        story:
            `This birthday was filled
            with even more happiness.
            Because now Pranshul was with us.`
    },

    {
        id: "birthday2024",

        year: "2024",

        date: "9 July 2024",

        title: "One Cake Wasn't Enough 🎂",

        location: "",

        hero: "assets/photos/2024/20240709_001118.jpg",

        gallery: [],

        quote:
            "Your favourite cake never lasts long.",

        story:
            `Your favourite cake from Nini's Kitchen.
            We happily finished the whole cake together.
            Every bite came with laughter.`
    },

    {
        id: "birthday2025",

        year: "2025",

        date: "9 July 2025",

        title: "Daman ❤️",

        location: "Daman",

        hero: "assets/photos/2025/6B5C2122-F2FA-4B4C-B598-9490D7410D34.JPG",

        gallery: [],

        quote:
            "The best memories are the ones we never planned.",

        story:
            `A beautiful trip. A late-night cake ordered from Zomato.
            Three people and One cake.
            Lots of laughter. A memory I'll never forget.`
    },

    {
        id: "birthday2026",

        year: "2026",

        date: "9 July 2026",

        title: "Birthday 2026 - The Promise ❤️",

        location: "",

        hero: "assets/photos/2026/hero.png",

        gallery: [],

        quote:
            "Today is not the end of our story. It is a promise for every tomorrow.",

        story:
            `This page is not just a birthday wish. It is my promise.
            I promise to keep choosing you, to keep standing with you,
            to keep laughing with you,
            and to keep building our little world
            with love and patience.

            From 2017 to today,
            you made every year more meaningful.

            Happy Birthday, Kitty.
            My heart is always yours. ❤️`
    },

    {
        id: "happybirthday",

        year: "9 July",

        date: "Today and always",

        title: "Happy Birthday, My Kitty ❤️",

        location: "With love from Krupal & Pranshul",

        hero: "assets/photos/2026/1.jpeg",

        gallery: [],

        quote:
            "May your smile stay this bright, today and for every year ahead.",
        story:
            `Happy Birthday, my beautiful Kitty.
            You are the heartbeat of our home, the calm in our chaos,
            and the reason our family smiles.
            From me, from Pranshul, from every memory in this journey...
            we love you endlessly. 
            And yes, "Padse ne ek zapat Pranshul"
            will forever be your favorite line.
            Stay happy | Stay healthy | Stay exactly the way you are.
            You are priceless. ❤️`
    }

];

/*
==========================================================
Application Information
==========================================================
*/

const APP = {

    title: "Happy Birthday Kitty ❤️",

    author: "Herry",

    version: "Sprint 2.1",

    totalScenes: CHAPTERS.length

};