function parseMarkdown(md, filename) {
    const [meta, ...content] = md.split("\n\n");
    
    if (!meta) {
        console.error("❌ Invalid Markdown format in:", filename);
        return null;
    }

    const metaData = Object.fromEntries(meta.split("\n").map(line => line.split(": ")));
  
    const filenameDate = filename.substring(0, 10); 
    const formattedDate = metaData.date ? formatDate(metaData.date) : formatDate(filenameDate);

    return {
        title: metaData.title || "Untitled",
        date: formattedDate || "No Date added",
        image: metaData.image || "/images/public/TBD.webp",
        teaser: metaData.teaser || content[0] || "No preview available",
        link: "/pages/news/articles-html/" + filename.replace(".md", ".html"),
        rawDate: metaData.date || filenameDate,
    };
}

// Helper function to format the date in European format (DD.MM.YYYY)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `Published on: ${day}.${month}.${year}`;
}



async function fetchNews() {
    const response = await fetch("https://raw.githubusercontent.com/thunderbell-dev/thunderbell-dev.github.io/main/pages/news/news-list.json");
    if (!response.ok) {
        console.error("Failed to load news-list.json", response.status);
        return;
    }

    const newsFiles = await response.json();
    console.log("✅ Loaded news files:", newsFiles);

    const newsFolder = "https://raw.githubusercontent.com/thunderbell-dev/thunderbell-dev.github.io/main/pages/news/articles/";
    const newsItems = await Promise.all(newsFiles.map(async (file) => {
        const filePath = newsFolder + file;
        console.log("📂 Fetching file:", filePath);

        const res = await fetch(filePath);
        if (!res.ok) {
            console.error("❌ Failed to load", filePath, res.status);
            return null;
        }

        const text = await res.text();
        return parseMarkdown(text, file);
    }));

    const filteredNews = newsItems.filter(item => item !== null);
    console.log("📜 Parsed news items:", filteredNews);

    console.log("Raw dates before sorting:", filteredNews.map(item => item.rawDate));

    if (filteredNews.length === 0) {
        console.warn("⚠ No news items found!");
        return;
    }

    // Sort the files by date, from newest to oldest
    filteredNews.sort((a, b) => {
        const dateA = new Date(a.rawDate); // Use raw date (from md file)
        const dateB = new Date(b.rawDate); // Use raw date (from md file)
        return dateB - dateA; // Compare dates to sort in descending order (newest first)
    });

    // Show the latest news
    const latestNews = filteredNews.shift();
    document.getElementById("latest-news").innerHTML = generateFeaturedNewsHTML(latestNews);
    console.log("✨ Latest news displayed:", latestNews);

    // Show older news
    document.getElementById("older-news").innerHTML = filteredNews.map(generateNewsCardHTML).join("");
    console.log("📰 Older news displayed:", filteredNews);
}

function generateFeaturedNewsHTML(news) {
    return `
        <div class="featured-container">
             <div class="featured-news-title">
                <h2>${news.title}</h2>
            </div>
            <div class="date"> 
                ${news.date}
            </div>
            <div class="main-image">
                <img src="${news.image}" alt="${news.title}" />
            </div>
            <div class="teaser-container">
                <div class="teaser">
                    ${news.teaser}
                </div>
            </div>
            <div class="read-more-button">
                <a href="${news.link}" class="read-more">Read More</a>
            </div>
        </div>
    `;
}

function generateNewsCardHTML(news) {
    return `
        <div class="news-card">
            <div class="news-card-title">
                <h3>${news.title}</h3>
            </div>
            <div class="date"> 
                ${news.date}
            </div>
            <div class="image">
                <img src="${news.image}" alt="${news.title}" />
            </div>
            <div class="teaser-container">
                <div class="teaser">
                    ${news.teaser}
                </div>
            </div>
            <div class="read-more-button">
                <a href="${news.link}" class="read-more">Read More</a>
            </div>
        </div>
    `;
}

fetchNews();
