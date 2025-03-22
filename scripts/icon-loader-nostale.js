document.addEventListener("guideLoaded", function () {
    replaceTextWithImages(); 
});

function replaceTextWithImages() {
    const imageMap = {
        //sp
        ":SP1A:": "/images/public/icons/nostale/sp/sp1a.webp",
        ":SP1M:": "/images/public/icons/nostale/sp/sp1m.webp",
        ":SP1MA:": "/images/public/icons/nostale/sp/sp1ma.webp",
        ":SP1S:": "/images/public/icons/nostale/sp/sp1s.webp",
        ":SP2A:": "/images/public/icons/nostale/sp/sp2a.webp",
        ":SP2M:": "/images/public/icons/nostale/sp/sp2m.webp",
        ":SP2MA:": "/images/public/icons/nostale/sp/sp2ma.webp",
        ":SP2S:": "/images/public/icons/nostale/sp/sp2s.webp",
        ":SP3A:": "/images/public/icons/nostale/sp/sp3a.webp",
        ":SP3M:": "/images/public/icons/nostale/sp/sp3m.webp",
        ":SP3MA:": "/images/public/icons/nostale/sp/sp3ma.webp",
        ":SP3S:": "/images/public/icons/nostale/sp/sp3s.webp",
        ":SP4A:": "/images/public/icons/nostale/sp/sp4a.webp",
        ":SP4M:": "/images/public/icons/nostale/sp/sp4m.webp",
        ":SP4MA:": "/images/public/icons/nostale/sp/sp4ma.webp",
        ":SP4S:": "/images/public/icons/nostale/sp/sp4s.webp",
        ":SP5A:": "/images/public/icons/nostale/sp/sp5a.webp",
        ":SP5M:": "/images/public/icons/nostale/sp/sp5m.webp",
        ":SP5MA:": "/images/public/icons/nostale/sp/sp5ma.webp",
        ":SP5S:": "/images/public/icons/nostale/sp/sp5s.webp",
        ":SP6A:": "/images/public/icons/nostale/sp/sp6a.webp",
        ":SP6M:": "/images/public/icons/nostale/sp/sp6m.webp",
        ":SP6MA:": "/images/public/icons/nostale/sp/sp6ma.webp",
        ":SP6S:": "/images/public/icons/nostale/sp/sp6s.webp",
        ":SP7A:": "/images/public/icons/nostale/sp/sp7a.webp",
        ":SP7M:": "/images/public/icons/nostale/sp/sp7m.webp",
        ":SP7MA:": "/images/public/icons/nostale/sp/sp7ma.webp",
        ":SP7S:": "/images/public/icons/nostale/sp/sp7s.webp",
        ":SP8A:": "/images/public/icons/nostale/sp/sp8a.webp",
        ":SP8M:": "/images/public/icons/nostale/sp/sp8m.webp",
        ":SP8S:": "/images/public/icons/nostale/sp/sp8s.webp",
        ":SP9A:": "/images/public/icons/nostale/sp/sp9a.webp",
        ":SP9M:": "/images/public/icons/nostale/sp/sp9m.webp",
        ":SP9S:": "/images/public/icons/nostale/sp/sp9s.webp",
        ":SP10A:": "/images/public/icons/nostale/sp/sp10a.webp",
        ":SP10M:": "/images/public/icons/nostale/sp/sp10m.webp",
        ":SP10S:": "/images/public/icons/nostale/sp/sp10s.webp",
        ":SP11A:": "/images/public/icons/nostale/sp/sp11a.webp",
        ":SP11M:": "/images/public/icons/nostale/sp/sp11m.webp",
        ":SP11S:": "/images/public/icons/nostale/sp/sp11s.webp",
        
        //pets
        ":Ginseng:": "/images/public/icons/nostale/pet/ginseng.webp",

        //partner
        ":Freya:": "/images/public/icons/nostale/partner/freya.webp",
        ":Jinn:": "/images/public/icons/nostale/partner/jinn.webp",

        //items
        ":45Wand:": "/images/public/icons/nostale/items/45wand.webp",
        ":67Kris82Calvinas88:": "/images/public/icons/nostale/items/67kris82calvinas88.webp",
        ":RedBow:": "/images/public/icons/nostale/items/redbow.webp",

        //general
        ":PetDoll:": "/images/public/icons/nostale/general/petdoll.webp",
        ":PartnerDoll:": "/images/public/icons/nostale/general/partnerdoll.webp",
        
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
