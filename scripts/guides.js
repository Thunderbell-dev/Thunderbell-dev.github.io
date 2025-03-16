document.addEventListener("DOMContentLoaded", function () {
    fetch("/pages/guides/guides.json")
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const guide = urlParams.get("guide") || data.guides[0]; // Default to the first guide
            loadGuide(guide, false);
        })
        .catch(error => console.error("Error fetching guides:", error));

    // Add event listeners to sidebar links
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const guide = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            loadGuide(guide, true);
        });
    });
});

function loadGuide(guide, updateUrl = true) {
    const iframe = document.getElementById("guide-frame");
    iframe.src = `/pages/guides/guides-html/${guide}`;

    // Update URL without reloading the page
    if (updateUrl) {
        history.pushState({ guide }, "", `?guide=${guide}`);
    }

    // Highlight the active guide in the sidebar
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("onclick").includes(guide)) {
            link.classList.add("active");
        }
    });
}

// Handle browser navigation (Back/Forward buttons)
window.addEventListener("popstate", function (event) {
    if (event.state && event.state.guide) {
        loadGuide(event.state.guide, false);
    }
});
