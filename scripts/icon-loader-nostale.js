document.addEventListener("guideLoaded", function () {
    replaceTextWithImages(); 
});

function replaceTextWithImages() {
    const imageMap = {
        //sp
        ":SP1A:": "/images/public/icons/nostale/Archer/¤SP1A.gif",
        ":SP1M:": "/images/public/icons/nostale/Mage/¤SP1M.gif",
        ":SP1MA:": "/images/public/icons/nostale/MartialArtist/¤SP1MA.gif",
        ":SP1S:": "/images/public/icons/nostale/Swordie/¤SP1S.gif",
        ":SP2A:": "/images/public/icons/nostale/Archer/¤SP2A.gif",
        ":SP2M:": "/images/public/icons/nostale/Mage/¤SP2M.gif",
        ":SP2MA:": "/images/public/icons/nostale/MartialArtist/¤SP2MA.gif",
        ":SP2S:": "/images/public/icons/nostale/Swordie/¤SP2S.gif",
        ":SP3A:": "/images/public/icons/nostale/Archer/¤SP3A.gif",
        ":SP3M:": "/images/public/icons/nostale/Mage/¤SP3M.gif",
        ":SP3MA:": "/images/public/icons/nostale/MartialArtist/¤SP3MA.gif",
        ":SP3S:": "/images/public/icons/nostale/Swordie/¤SP3S.gif",
        ":SP4A:": "/images/public/icons/nostale/Archer/¤SP4A.gif",
        ":SP4M:": "/images/public/icons/nostale/Mage/¤SP4M.gif",
        ":SP4MA:": "/images/public/icons/nostale/MartialArtist/¤SP4MA.gif",
        ":SP4S:": "/images/public/icons/nostale/Swordie/¤SP4S.gif",
        ":SP5A:": "/images/public/icons/nostale/Archer/¤SP5A.gif",
        ":SP5M:": "/images/public/icons/nostale/Mage/¤SP5M.gif",
        ":SP5MA:": "/images/public/icons/nostale/MartialArtist/¤SP5MA.gif",
        ":SP5S:": "/images/public/icons/nostale/Swordie/¤SP5S.gif",
        ":SP6A:": "/images/public/icons/nostale/Archer/¤SP6A.gif",
        ":SP6M:": "/images/public/icons/nostale/Mage/¤SP6M.gif",
        ":SP6MA:": "/images/public/icons/nostale/MartialArtist/¤SP6MA.gif",
        ":SP6S:": "/images/public/icons/nostale/Swordie/¤SP6S.gif",
        ":SP7A:": "/images/public/icons/nostale/Archer/¤SP7A.gif",
        ":SP7M:": "/images/public/icons/nostale/Mage/¤SP7M.gif",
        ":SP7MA:": "/images/public/icons/nostale/MartialArtist/¤SP7MA.gif",
        ":SP7S:": "/images/public/icons/nostale/Swordie/¤SP7S.gif",
        ":SP8A:": "/images/public/icons/nostale/Archer/¤SP8A.gif",
        ":SP8M:": "/images/public/icons/nostale/Mage/¤SP8M.gif",
        ":SP8S:": "/images/public/icons/nostale/Swordie/¤SP8S.gif",
        ":SP9A:": "/images/public/icons/nostale/Archer/¤SP9A.gif",
        ":SP9M:": "/images/public/icons/nostale/Mage/¤SP9M.gif",
        ":SP9S:": "/images/public/icons/nostale/Swordie/¤SP9S.gif",
        ":SP10A:": "/images/public/icons/nostale/Archer/¤SP10A.gif",
        ":SP10M:": "/images/public/icons/nostale/Mage/¤SP10M.gif",
        ":SP10S:": "/images/public/icons/nostale/Swordie/¤SP10S.gif",
        ":SP11A:": "/images/public/icons/nostale/Archer/¤SP11A.gif",
        ":SP11M:": "/images/public/icons/nostale/Mage/¤SP11M.gif",
        ":SP11S:": "/images/public/icons/nostale/Swordie/¤SP11S.gif",
        ":SPA:": "/images/public/icons/nostale/MartialArtist/¤SPA.gif",
        ":SPM:": "/images/public/icons/nostale/MartialArtist/¤SPM.gif",
        ":SPMA:": "/images/public/icons/nostale/MartialArtist/¤SPMA.gif",
        ":SPS:": "/images/public/icons/nostale/MartialArtist/¤SPS.gif",

        //Pets
        ":Ginseng:": "/images/public/icons/nostale/Pets/ginseng.webp",
        ":Freya:": "/images/public/icons/nostale/Pets/freya.webp",
        ":Jinn:": "/images/public/icons/nostale/Pets/jinn.webp",

        //RaidItems
        ":45Wand:": "/images/public/icons/nostale/RaidItems/45 wand.webp",
        ":RedBow:": "/images/public/icons/nostale/RaidItems/red bow.webp",
        ":PetDoll:": "/images/public/icons/nostale/RaidItems/pet doll.webp",
        ":PartnerDoll:": "/images/public/icons/nostale/RaidItems/partner doll.webp",
        
    };

    const guideContent = document.getElementById("guide-content");
    const textNodes = getTextNodes(guideContent);

    textNodes.forEach(node => {
        let newText = node.textContent;

        // Replace each placeholder with the corresponding image or GIF
        Object.keys(imageMap).forEach(placeholder => {
            const imgSrc = imageMap[placeholder];
            const regex = new RegExp(placeholder, 'g');

            // Perform the replacement for all occurrences of the placeholder
            newText = newText.replace(regex, (match) => {
                return `<img src="${imgSrc}" alt="${placeholder} Icon" class="icon">`;
            });
        });

        // If there's any change in the text, replace the text node with the new HTML content
        if (newText !== node.textContent) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newText;
            node.replaceWith(...tempDiv.childNodes);
        }
    });
}

function getTextNodes(element) {
    const textNodes = [];
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walk.nextNode()) {
        textNodes.push(node);
    }
    return textNodes;
}
