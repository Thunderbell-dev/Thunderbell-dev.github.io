function replaceTextWithImages(imageMap) {
    const guideContent = document.getElementById("guide-content");
    const textNodes = getTextNodes(guideContent);

    textNodes.forEach(node => {
        let newText = node.textContent;

        Object.keys(imageMap).forEach(placeholder => {
            const imgSrc = imageMap[placeholder];
            const regex = new RegExp(placeholder, 'g');
            newText = newText.replace(regex, (match) => {
                return `<img src="${imgSrc}" alt="${placeholder} Icon" class="icon" width="32" height="32" loading="lazy" decoding="async">`;
            });
        });

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
