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
