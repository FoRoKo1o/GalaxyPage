const canvas = document.getElementById("cometsCanvas");
const ctx = canvas.getContext("2d");
const comets = [];

// Set canvas dimensions based on the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to create a comet on the edge of the screen with a random angle
function createComet() {
  const edge = Math.floor(Math.random() * 4); // Randomly select one of the four edges (0 to 3)
  let x, y, angle, tailLength;

  switch (edge) {
    case 0: // Top edge
      x = Math.random() * canvas.width;
      y = 0;
      angle = Math.random() * Math.PI; // Random angle from 0 to 180 degrees
      break;
    case 1: // Right edge
      x = canvas.width;
      y = Math.random() * canvas.height;
      angle = Math.random() * Math.PI - Math.PI / 2; // Random angle from -90 to 90 degrees
      break;
    case 2: // Bottom edge
      x = Math.random() * canvas.width;
      y = canvas.height;
      angle = Math.random() * Math.PI + Math.PI / 2; // Random angle from 90 to 270 degrees
      break;
    case 3: // Left edge
      x = 0;
      y = Math.random() * canvas.height;
      angle = Math.random() * Math.PI + Math.PI; // Random angle from 180 to 360 degrees
      break;
  }

  // Generate a random tail length between 20 and 200
  tailLength = Math.random() * 180 + 20;

  comets.push({ x, y, angle, tailLength });
}

// Function to update the position of the comets
function updatePosition(comet) {
  const { x, y, angle } = comet;
  const speed = 2; // Adjust the speed of the comets

  // Calculate the new position based on the angle and speed
  const newX = x + Math.cos(angle) * speed;
  const newY = y + Math.sin(angle) * speed;

  // Update the comet's position
  comet.x = newX;
  comet.y = newY;
}

// Function to draw comets
function drawComets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  comets.forEach((comet) => {
    const { x, y, angle, tailLength } = comet;

    // Calculate the endpoint of the gradient
    const gradientX = x + Math.cos(angle) * tailLength;
    const gradientY = y + Math.sin(angle) * tailLength;

    const gradient = ctx.createLinearGradient(x, y, gradientX, gradientY);

    gradient.addColorStop(0, "transparent"); // Start of the comet (completely transparent)
    gradient.addColorStop(1, "white"); // End of the comet (white)


  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2; // Width of the comet's tail

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(gradientX, gradientY);
  ctx.stroke();

  // Update the position of the comet
  updatePosition(comet);
});

requestAnimationFrame(drawComets);
}

// Function to spawn a comet on the edge of the screen
function spawnComet() {
  createComet();

  // Randomly schedule the next comet spawn (between 4 and 10 seconds)
  const nextSpawnTime = Math.random() * 6000 + 4000; // 4000 to 10000 milliseconds
  setTimeout(spawnComet, nextSpawnTime);
}

// Start drawing the comets
drawComets();

// Start spawning comets
spawnComet();
