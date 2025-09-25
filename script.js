document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const bugCount = parseInt(body.getAttribute('data-bug-count') || '50');
    const messageBox = document.querySelector('.message-box');
    const tapOverlay = document.querySelector('.tap-overlay');

    // Function to create a single bug
    function createBug() {
        const bug = document.createElement('img');
        bug.src = 'bug.png'; // Make sure bug.png is in the same directory
        bug.alt = 'crawling bug';
        bug.classList.add('bug');

        // Randomize size slightly
        const size = Math.random() * 20 + 30; // Between 30px and 50px
        bug.style.width = `${size}px`;

        // Randomize initial position
        bug.style.top = `${Math.random() * 100}%`;
        bug.style.left = `${Math.random() * 100}%`;

        // Randomize animation duration and delay
        bug.style.animationDuration = `${Math.random() * 10 + 5}s`; // 5 to 15 seconds
        bug.style.animationDelay = `-${Math.random() * 10}s`; // Negative delay to start at random points in animation

        // Randomize rotation (initial appearance direction)
        bug.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Make some bugs flip horizontally for more variety
        if (Math.random() > 0.5) {
            bug.style.transform += ' scaleX(-1)';
        }

        body.appendChild(bug);
        return bug;
    }

    // Create all bugs
    const bugs = [];
    for (let i = 0; i < bugCount; i++) {
        bugs.push(createBug());
    }

    // Event listener for tapping/clicking the screen
    tapOverlay.addEventListener('click', () => {
        // Hide all bugs
        bugs.forEach(bug => {
            bug.style.opacity = 0;
            bug.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => bug.remove(), 500); // Remove after fading out
        });

        // Show the message box
        messageBox.classList.add('visible');

        // Remove the tap overlay so the button can be clicked
        tapOverlay.remove();
        
        // Make the body cursor normal again
        body.style.cursor = 'default';
    });

    // Optionally add a subtle pulse to the overlay to hint at interaction
    let pulseInterval;
    const startPulsing = () => {
        tapOverlay.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.4)';
        pulseInterval = setInterval(() => {
            tapOverlay.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.4)';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    tapOverlay.style.transition = 'box-shadow 1s ease-out';
                    tapOverlay.style.boxShadow = '0 0 0 20px rgba(0, 0, 0, 0)';
                });
            });
        }, 2000); // Repeat every 2 seconds
    };
    startPulsing();

    // Clear pulse on tap
    tapOverlay.addEventListener('click', () => {
        clearInterval(pulseInterval);
        tapOverlay.style.boxShadow = 'none';
    }, { once: true });
});