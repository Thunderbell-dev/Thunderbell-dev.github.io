const imageMap_MartialArtist = {
    ":SP1MA:": "/images/public/icons/nostale/MartialArtist/SP1MA.webp",
    ":SP2MA:": "/images/public/icons/nostale/MartialArtist/SP2MA.webp",
    ":SP3MA:": "/images/public/icons/nostale/MartialArtist/SP3MA.webp",
    ":SP5MA:": "/images/public/icons/nostale/MartialArtist/SP5MA.webp",
    ":SP6MA:": "/images/public/icons/nostale/MartialArtist/SP6MA.webp",
    ":SP7MA:": "/images/public/icons/nostale/MartialArtist/SP7MA.webp",
    ":SPMA:": "/images/public/icons/nostale/MartialArtist/SPMA.webp",
};

document.addEventListener("guideLoaded", function () {
    replaceTextWithImages(imageMap_MartialArtist);
});
