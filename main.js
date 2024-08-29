
document.addEventListener('DOMContentLoaded', function() {
    // Rotating text functionality
    const words = document.querySelectorAll('.cd-words-wrapper b');
    let wordIndex = 0;
    let isAnimating = false;

    function switchWord() {
        if (isAnimating) return;
        isAnimating = true;

        const currentWord = words[wordIndex];
        const nextWord = words[(wordIndex + 1) % words.length];

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
            console.log('Resume downloaded');
            // Add your analytics tracking code here if needed
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
    document.querySelectorAll('.project-box .btn').forEach(function(button) {
        button.addEventListener('click', function() {
            toggleDetails(this);
        });
    });

    // Updated Menu toggle functionality
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    function toggleMenu() {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        
        if (navbar.classList.contains('active')) {
            navbar.style.display = 'block';
            setTimeout(() => {
                navbar.style.left = '0';
            }, 10);
        } else {
            navbar.style.left = '-100%';
            // Don't hide the navbar immediately
        }
    }

    menuIcon.addEventListener('click', toggleMenu);

    // Improved navbar link click handling
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close menu on mobile
                if (window.innerWidth <= 768) {
                    menuIcon.classList.remove('bx-x');
                    navbar.classList.remove('active');
                    navbar.style.left = '-100%';
                    // Don't hide the navbar immediately
                }

                // Smooth scroll to target section
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Update active link
                document.querySelectorAll('.navbar a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Hide navbar after scrolling (on mobile)
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        navbar.style.display = 'none';
                    }, 1000); // Adjust this delay as needed
                }
            }
        });
    });

    // Ensure proper display on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbar.style.display = 'flex';
            navbar.style.left = '0';
        } else if (!navbar.classList.contains('active')) {
            navbar.style.display = 'none';
            navbar.style.left = '-100%';
        }
    });
});
