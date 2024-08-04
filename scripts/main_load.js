// Function to fetch the item list from the server
function loadItems() {
    fetch('data/all_itemlist.txt')
        .then(response => response.text())
        .then(data => {
            var lines = data.split('\n');
            var itemList = document.getElementById('itemList');
            
            // Clear any existing items
            itemList.innerHTML = '';

            // Create a div for each line in the file
            lines.forEach(function(line, index) { // Add index parameter
                if (line.trim() !== '') { 
                    var div = document.createElement('div');
                    div.classList.add('item', 'hidden');

                    // Split the line by comma and get the segments
                    var segments = line.split(',');
                    var identifier = segments[0].trim();
                    var textContent = segments[1] ? segments[1].trim() : '';
                    var lvlContent = segments[2] ? segments[2].trim() : '';

                    // Create a text element with the modified text
                    var lvl = document.createElement('p');
                    var text = document.createElement('p');
                    
                    lvl.textContent = lvlContent;
                    lvl.classList.add("item_lvl")
                    text.textContent = textContent;
                    text.classList.add("item_text")

                    // Create an image element
                    var img = document.createElement('img');
                    img.alt = 'Image for ' + textContent;

                    // Set image source based on the identifier
                  
                    if (identifier.toLowerCase().startsWith('weapon')) {
                        img.src = `data/all_items_pics/weapon/${index + 1}.png`;
                        
                        img.onerror = function() {
                            img.src = 'pictures/thunder.ico'; // Fallback image path
                        };
                    } 
            
                    img.classList.add('item-image');
                    
                    // put all together
                    div.appendChild(img);
                    div.appendChild(lvl);
                    div.appendChild(text);

                    // Add the div to the item list
                    itemList.appendChild(div);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the item list:', error);
        });
}