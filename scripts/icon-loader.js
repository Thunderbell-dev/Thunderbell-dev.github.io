function replaceIcons() {
    const mdContent = document.getElementById("md-content");
    if (!mdContent) return;

    const iconMap = {
        // Unicode emojis
        ":Sleep:": "😴",
        ":Happy:": "😊",
        ":Fire:": "🔥",

        // Image icons
        ":Daze:": '<img src="/images/public/Kitten.webp" alt="Daze Icon" class="icon">',

        // FontAwesome icons
        ":Bed:": '<i class="fas fa-bed"></i>',
        ":Smile:": '<i class="fas fa-smile"></i>',
        ":Flame:": '<i class="fas fa-fire"></i>'
    };

    mdContent.innerHTML = mdContent.innerHTML.replace(/:\w+:/g, match => {
        return iconMap[match] ? `<span class="emoji">${iconMap[match]}</span>` : match;
    });
}

document.addEventListener("DOMContentLoaded", replaceIcons);
