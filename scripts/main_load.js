// Function to load items
async function loadItems() {
    try {
        // Fetch the data and wait for the response
        const response = await fetch('database/all_itemlist.txt');
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        // Wait for the response text
        const data = await response.text();
        
        // Split the data into lines
        const lines = data.split('\n');
        const itemList = document.getElementById('itemList');
        
        // Clear any existing items
        itemList.innerHTML = '';

        // Create a div for each line in the file
        lines.forEach(function(line, index) { // Add index parameter
            if (line.trim() !== '') { 
                const div = document.createElement('div');
                div.classList.add('item', 'hidden');

                // Split the line by comma and get the segments
                const segments = line.split(',');
                const identifier = segments[0].trim();
                const textContent = segments[1] ? segments[1].trim() : '';
                //const lvlContent = segments[2] ? segments[2].trim() : '';

                // Create a text element with the modified text
                //const lvl = document.createElement('p');
                const text = document.createElement('p');
                
                //lvl.textContent = lvlContent;
                //lvl.classList.add("item_lvl")
                text.textContent = textContent;
                text.classList.add("item_text");

                // Create an image element
                const img = document.createElement('img');
                img.alt = 'Image for ' + textContent;

                // Set image source based on the identifier
                if (identifier.toLowerCase().startsWith('weapon')) {
                    img.src = `database/all_items_pics/weapon/${index + 1}.png`;
                    
                    img.onerror = function() {
                        img.src = 'pictures/thunder.ico'; // Fallback image path
                    };
                } 

                img.classList.add('item-image');
                
                // Put all together
                div.appendChild(img);
                //div.appendChild(lvl);
                div.appendChild(text);

                // Add the div to the item list
                itemList.appendChild(div);
            }
        });
    } catch (error) {
        console.error('Error fetching the item list:', error);
    }
}
