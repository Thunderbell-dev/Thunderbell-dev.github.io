function pin_on(number){
    var items = document.querySelectorAll('.item');
    //var more_text = document.querySelectorAll('.item .item_text');

    var pinned_1 = false;
    var pinned_2 = false;

    // Check if any items are already pinned
    items.forEach(function(item) {
        if (item.classList.contains('pinned1')){
            pinned_1 = true; 
        }
        if (item.classList.contains('pinned2')){
            pinned_2 = true; 
        }
    });

    var item = items[number];
    //var textElement = more_text[number];

    if (item.classList.contains('pinned2')){
        item.classList.remove('pinned2');
        //textElement.classList.add('hide_more_text');
    } else if (item.classList.contains('pinned1')){
        item.classList.remove('pinned1');
        //textElement.classList.add('hide_more_text');
    } else {
        if (!pinned_1){
            item.classList.add('pinned1');
            //textElement.classList.remove('hide_more_text');
        } else if (!pinned_2){
            item.classList.add('pinned2');
            //textElement.classList.remove('hide_more_text');
        }
    } 
}

function unpinAll() {
    var items = document.querySelectorAll('.item');
    
    items.forEach(function(item, index) {
        item.classList.remove('pinned1', 'pinned2');
    });
}



// Function to load items
async function loadItems() {
    try {
        // Fetch the data and wait for the response
        const response = await fetch('../database/all_itemlist.txt');
        
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
            
            // Split the line by comma and get the segments
            const segments = line.split(',');

            if ((line.trim() !== '') && (segments[0].trim().toLowerCase().startsWith('weapon'))) { 
                const div = document.createElement('div');
                div.classList.add('item');

                const textContent = segments[1] ? segments[1].trim() : '';
                const lvlContent = segments[2] ? segments[2].trim() : '';

                // Create a text element with the modified text
                const lvl = document.createElement('p');
                const text = document.createElement('p');
                
                lvl.textContent = lvlContent;
                lvl.classList.add("item_lvl")
                text.textContent = textContent;
                text.classList.add("item_text");

                // Create an image element
                const img = document.createElement('img');
                img.alt = 'Image for ' + textContent;

                // Set image source based on the identifier
                img.src = `../database/all_items_pics/weapon/${index + 1}.png`;
                    
                img.onerror = function() {
                    img.src = '../pictures/thunder.ico'; // Fallback image path
                };
                
                img.classList.add('item-image');

                // Create the pin button
                const pinButton = document.createElement('input');
                pinButton.type = 'image';
                pinButton.src = '../pictures/thunder.ico';
                pinButton.onclick = function() {
                    pin_on(index);
                };
                pinButton.classList.add('pin-button');

                // Create a container for the image and pin button
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');
                imgContainer.style.position = 'relative';

                // Add the image and pin button to the imgContainer
                imgContainer.appendChild(img);
                imgContainer.appendChild(pinButton);
                        
                // Add the imgContainer and other elements to the div
                div.appendChild(imgContainer);
                div.appendChild(lvl);
                div.appendChild(text);

                // Add the div to the item list
                itemList.appendChild(div);
            }
        });
    } catch (error) {
        console.error('Error fetching the item list:', error);
    }
}
