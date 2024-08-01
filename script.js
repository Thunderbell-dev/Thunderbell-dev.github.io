document.addEventListener('DOMContentLoaded', function() {
    // Get all the menu items
    var menuItems = document.querySelectorAll('.menu-item');

    // Loop through each menu item and add a click event listener
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            // Prevent default link behavior
            event.preventDefault();

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
