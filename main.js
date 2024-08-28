function toggleDetails(button) {
    const projectBox = button.closest('.project-box');
    const details = projectBox.querySelector('.project-details');
    details.classList.toggle('hidden');
    button.textContent = details.classList.contains('hidden') ? 'View More' : 'View Less';
}

// main.js


document.addEventListener('DOMContentLoaded', function() {
    // Rotating text functionality
    var words = document.querySelectorAll('.cd-words-wrapper b');
    var wordIndex = 0;
    var isAnimating = false;

    function switchWord() {
        if (isAnimating) return;
        isAnimating = true;

        var currentWord = words[wordIndex];
        var nextWord = words[(wordIndex + 1) % words.length];

        // Hide current word
        currentWord.style.opacity = '0';
        currentWord.style.transform = 'translateY(50px)';
        
        setTimeout(function() {
            // Move next word into view
            nextWord.style.opacity = '1';
            nextWord.style.transform = 'translateY(0px)';
            
            currentWord.classList.remove('is-visible');
            nextWord.classList.add('is-visible');

            wordIndex = (wordIndex + 1) % words.length;

            isAnimating = false;
        }, 300);
    }

    if (words.length > 0) {
        // Set initial state
        words[0].style.opacity = '1';
        words[0].style.transform = 'translateY(0px)';
        
        // Start animation loop
        setInterval(switchWord, 3000);
    }

    // Download button functionality
    const downloadButton = document.querySelector('.home-text .btn');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Resume downloaded');
            // If you're using a service like Google Analytics, you would call their tracking function here
        });
    }

    // Toggle project details functionality
    function toggleDetails(button) {
        const projectBox = button.closest('.project-box');
        const details = projectBox.querySelector('.project-details');
        details.classList.toggle('hidden');
        button.textContent = details.classList.contains('hidden') ? 'View More' : 'View Less';
    }

    // Add click event listeners to all 'View More' buttons
    const viewMoreButtons = document.querySelectorAll('.project-box .btn');
    viewMoreButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            toggleDetails(this);
        });
    });
});