document.addEventListener("DOMContentLoaded", function () {
    function attachLightboxToImages() {
        const images = Array.from(document.querySelectorAll("#guide-content img"));
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const thumbnailContainer = document.createElement("div");
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");

        let currentIndex = 0;

        if (!lightbox || !lightboxImg) {
            console.error("Lightbox elements not found!");
            return;
        }

        lightbox.innerHTML = "";

        prevButton.textContent = "‹";
        nextButton.textContent = "›";
        prevButton.classList.add("lightbox-nav", "prev");
        nextButton.classList.add("lightbox-nav", "next");

        thumbnailContainer.classList.add("thumbnail-container");
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(thumbnailContainer);
        lightbox.appendChild(prevButton);
        lightbox.appendChild(nextButton);

        function isValidImage(src) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
            return validExtensions.some(ext => src.toLowerCase().endsWith(ext));
        }

        const validImages = images.filter(img => isValidImage(img.src));
        if (validImages.length === 0) {
            console.error("No valid images found.");
            return;
        }

        function showImage(index) {
            if (index >= 0 && index < validImages.length) {
                lightboxImg.src = validImages[index].src;
                currentIndex = index;
                updateActiveThumbnail();
            }
        }

        function updateActiveThumbnail() {
            document.querySelectorAll(".thumbnail").forEach((thumb, idx) => {
                thumb.classList.toggle("active", idx === currentIndex);
            });
        }

        validImages.forEach((img, index) => {
            const imgSrc = img.src;

            img.style.cursor = "pointer";
            img.addEventListener("click", function () {
                lightbox.style.display = "flex";
                showImage(index);
            });

            const thumbnail = document.createElement("img");
            thumbnail.src = imgSrc;
            thumbnail.classList.add("thumbnail");
            thumbnail.addEventListener("click", () => showImage(index));
            thumbnailContainer.appendChild(thumbnail);
        });

        prevButton.addEventListener("click", function () {
            currentIndex = (currentIndex - 1 + validImages.length) % validImages.length;
            showImage(currentIndex);
        });

        nextButton.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % validImages.length;
            showImage(currentIndex);
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                lightbox.style.display = "none";
            } else if (event.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + validImages.length) % validImages.length;
                showImage(currentIndex);
            } else if (event.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % validImages.length;
                showImage(currentIndex);
            }
        });
    }

    document.addEventListener("guideLoaded", attachLightboxToImages);
});
