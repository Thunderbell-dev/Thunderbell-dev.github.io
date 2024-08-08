function pin_on(number){
    var items = document.querySelectorAll('.item');

    // Ensure number is within the correct range
    if (number < 0 || number >= items.length) {
        console.error('Invalid index passed to pin_on:', number);
        return;
    }

    var item = items[number];
    var pinButton = item.querySelector('.pin-button');

    if (!item || !pinButton) {
        console.error('Item or pinButton not found:', item, pinButton);
        return;
    }

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

    if (item.classList.contains('pinned2')){
        item.classList.remove('pinned2');
        pinButton.src = '../pictures/thunder.ico';
        applySearchFromQuery();
    } else if (item.classList.contains('pinned1')){
        item.classList.remove('pinned1');
        pinButton.src = '../pictures/thunder.ico';
        applySearchFromQuery();
    } else {
        if (!pinned_1){
            item.classList.add('pinned1');
            pinButton.src = '../pictures/cloud.ico';
        } else if (!pinned_2){
            item.classList.add('pinned2');
            pinButton.src = '../pictures/cloud.ico';
        }
    } 
}

function unpinAll() {
    var items = document.querySelectorAll('.item');
    
    items.forEach(function(item) {
        item.classList.remove('pinned1', 'pinned2');
        
        // Reset the icon to the default state
        var pinButton = item.querySelector('.pin-button');
        pinButton.src = '../pictures/thunder.ico';
    });
}

function handleImageLoadError(imgContainer, fallbackSrc) {
    imgContainer.style.backgroundImage = `url(${fallbackSrc})`;
    imgContainer.style.backgroundSize = 'contain'; // Ensure the fallback image is visible
    imgContainer.style.backgroundRepeat = 'no-repeat'; // Prevent repeating of the fallback image
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

        const pic_count = [
            7,
            50,
            50,
            52,
            25,
        ]

        var image_count = 0;
        var path_index = 0;
        var index = 0;

        const frameWidth = 36;  // Width of each frame in the sprite sheet
        const frameHeight = 36; // Height of each frame in the sprite sheet
        const framesPerRow = 10; // Number of frames per row in the sprite sheet
        
        const sprite_sheetPaths = [
            '../database/all_items_pics/weapon/adventurer/sprite_sheet.webp',
            '../database/all_items_pics/weapon/swordsman/sprite_sheet.webp',
            '../database/all_items_pics/weapon/archer/sprite_sheet.webp',
            '../database/all_items_pics/weapon/sorcerer/sprite_sheet.webp',
            '../database/all_items_pics/weapon/martial_artist/sprite_sheet.webp'
        ];
        
        // Create a div for each line in the file
        lines.forEach(function(line) {
            
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
                
                // Calculate the background position for the current frame
                const row = Math.floor(image_count / framesPerRow);
                const col = image_count % framesPerRow;
                const backgroundX = -col * frameWidth + 'px';
                const backgroundY = -row * frameHeight + 'px';

                // Create a container for the image and pin button
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');
                imgContainer.style.position = 'relative';
                imgContainer.style.width = `${frameWidth}px`;
                imgContainer.style.height = `${frameHeight}px`;
                imgContainer.style.backgroundPosition = `${backgroundX} ${backgroundY}`;
                imgContainer.style.backgroundSize = `${frameWidth * framesPerRow}px auto`;
                imgContainer.style.backgroundImage = `url(${sprite_sheetPaths[path_index]})`;
  
                image_count ++;
                
                if (image_count > pic_count[path_index]){
                    path_index++;
                    image_count = 0

                    const row = Math.floor(image_count / framesPerRow);
                    const col = image_count % framesPerRow;
                    const backgroundX = -col * frameWidth + 'px';
                    const backgroundY = -row * frameHeight + 'px';
                    imgContainer.style.backgroundPosition = `${backgroundX} ${backgroundY}`;
                    imgContainer.style.backgroundImage = `url(${sprite_sheetPaths[path_index]})`;
                    image_count++;  
                }

                const pinButton = document.createElement('input');
                pinButton.type = 'image';
                pinButton.src = '../pictures/thunder.ico';
                pinButton.classList.add('pin-button');

                // Create the pin button
                const index_button = index
                pinButton.onclick = function() {
                    pin_on(index_button);
                };
                
                const img = new Image();
                img.src = sprite_sheetPaths[path_index];
                
                img.onerror = () => {
                    imgContainer.style.backgroundPosition = `0 0`;
                    imgContainer.style.backgroundSize = 'contain';
                    imgContainer.style.backgroundImage = `url(../pictures/thunder.ico)`;
                };
               
                // Add the image and pin button to the imgContaine
                imgContainer.appendChild(pinButton);                      
                // Add the imgContainer and other elements to the div
                div.appendChild(imgContainer);
                div.appendChild(lvl);
                div.appendChild(text);

                // Add the div to the item list
                itemList.appendChild(div);
                index++;
            }
        });
    } catch (error) {
        console.error('Error fetching the item list:', error);
    }
}
