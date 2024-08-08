// Function to load items
async function loadItems() {
    try {
        // Fetch the data and wait for the response
        const response = await fetch('../database/all_itemlist/main_weapon.txt');
        
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
            7, //main adventurer
            50,//main swordsman
            50,//main archer
            52,//main sourcerer
            25,//main martial_artist
        ]

        var image_count = 0;
        var path_index = 0;
        var index = 0;

        const frameWidth = 36;  
        const frameHeight = 36; 
        const framesPerRow = 10;
        
        const sprite_sheetPaths = [
            '../database/all_items_pics/weapon/main/adventurer/sprite_sheet.webp',
            '../database/all_items_pics/weapon/main/swordsman/sprite_sheet.webp',
            '../database/all_items_pics/weapon/main/archer/sprite_sheet.webp',
            '../database/all_items_pics/weapon/main/sorcerer/sprite_sheet.webp',
            '../database/all_items_pics/weapon/main/martial_artist/sprite_sheet.webp'
        ];
        
        // Create a div for each line in the file
        lines.forEach(function(line) {
            
            const segments = line.split(',');
            
            if (segments[0].trim() != '-' && segments[0].trim() != '') { 
                const div = document.createElement('div');
                div.classList.add('item');

                const object_nameContent= segments[0];
                const lvlContent = segments[1];

                // Create a text element with the modified text
                const lvl = document.createElement('p');
                const object_name = document.createElement('p');
                
                lvl.textContent = lvlContent;
                lvl.classList.add("item_lvl")
                object_name.textContent = object_nameContent;
                object_name.classList.add("item_text");
                
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
                div.appendChild(object_name);

                // Add the div to the item list
                itemList.appendChild(div);
                index++;
            }
        });
    } catch (error) {
        console.error('Error fetching the item list:', error);
    }
}
