function replaceIcons() {
    const mdContent = document.getElementById("md-content");
    if (!mdContent) return;

    const iconMap = {
        //":Congratz:": "🎉",
    
        // Image icons
        // ":Daze:": '<img src="/images/public/Kitten.webp" alt="Daze Icon" class="icon">',

        // FontAwesome icons
        //":PinkiePaw:": '<i class="fas fa-paw" style="color: pink;"></i>',
    };

    mdContent.innerHTML = mdContent.innerHTML.replace(/:\w+:/g, match => {
        return iconMap[match] ? `<span class="emoji">${iconMap[match]}</span>` : match;
    });
}

document.addEventListener("DOMContentLoaded", replaceIcons);
