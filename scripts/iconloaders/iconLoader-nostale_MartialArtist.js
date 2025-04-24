const imageMap_MartialArtist = {
    ":SP1MA:": "/images/public/icons/nostale/MartialArtist/SP1MA.gif",
    ":SP2MA:": "/images/public/icons/nostale/MartialArtist/SP2MA.gif",
    ":SP3MA:": "/images/public/icons/nostale/MartialArtist/SP3MA.gif",
    ":SP5MA:": "/images/public/icons/nostale/MartialArtist/SP5MA.gif",
    ":SP6MA:": "/images/public/icons/nostale/MartialArtist/SP6MA.gif",
    ":SP7MA:": "/images/public/icons/nostale/MartialArtist/SP7MA.gif",
    ":SPMA:": "/images/public/icons/nostale/MartialArtist/SPMA.gif",
};

document.addEventListener("guideLoaded", function () {
    replaceTextWithImages(imageMap_MartialArtist);
});
