function startAnimation() {
    const circle = document.getElementById('breatheCircle');
    const text = document.getElementById('breathingText');
  
    // Start the animation
    circle.classList.add('expanded');
  
    // Change text after the expansion animation completes
    setTimeout(() => {
      text.textContent = 'Exhale';
    }, 4000); // Duration of the expansion animation in milliseconds
  
    // Stop the animation, reset the text, and change text back to "Inhale" after the pause
    setTimeout(() => {
      circle.classList.remove('expanded');
      text.textContent = 'Exhale';
    }, 5000); // Total duration including the pause in milliseconds
  }
  