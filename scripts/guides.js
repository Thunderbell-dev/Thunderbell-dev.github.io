document.addEventListener("DOMContentLoaded", function () {
    fetch('/pages/guides/guides.json')
        .then(response => response.json())
        .then(data => {
            const guides = data.guides;
            const guideList = document.getElementById("guide-list");

            guides.forEach((guide, index) => {
                const listItem = document.createElement("li");
                listItem.classList.add("guide-item");

                const link = document.createElement("a");
                link.href = "#";
                link.textContent = guide.name;
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    loadGuide(guide.path, guide.name, guide.chapters);

                    closeAllChapters();
                    const chapterList = listItem.querySelector(".chapters");
                    chapterList.style.display = "block";

                    highlightActiveGuide(guide.name);
                });
                listItem.appendChild(link);

                const chapterList = document.createElement("ul");
                chapterList.classList.add("chapters");
                chapterList.style.display = "none";

                guide.chapters.forEach(chapter => {
                    const chapterItem = document.createElement("li");
                    const chapterLink = document.createElement("a");
                    chapterLink.href = `#${chapter.id}`;
                    chapterLink.textContent = chapter.name;
                    chapterLink.addEventListener("click", function (event) {
                        highlightActiveChapter(chapter.id);
                    
                        // Allow anchor to jump after setting active class
                        setTimeout(() => {
                            window.location.hash = chapter.id;
                        }, 0);
                    });
                    

                    chapterItem.appendChild(chapterLink);
                    chapterList.appendChild(chapterItem);
                });

                listItem.appendChild(chapterList);
                guideList.appendChild(listItem);

                if (index === 0) {
                    loadGuide(guide.path, guide.name, guide.chapters);
                    highlightActiveGuide(guide.name);
                    chapterList.style.display = "block";
                }
            });
        })
        .catch(error => console.error("Error loading guides:", error));

    function loadGuide(guidePath, guideName, chapters) {
        const guideContent = document.getElementById("guide-content");
        guideContent.style.display = "none";

        history.pushState("", document.title, window.location.pathname + window.location.search);

        fetch(`/pages/guides/guides-html/${guidePath}`)
            .then(response => response.text())
            .then(content => {
                guideContent.innerHTML = content;

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

                guideContent.style.display = "block";

                highlightActiveGuide(guideName);
            })
            .catch(error => console.error("Error loading guide:", error));
    }

    function highlightActiveGuide(guideName) {
        const guideItems = document.querySelectorAll("#guide-list > .guide-item");
        guideItems.forEach(item => {
            item.classList.remove("active");

            const link = item.querySelector("a");
            if (link.textContent.trim() === guideName.trim()) {
                item.classList.add("active");

                document.querySelectorAll(".chapters").forEach(chapterList => {
                    chapterList.style.display = "none";
                });

                const chapterList = item.querySelector(".chapters");
                if (chapterList) {
                    chapterList.style.display = "block";
                }
            }
        });
    }

    function highlightActiveChapter(chapterId) {
        document.querySelectorAll(".chapters a").forEach(chapterLink => {
            chapterLink.classList.remove("active");
        });

        const activeChapter = document.querySelector(`.chapters a[href="#${chapterId}"]`);
        if (activeChapter) {
            activeChapter.classList.add("active");
        }
    }

    function closeAllChapters() {
        const allChapterLists = document.querySelectorAll(".sidebar .chapters");
        allChapterLists.forEach(list => {
            list.style.display = "none";
        });
    }

    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('footer');

    function adjustSidebarHeight() {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const footerRect_bottom = Math.round(footerRect.bottom);

        if (footerRect_bottom <= windowHeight) {
            sidebar.style.maxHeight = `calc(100vh - 160px)`; 
        } else if (footerRect_bottom - 100 <= windowHeight){
            sidebar.style.maxHeight = `calc(100vh - 60px)`; 
        } else {
            sidebar.style.maxHeight = `100vh`;
        }
    }

    window.addEventListener('scroll', adjustSidebarHeight);
    window.addEventListener('resize', adjustSidebarHeight);

    adjustSidebarHeight();
});
