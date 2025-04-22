document.addEventListener("DOMContentLoaded", function () {
    const guideList = document.getElementById("guide-list");
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");
    const guideContent = document.getElementById("guide-content");
    const sidebar = document.querySelector('.sidebar');
    const buttonContainer = document.querySelector('.button-container');
    const introduction = document.querySelector('.introduction');

    let allGuides = [];
    let currentCategory = null;

    fetch('https://raw.githubusercontent.com/thunderbell-dev/thunderbell-dev.github.io/main/pages/guides/guides.json')
        .then(response => response.json())
        .then(data => {
            allGuides = data.guides;
            loadIntroductionPage();
            loadFromHash(); 
        })
        .catch(error => console.error("Error loading guides:", error));

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filterGuides(searchTerm);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchInput.value = "";
            filterGuides("");
        }
    });

    function filterGuides(searchTerm) {
        const filteredGuides = allGuides.filter(guide => {
            const guideName = guide.name.toLowerCase();
            const guideCategory = guide.category.toLowerCase();
            return guideName.includes(searchTerm) || guideCategory.includes(searchTerm);
        });

        if (currentCategory) {
            const filteredCategoryGuides = filteredGuides.filter(guide => guide.category === currentCategory);
            displayGuides(filteredCategoryGuides);
        } else {
            displayGuides(filteredGuides);
        }
    }

    function displayGuides(guides) {
        guideList.innerHTML = '';
        ensureIntroductionLink();

        guides.forEach(guide => {
            const listItem = document.createElement("li");
            listItem.classList.add("guide-item");
            listItem.setAttribute("data-category", guide.category || "Uncategorized");

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

                // NEU: Hash aktualisieren
                window.location.hash = `guide=${encodeURIComponent(guide.name)}`;
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
                    event.preventDefault();
                    highlightActiveChapter(chapter.id);
                    
                    
                    window.location.hash = `guide=${encodeURIComponent(guide.name)}&chapter=${encodeURIComponent(chapter.id)}`;
                    
                    setTimeout(() => {
                        document.getElementById(chapter.id)?.scrollIntoView();
                    }, 0);
                });

                chapterItem.appendChild(chapterLink);
                chapterList.appendChild(chapterItem);
            });

            listItem.appendChild(chapterList);
            guideList.appendChild(listItem);
        });
    }

    function loadIntroductionPage() {
        guideContent.style.display = "none";
        buttonContainer.style.display = "block";
        introduction.style.display = "block";

        const categories = [...new Set(allGuides.map(g => g.category).filter(c => c !== "Uncategorized"))];

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("category-buttons");

        categories.forEach(category => {
            const button = document.createElement("button");
            button.classList.add("category-button");
            button.id = `category-${category.toLowerCase().replace(/\s+/g, "-")}`;

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("button-image");

            const textSpan = document.createElement("span");
            textSpan.classList.add("button-text");
            textSpan.textContent = category;

            button.appendChild(imageDiv);
            button.appendChild(textSpan);

            button.addEventListener("click", function () {
                selectCategory(category);
                searchContainer.style.display = "flex";
                searchInput.value = "";
                filterGuides("");

                const sidebar = document.querySelector('.sidebar-container'); 
                const mainContent = document.querySelector('.content'); 

                sidebar.classList.add('show'); 
                mainContent.classList.add('expanded');
            });

            buttonsContainer.appendChild(button);
        });

        buttonContainer.innerHTML = '';  
        buttonContainer.appendChild(buttonsContainer);

        selectCategory("Introduction");

        const sidebar = document.querySelector('.sidebar-container'); 
        const mainContent = document.querySelector('.content'); 

        sidebar.classList.remove('show');
        mainContent.classList.remove('expanded');
    }

    function ensureIntroductionLink() {
        const existingIntroductionLink = searchContainer.querySelector(".introduction-link");
        if (!existingIntroductionLink) {
            const introductionLink = document.createElement("a");
            introductionLink.href = "#";
            introductionLink.textContent = "Introduction";
            introductionLink.classList.add("introduction-link");
            introductionLink.addEventListener("click", function (event) {
                event.preventDefault();
                loadIntroductionPage();
                searchContainer.style.display = "none";
                window.location.hash = '';
            });
            searchContainer.insertBefore(introductionLink, searchContainer.firstChild);
        }
    }

    function selectCategory(selectedCategory) {
        currentCategory = selectedCategory;
        guideList.querySelectorAll("li:not([data-category='Introduction'])").forEach(el => el.classList.remove("active"));
        const filteredGuides = allGuides.filter(g => g.category === selectedCategory);
        displayGuides(filteredGuides);

        searchInput.value = "";
        filterGuides("");

        const toggleSidebarBtn = document.getElementById("toggle-sidebar");

        if (selectedCategory !== "Introduction") {
            sidebar.style.display = "block";
            guideContent.classList.add('full-width');

            if (toggleSidebarBtn) {
                toggleSidebarBtn.style.display = "block";
            }
        } else {
            sidebar.style.display = "none";
            guideContent.classList.remove('full-width');

            if (toggleSidebarBtn) {
                toggleSidebarBtn.style.display = "none";
            }
        }

        const activeCategoryItem = guideList.querySelector(`.guide-item[data-category='${selectedCategory}']`);
        if (activeCategoryItem) {
            activeCategoryItem.classList.add("active");
        }
    }

    function loadGuide(guidePath, guideName, chapters) {
        guideContent.style.display = "block";
        buttonContainer.style.display = "none";
        introduction.style.display = "none";

        history.replaceState("", document.title, window.location.pathname + window.location.search);

        guideContent.classList.remove("show");
        guideContent.classList.add("fade-in");

        fetch(`https://raw.githubusercontent.com/thunderbell-dev/thunderbell-dev.github.io/main/pages/guides/guides-html/${guidePath}`)
            .then(response => response.text())
            .then(content => {
                guideContent.innerHTML = content;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

                requestAnimationFrame(() => {
                    guideContent.classList.add("show");
                });

                highlightActiveGuide(guideName);
                document.dispatchEvent(new Event("guideLoaded"));
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

    function loadFromHash() {
        const hash = window.location.hash.slice(1);
        if (!hash) return;
    
        const params = new URLSearchParams(hash);
        const guideName = params.get("guide");
        const chapterId = params.get("chapter");
    
        if (guideName) {
            const foundGuide = allGuides.find(g => g.name === guideName);
            if (foundGuide) {
               
                selectCategory(foundGuide.category);
                searchContainer.style.display = "flex"; 
                ensureIntroductionLink();
                const sidebar = document.querySelector('.sidebar-container');
                const mainContent = document.querySelector('.content');
                sidebar.classList.add('show'); 
                mainContent.classList.add('expanded');
    
         
                loadGuide(foundGuide.path, foundGuide.name, foundGuide.chapters);
    
               
                if (chapterId) {
                    setTimeout(() => {
                        highlightActiveChapter(chapterId);
                        document.getElementById(chapterId)?.scrollIntoView();
                    }, 600);
                }
            }
        }
    }
    

    const toggleSidebarBtn = document.createElement("button");
    toggleSidebarBtn.id = "toggle-sidebar";
    toggleSidebarBtn.textContent = "✖";
    toggleSidebarBtn.classList.add("toggle-sidebar-button");
    toggleSidebarBtn.style.display = "none";

    document.body.appendChild(toggleSidebarBtn);

    toggleSidebarBtn.addEventListener("click", function () {
        const sidebarContainer = document.querySelector('.sidebar-container');
        const mainContent = document.querySelector('.content');

        sidebarContainer.classList.toggle("collapsed");
        mainContent.classList.toggle("collapsed-sidebar");

        toggleSidebarBtn.textContent = sidebarContainer.classList.contains("collapsed") ? "☰" : "✖";
    });
});
