document.querySelectorAll('.checkbox-item img').forEach(img => {
    img.addEventListener('click', function() {
        // Toggle the 'selected' class on the image
        this.classList.toggle('selected');
        
        // Toggle the checkbox state based on image selection
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
    });
});
