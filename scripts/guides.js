document.addEventListener("DOMContentLoaded", function () {
    // Fetch the list of guides from guides.json
    fetch('/pages/guides/guides.json')
        .then(response => response.json())
        .then(data => {
            const guides = data.guides;
            const guideList = document.getElementById("guide-list");

            // Create a list of guides in the sidebar
            guides.forEach((guide, index) => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = "#";
                link.textContent = guide.name;
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    loadGuide(guide.path, guide.name, guide.chapters);

                    // Close all chapter lists and open only the clicked guide's
                    closeAllChapters();
                    const chapterList = listItem.querySelector(".chapters");
                    chapterList.style.display = "block"; // Expand the clicked guide's chapters

                    // Highlight the selected guide
                    highlightActiveGuide(guide.name);
                });
                listItem.appendChild(link);

                // Create an unordered list to hold chapters for this guide
                const chapterList = document.createElement("ul");
                chapterList.classList.add("chapters");
                chapterList.style.display = "none"; // Hide chapters initially

                // Add chapters under the guide
                guide.chapters.forEach(chapter => {
                    const chapterItem = document.createElement("li");
                    const chapterLink = document.createElement("a");
                    chapterLink.href = `#${chapter.id}`;
                    chapterLink.textContent = chapter.name;
                    chapterItem.appendChild(chapterLink);
                    chapterList.appendChild(chapterItem);
                });

                // Append chapter list under guide item
                listItem.appendChild(chapterList);
                guideList.appendChild(listItem);

                // Expand first guide’s chapters by default, but don't mark any chapter as active
                if (index === 0) {
                    loadGuide(guide.path, guide.name, guide.chapters);
                    highlightActiveGuide(guide.name);
                    chapterList.style.display = "block"; // Open first guide's chapters
                }
            });
        })
        .catch(error => console.error("Error loading guides:", error));

    // Function to load the content of the selected guide
    function loadGuide(guidePath, guideName, chapters) {
        // Hide the content while loading
        const guideContent = document.getElementById("guide-content");
        guideContent.style.display = "none"; // Hide content to avoid flicker

        // Clear the hash from the URL when loading a new guide
        history.pushState("", document.title, window.location.pathname + window.location.search); // Clear the URL hash

        fetch(`/pages/guides/guides-html/${guidePath}`)
            .then(response => response.text())
            .then(content => {
                // Insert the guide content into the page
                guideContent.innerHTML = content;

                // Optionally, scroll to the top of the guide when switching guides
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

                // Show content after it has loaded
                guideContent.style.display = "block"; // Make the content visible
            })
            .catch(error => console.error("Error loading guide:", error));
    }

    // Function to highlight the active guide and expand its chapters
    function highlightActiveGuide(guideName) {
        const guideLinks = document.querySelectorAll("#guide-list > li > a");
        guideLinks.forEach(link => {
            link.classList.remove("active");
            if (link.textContent.trim() === guideName.trim()) {
                link.classList.add("active");

                // Expand the associated chapter list
                const chapterList = link.parentElement.querySelector(".chapters");
                if (chapterList) {
                    chapterList.style.display = "block"; // Show chapters for the active guide
                }
            }
        });
    }

    // Function to close all chapter lists
    function closeAllChapters() {
        const allChapterLists = document.querySelectorAll(".sidebar .chapters");
        allChapterLists.forEach(list => {
            list.style.display = "none";
        });
    }
});
