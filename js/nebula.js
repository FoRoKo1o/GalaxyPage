function updateNebula() {
    const body = document.body;
    
    // Get the current rotation value from the "rotate" data attribute or set it to 0 if it doesn't exist
    let rotation = parseFloat(body.getAttribute('data-rotate')) || 0;
    
    // Calculate opacity values based on a sine wave to create a pulsating effect
    const maxOpacity = 0.5; // Maximum opacity (50%)
    const initialOpacity = 0.2; // Initial opacity (20%)
    
    const opacityA = maxOpacity + Math.sin(rotation * (Math.PI / 180)) * maxOpacity; // Varies between 0% and 100%
    const opacityB = maxOpacity - Math.sin(rotation * (Math.PI / 180)) * maxOpacity; // Varies between 100% and 0%
    
    // Increase the rotation angle by a small amount (e.g., 0.1 degrees)
    rotation += 0.1;
    
    // Update the rotation angle in the "data-rotate" attribute
    body.setAttribute('data-rotate', rotation);
    
    // Update the background gradient with the new rotation angle and opacity values
    body.style.backgroundImage = `linear-gradient(${rotation}deg, rgba(0, 23, 255, ${initialOpacity}), rgba(255, 0, 150, ${initialOpacity}))`;
    
    // Call the function recursively to create a continuous animation loop
    requestAnimationFrame(updateNebula);
}

// Start the animation loop
updateNebula();
