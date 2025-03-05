function parseMarkdown(md, filename) {
    const [meta, ...content] = md.split("\n\n");
    
    if (!meta) {
        console.error("❌ Invalid Markdown format in:", filename);
        return null;
    }

    const metaData = Object.fromEntries(meta.split("\n").map(line => line.split(": ")));

    // Format the date to European format (DD.MM.YYYY)
    const formattedDate = metaData.date 
        ? formatDate(metaData.date)
        : formatDate(filename.substring(0, 10)); // Default to filename's date if not provided

    return {
        title: metaData.title || "Untitled",
        date: formattedDate,
        image: metaData.image || "/images/public/Kitten.webp",
        teaser: metaData.teaser || content[0] || "No preview available",
        link: "/pages/news/" + filename.replace(".md", ".html"),
    };
}

// Helper function to format the date in European format (DD.MM.YYYY)
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}


async function fetchNews() {
    const response = await fetch("/pages/news/news-list.json");
    if (!response.ok) {
        console.error("Failed to load news-list.json", response.status);
        return;
    }

    const newsFiles = await response.json();
    console.log("✅ Loaded news files:", newsFiles);

    // Sort the files by date, from newest to oldest
    newsFiles.sort((a, b) => {
        const dateA = new Date(a.substring(0, 10)); // Extract date from filename
        const dateB = new Date(b.substring(0, 10)); // Extract date from filename
        return dateB - dateA; // Compare dates to sort in descending order (newest first)
    });

    const newsFolder = "/pages/news/articles/";
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

    if (filteredNews.length === 0) {
        console.warn("⚠ No news items found!");
        return;
    }

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
