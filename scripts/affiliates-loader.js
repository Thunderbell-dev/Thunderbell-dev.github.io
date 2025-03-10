document.addEventListener("DOMContentLoaded", fetchAffiliates);

async function fetchAffiliates() {
    const response = await fetch("/pages/affiliates/affiliates-list.json");
    if (!response.ok) {
        console.error("❌ Failed to load affiliates list:", response.status);
        return;
    }

    const affiliatesFiles = await response.json();
    console.log("✅ Loaded affiliate files:", affiliatesFiles);

    const affiliatesFolder = "/pages/affiliates/family-text/";
    const affiliates = await Promise.all(
        affiliatesFiles.map(async (file) => {
            const filePath = affiliatesFolder + file;
            console.log("📂 Fetching file:", filePath);

            const res = await fetch(filePath);
            if (!res.ok) {
                console.error("❌ Failed to load", filePath, res.status);
                return null;
            }

            const text = await res.text();
            return parseMarkdown(text, file);
        })
    );

    const validAffiliates = affiliates.filter(item => item !== null);
    console.log("📜 Parsed affiliates:", validAffiliates);

    if (validAffiliates.length === 0) {
        console.warn("⚠ No affiliate families found!");
        return;
    }

    shuffleArray(validAffiliates);

    displayAffiliates(validAffiliates);
}

// Parse markdown content into structured data
function parseMarkdown(md, filename) {
    const [meta, ...content] = md.split("\n\n");

    if (!meta) {
        console.error("❌ Invalid Markdown format in:", filename);
        return null;
    }

    const metaData = Object.fromEntries(meta.split("\n").map(line => line.split(": ")));

    // Ensure the .md file extension is replaced with .html for linking
    const htmlFileName = filename.replace(".md", ".html");

    return {
        title: metaData.title || "Untitled",
        image: metaData.image || "/images/public/TBD.webp",
        description: metaData.description || content.join(" ") || "No description available",
        link: `/pages/affiliates/family-html/${htmlFileName}`,
    };
}

// Renders affiliate cards to the page
function displayAffiliates(affiliates) {
    const container = document.querySelector(".affiliates-cards");
    container.innerHTML = affiliates.map((affiliate, index) => generateAffiliateCardHTML(affiliate, index)).join("");
    console.log("🎨 Rendered affiliates:", affiliates);
}

// Generates HTML for an affiliate card
function generateAffiliateCardHTML(affiliate, index) {
    const alignmentClass = index % 2 === 0 ? "img-left" : "img-right";

    return `
        <div class="affiliates-family-card ${alignmentClass}">
            <div class="affiliate-image">
                <img src="${affiliate.image}" alt="${affiliate.title}">
            </div>
            <div class="affiliate-info">
                <h3 class="affiliate-name">${affiliate.title}</h3>
                <p class="affiliate-description">${affiliate.description}</p>
                <div class="affiliate-button">
                    <button onclick="window.location.href='${affiliate.link}'" class="read-more">View More</button>
                </div>
            </div>
        </div>
    `;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}