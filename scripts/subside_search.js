// Function to get query parameters from the URL
function getQueryParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to search within the list
function search(triggeredByUser = true, query = '') {
    // Determine the input source
    var input = triggeredByUser ? document.getElementById('searchInput').value.toLowerCase().trim() : query.toLowerCase().trim();
    var items = document.querySelectorAll('#itemList .item');

    if (input === '') {
        // Show all items if the search input is empty, except pinned items
        items.forEach(function(item) {
            if (!item.classList.contains('pinned1') && !item.classList.contains('pinned2')) {
                item.classList.remove('hidden');
            }
        });
    } else {
        // Show only the items that match the search input, except pinned items
        items.forEach(function(item) {
            if (!item.classList.contains('pinned1') && !item.classList.contains('pinned2')) {
                if (item.textContent.toLowerCase().includes(input)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    }

    // Update the URL with the search input if triggered by the user
    if (triggeredByUser) {
        var encodedInput = encodeURIComponent(input);
        window.history.replaceState({}, '', `?query=${encodedInput}`);
    }
}

// Function to apply search based on URL query parameter
function applySearchFromQuery() {
    var query = getQueryParameter('query');
    if (query) {
        document.getElementById('searchInput').value = query;
        search(false, query); // Call search without user trigger and pass query
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Load items on page load
    await loadItems();

    applySearchFromQuery();

    // Event listener for 'Escape' key to unpin all items
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            unpinAll();
        }
    });

    // Add event listener for input changes in the search input
    document.getElementById('searchInput').addEventListener('input', function() {
        search(); // Trigger search on input change
    });

    // Add event listeners for menu items and other features
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