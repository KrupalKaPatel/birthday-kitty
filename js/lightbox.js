/*
==========================================================
Project Kitty
Sprint 2.5 - lightbox.js

Premium Gallery Lightbox

Responsibilities:
1) Open selected image in fullscreen modal
2) Keyboard and swipe navigation
3) Smooth zoom controls
4) Thumbnail filmstrip and captions
==========================================================
*/

const Lightbox = {

    isOpen:false,

    photos:[],

    currentIndex:0,

    zoomLevel:1,

    minZoom:1,

    maxZoom:2.4,

    zoomStep:0.2,

    touchStartX:0,

    modal:null,

    image:null,

    caption:null,

    counter:null,

    thumbs:null,

    zoomValue:null,

    prevBtn:null,

    nextBtn:null,

    closeBtn:null,

    zoomInBtn:null,

    zoomOutBtn:null

};

function createLightbox(){

    if(document.getElementById("lightbox")){

        cacheLightboxElements();

        return;

    }

    const modal = document.createElement("div");

    modal.id = "lightbox";

    modal.className = "lightbox hidden";

    modal.innerHTML = `
        <div class="lightbox-backdrop" id="lightboxBackdrop"></div>
        <div class="lightbox-shell" role="dialog" aria-modal="true" aria-label="Photo viewer">
            <div class="lightbox-topbar">
                <div id="lightboxCounter" class="lightbox-counter">1 / 1</div>
                <div class="lightbox-actions">
                    <button id="lightboxZoomOut" type="button" class="lightbox-action-btn" aria-label="Zoom out">−</button>
                    <span id="lightboxZoomValue" class="lightbox-zoom-value">100%</span>
                    <button id="lightboxZoomIn" type="button" class="lightbox-action-btn" aria-label="Zoom in">+</button>
                    <button id="lightboxClose" type="button" class="lightbox-action-btn" aria-label="Close">✕</button>
                </div>
            </div>
            <div class="lightbox-stage" id="lightboxStage">
                <button id="lightboxPrev" type="button" class="lightbox-nav lightbox-nav-prev" aria-label="Previous photo">‹</button>
                <img id="lightboxImage" class="lightbox-image" alt="Memory photo">
                <button id="lightboxNext" type="button" class="lightbox-nav lightbox-nav-next" aria-label="Next photo">›</button>
            </div>
            <div id="lightboxCaption" class="lightbox-caption"></div>
            <div id="lightboxThumbs" class="lightbox-thumbs"></div>
        </div>
    `;

    document.body.appendChild(modal);

    cacheLightboxElements();

    bindLightboxEvents();

}

function cacheLightboxElements(){

    Lightbox.modal = document.getElementById("lightbox");

    Lightbox.image = document.getElementById("lightboxImage");

    Lightbox.caption = document.getElementById("lightboxCaption");

    Lightbox.counter = document.getElementById("lightboxCounter");

    Lightbox.thumbs = document.getElementById("lightboxThumbs");

    Lightbox.zoomValue = document.getElementById("lightboxZoomValue");

    Lightbox.prevBtn = document.getElementById("lightboxPrev");

    Lightbox.nextBtn = document.getElementById("lightboxNext");

    Lightbox.closeBtn = document.getElementById("lightboxClose");

    Lightbox.zoomInBtn = document.getElementById("lightboxZoomIn");

    Lightbox.zoomOutBtn = document.getElementById("lightboxZoomOut");

}

function bindLightboxEvents(){

    document.getElementById("lightboxBackdrop").addEventListener("click",closeLightbox);

    Lightbox.closeBtn.addEventListener("click",closeLightbox);

    Lightbox.prevBtn.addEventListener("click",showPreviousPhoto);

    Lightbox.nextBtn.addEventListener("click",showNextPhoto);

    Lightbox.zoomInBtn.addEventListener("click",zoomIn);

    Lightbox.zoomOutBtn.addEventListener("click",zoomOut);

    Lightbox.image.addEventListener("dblclick",toggleZoom);

    Lightbox.modal.addEventListener("touchstart",(event) => {

        Lightbox.touchStartX = event.changedTouches[0].screenX;

    },{ passive:true });

    Lightbox.modal.addEventListener("touchend",(event) => {

        const touchEndX = event.changedTouches[0].screenX;

        handleSwipe(touchEndX - Lightbox.touchStartX);

    },{ passive:true });

    document.addEventListener("keydown",(event) => {

        if(!Lightbox.isOpen){

            return;

        }

        switch(event.key){

            case "Escape":

                closeLightbox();

                break;

            case "ArrowLeft":

                event.preventDefault();

                showPreviousPhoto();

                break;

            case "ArrowRight":

                event.preventDefault();

                showNextPhoto();

                break;

            case "+":

            case "=":

                zoomIn();

                break;

            case "-":

                zoomOut();

                break;

            case "0":

                resetZoom();

                break;

        }

    });

}

function openLightbox(photos,startIndex){

    if(!Array.isArray(photos) || photos.length === 0){

        return;

    }

    createLightbox();

    Lightbox.photos = photos;

    Lightbox.currentIndex = normalizeIndex(startIndex,photos.length);

    Lightbox.isOpen = true;

    Lightbox.modal.classList.remove("hidden");

    document.body.classList.add("lightbox-open");

    renderThumbnails();

    renderCurrentPhoto();

}

function closeLightbox(){

    if(!Lightbox.modal){

        return;

    }

    Lightbox.isOpen = false;

    Lightbox.modal.classList.add("hidden");

    document.body.classList.remove("lightbox-open");

}

function normalizeIndex(index,total){

    if(total <= 0){

        return 0;

    }

    if(index < 0){

        return total - 1;

    }

    if(index >= total){

        return 0;

    }

    return index;

}

function renderCurrentPhoto(){

    const photo = Lightbox.photos[Lightbox.currentIndex];

    if(!photo || !Lightbox.image){

        return;

    }

    Lightbox.image.classList.remove("lightbox-image-enter");

    resetZoom();

    Lightbox.image.src = photo.src;

    Lightbox.image.alt = photo.caption || `Photo ${Lightbox.currentIndex + 1}`;

    Lightbox.caption.textContent = photo.caption || "A beautiful memory ❤️";

    Lightbox.counter.textContent = `${Lightbox.currentIndex + 1} / ${Lightbox.photos.length}`;

    updateNavState();

    updateThumbnailState();

    preloadNeighborPhotos();

    void Lightbox.image.offsetWidth;

    Lightbox.image.classList.add("lightbox-image-enter");

}

function renderThumbnails(){

    if(!Lightbox.thumbs){

        return;

    }

    Lightbox.thumbs.innerHTML = "";

    Lightbox.photos.forEach((photo,index) => {

        const thumb = document.createElement("button");

        thumb.type = "button";

        thumb.className = "lightbox-thumb";

        thumb.setAttribute("aria-label",`Open photo ${index + 1}`);

        const image = document.createElement("img");

        image.src = photo.src;

        image.alt = photo.caption || `Thumbnail ${index + 1}`;

        image.loading = "lazy";

        thumb.appendChild(image);

        thumb.addEventListener("click",() => {

            Lightbox.currentIndex = index;

            renderCurrentPhoto();

        });

        Lightbox.thumbs.appendChild(thumb);

    });

}

function updateThumbnailState(){

    if(!Lightbox.thumbs){

        return;

    }

    const thumbButtons = Lightbox.thumbs.querySelectorAll(".lightbox-thumb");

    thumbButtons.forEach((thumb,index) => {

        thumb.classList.toggle("active",index === Lightbox.currentIndex);

        if(index === Lightbox.currentIndex){

            thumb.scrollIntoView({ behavior:"smooth", inline:"center", block:"nearest" });

        }

    });

}

function updateNavState(){

    if(!Lightbox.prevBtn || !Lightbox.nextBtn){

        return;

    }

    const hasManyPhotos = Lightbox.photos.length > 1;

    Lightbox.prevBtn.disabled = !hasManyPhotos;

    Lightbox.nextBtn.disabled = !hasManyPhotos;

}

function showPreviousPhoto(){

    if(!Lightbox.isOpen){

        return;

    }

    Lightbox.currentIndex = normalizeIndex(Lightbox.currentIndex - 1,Lightbox.photos.length);

    renderCurrentPhoto();

}

function showNextPhoto(){

    if(!Lightbox.isOpen){

        return;

    }

    Lightbox.currentIndex = normalizeIndex(Lightbox.currentIndex + 1,Lightbox.photos.length);

    renderCurrentPhoto();

}

function preloadNeighborPhotos(){

    if(Lightbox.photos.length <= 1){

        return;

    }

    const nextIndex = normalizeIndex(Lightbox.currentIndex + 1,Lightbox.photos.length);

    const prevIndex = normalizeIndex(Lightbox.currentIndex - 1,Lightbox.photos.length);

    [Lightbox.photos[nextIndex],Lightbox.photos[prevIndex]].forEach((photo) => {

        if(!photo || !photo.src){

            return;

        }

        const preloader = new Image();

        preloader.src = photo.src;

    });

}

function setZoom(level){

    if(!Lightbox.image){

        return;

    }

    Lightbox.zoomLevel = Math.max(Lightbox.minZoom,Math.min(Lightbox.maxZoom,level));

    Lightbox.image.style.transform = `scale(${Lightbox.zoomLevel})`;

    Lightbox.zoomValue.textContent = `${Math.round(Lightbox.zoomLevel * 100)}%`;

}

function resetZoom(){

    setZoom(1);

}

function zoomIn(){

    setZoom(Lightbox.zoomLevel + Lightbox.zoomStep);

}

function zoomOut(){

    setZoom(Lightbox.zoomLevel - Lightbox.zoomStep);

}

function toggleZoom(){

    if(Lightbox.zoomLevel > 1){

        resetZoom();

        return;

    }

    setZoom(1.8);

}

function handleSwipe(distance){

    if(Math.abs(distance) < 55){

        return;

    }

    if(distance > 0){

        showPreviousPhoto();

        return;

    }

    showNextPhoto();

}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
