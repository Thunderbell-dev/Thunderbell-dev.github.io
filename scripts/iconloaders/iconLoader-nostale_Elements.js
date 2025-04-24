const imageMap_Elements = {
    ":Dark:": "/images/public/icons/nostale/Elements/Dark.webp",
    ":Distance:": "/images/public/icons/nostale/Elements/Distance.webp",
    ":ElementalForces:": "/images/public/icons/nostale/Elements/ElementalForces.gif",
    ":Fire:": "/images/public/icons/nostale/Elements/Fire.webp",
    ":Light:": "/images/public/icons/nostale/Elements/Light.webp",
    ":Magic:": "/images/public/icons/nostale/Elements/Magic.webp",
    ":Melee:": "/images/public/icons/nostale/Elements/Melee.webp",
    ":Neutral:": "/images/public/icons/nostale/Elements/Neutral.webp",
    ":Water:": "/images/public/icons/nostale/Elements/Water.webp",
};

document.addEventListener("guideLoaded", function () {
    replaceTextWithImages(imageMap_Elements);
});
