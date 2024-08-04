// Function to get query parameters from the URL
function getQueryParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to search within the list
function search(triggeredByUser = true, query = '') {
    // Determine the input source
    var input = triggeredByUser ? document.getElementById('searchInput').value.toLowerCase().trim() : query.toLowerCase().trim();
    var items = document.querySelectorAll('#itemList div');
    
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

    // Update the URL with the search input if triggered by the user
    if (triggeredByUser) {
        var encodedInput = encodeURIComponent(input);
        window.history.replaceState({}, '', `?query=${encodedInput}`);
    }
}

// Function to apply search based on URL query parameter
function applySearchFromQuery() {
    var query = getQueryParameter('query');
    console.log("URL Query Parameter:", query); // Debugging: log the query parameter
    if (query) {
        document.getElementById('searchInput').value = query;
        search(false, query); // Call search without user trigger and pass query
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Load items on page load
    await loadItems();

    applySearchFromQuery();

    // Add event listener for "Enter" key press in the search input
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission or other default actions
            search();
        }
    });

    document.getElementById('searchInput').addEventListener('input', function() {
        search(); // Trigger search on input change
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
