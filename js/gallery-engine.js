/*
==========================================================
Project Kitty ❤️
Sprint 2.2

gallery-engine.js

Responsibilities
✔ Render gallery
✔ Create photo cards
✔ Handle empty gallery
✔ Open lightbox (Sprint 2.3)

==========================================================
*/

const galleryContainer = document.getElementById("gallery");

const finalChapterMessages = {

    birthday2026:"We'll add today's memories by EOD, no worries ❤️",

    happybirthday:"This is your ending screen, Kitty. Tap replay and relive every memory."

};

/*
==========================================================
Render Gallery
==========================================================
*/

function normalizePath(path){

    if(!path){

        return "";

    }

    return String(path)
        .replace(/\\/g,"/")
        .toLowerCase();

}

function renderGallery(chapterInput){

    if(!galleryContainer){

        return;

    }

    galleryContainer.innerHTML = "";

    galleryContainer.classList.remove("hidden");

    const isChapterObject =

        chapterInput && typeof chapterInput === "object";

    const chapterId = isChapterObject

        ? chapterInput.id

        : chapterInput;

    const heroPath = isChapterObject

        ? chapterInput.hero

        : "";

    const photos = GALLERY[chapterId] || [];

    if(chapterId === "happybirthday"){

        galleryContainer.classList.add("hidden");

        return;

    }

    const filteredPhotos = photos.filter(photo => {

        return normalizePath(photo.src) !== normalizePath(heroPath);

    });

    if(finalChapterMessages[chapterId]){

        if(chapterId === "birthday2026"){

            galleryContainer.innerHTML = `

                <div class="gallery-empty final-gallery-note final-gallery-promise">

                    <div class="promise-icon">🕰️</div>

                    <h3 class="promise-title">Today's memories are on the way</h3>

                    <p class="promise-subtitle">We'll add today's photos by EOD. No worries, Kitty ❤️</p>

                </div>

            `;

            return;

        }

        if(chapterId === "happybirthday"){

            galleryContainer.innerHTML = `

                <div class="gallery-empty final-gallery-note final-gallery-finale">

                    <div class="finale-icon">🎉</div>

                    <h3 class="finale-title">No photos needed for this moment</h3>

                    <p class="finale-subtitle">This is our final page, made to celebrate your smile and replay every memory again.</p>

                </div>

            `;

            return;

        }

        galleryContainer.innerHTML = `

            <div class="gallery-empty final-gallery-note">

                ❤️

                <p>${finalChapterMessages[chapterId]}</p>

            </div>

        `;

        return;

    }

    if(filteredPhotos.length === 0){

        galleryContainer.innerHTML = `

            <div class="gallery-empty">

                📷

                <p>Photos will be added soon ❤️</p>

            </div>

        `;

        return;

    }

    filteredPhotos.forEach((photo,index)=>{

        const card = createPhotoCard(photo,index,filteredPhotos);

        galleryContainer.appendChild(card);

    });

}

/*
==========================================================
Create Photo Card
==========================================================
*/

function createPhotoCard(photo,index,photos){

    const card = document.createElement("div");

    card.className = "photo-card";

    const image = document.createElement("img");

    image.src = photo.src;

    image.alt = photo.caption || `Photo ${index+1}`;

    image.loading = "lazy";

    image.onclick = ()=>{

        if(window.openLightbox){

            openLightbox(photos,index);

        }

    };

    const caption = document.createElement("div");

    caption.className = "photo-caption";

    const captionText = photo.caption || "";

    caption.textContent = captionText;

    card.appendChild(image);

    if(photo.caption){

        card.appendChild(caption);

    }

    return card;

}

/*
==========================================================
Clear Gallery
==========================================================
*/

function clearGallery(){

    if(galleryContainer){

        galleryContainer.innerHTML = "";

    }

}

/*
==========================================================
Expose
==========================================================
*/

window.renderGallery = renderGallery;

window.clearGallery = clearGallery;