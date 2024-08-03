// Function to fetch the item list from the server
function loadItems() {
    fetch('data/all_itemlist.txt')
        .then(response => response.text())
        .then(data => {
            var lines = data.split('\n');
            var itemList = document.getElementById('itemList');
            
            // Clear any existing list items
            itemList.innerHTML = '';

            // Create a list item for each line in the file
            lines.forEach(function(line) {
                if (line.trim() !== '') { // Skip empty lines
                    var li = document.createElement('li');
                    li.textContent = line.trim();
                    li.classList.add('hidden');
                    itemList.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the item list:', error);
        });
}

// Function to search within the list
function search() {
    var input = document.getElementById('searchInput').value.toLowerCase().trim();
    var items = document.querySelectorAll('#itemList li');
    
    if (input === '') {
        // Hide all items if the search input is empty
        items.forEach(function(item) {
            item.classList.add('hidden');
        });
    } else {
        // Show only the items that match the search input
        items.forEach(function(item) {
            if (item.textContent.toLowerCase().includes(input)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Clear the search input
    document.getElementById('searchInput').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    // Load items on page load
    loadItems();

    // Add event listener for "Enter" key press in the search input
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission or other default actions
            search();
        }
    });

    // Get all the menu items
    var menuItems = document.querySelectorAll('.menu-item');

    // Loop through each menu item and add a click event listener
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            // Prevent default link behavior only if not clicking on submenu2 links
            if (!event.target.closest('.submenu2')) {
                event.preventDefault();
            }

            // Close all other open submenus
            menuItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.submenu').style.display = 'none';
                }
            });

            // Toggle the display of the submenu
            var submenu = item.querySelector('.submenu');
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });

    // Close submenu if clicked outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-item')) {
            menuItems.forEach(function(item) {
                item.querySelector('.submenu').style.display = 'none';
            });
        }
    });
});
