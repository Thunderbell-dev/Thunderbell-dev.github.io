 // Get all links
const links = document.querySelectorAll('nav a');

 // Loop through links and add the 'active' class to the current page link
links.forEach(link => {
     if (link.href === window.location.href) {
         link.classList.add('active');
     }
});