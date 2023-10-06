const container = document.querySelector('.stars-container');
const starColors = ['#FFFFFF', '#FFA500', '#FF3500', '#ADADAD', '#5C5C5C', '#ECFF00'];

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    let size = `${Math.random() * 10}px`;
    star.style.width = size;
    star.style.height = size;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;

    const randomColorIndex = Math.floor(Math.random() * starColors.length);
    const starColor = starColors[randomColorIndex];

    star.style.background = `radial-gradient(circle, ${starColor} 0%, transparent 70%)`;

    container.appendChild(star);

    let opacity = 0;
    let fadingOut = false;

    star.style.opacity = (Math.random() * 0.5 + 0.1).toFixed(2);

    const horizontalSpeed = (Math.random() - 0.2) * 0.2;
    const verticalSpeed = (Math.random() - 0.2) * 0.2;

    const shadow = document.createElement('div');
    shadow.classList.add('star-shadow');
    const shadowSize = 1.5 * parseFloat(size);
    shadow.style.width = `${shadowSize}px`;
    shadow.style.height = `${shadowSize}px`;

    star.appendChild(shadow);

    const opacityInterval = setInterval(() => {
        opacity += Math.random() * 0.01 + 0.02;

        if (opacity > 0.8) {
            opacity = 0.8;
        }

        star.style.opacity = opacity.toFixed(2);

        if (opacity >= 0.8 && !fadingOut) {
            fadingOut = true;
            fadeOutStar();
        }
    }, 100);

    let shadowOpacity = 0;
    const shadowOpacityInterval = setInterval(() => {
        shadowOpacity += Math.random() * 0.005 + 0.01;
        shadow.style.opacity = shadowOpacity.toFixed(2);

        if (shadowOpacity >= 1 && !fadingOut) {
            clearInterval(shadowOpacityInterval);
        }
    }, 100);

    function fadeOutStar() {
        const fadeOutInterval = setInterval(() => {
            opacity -= 0.01;
            star.style.opacity = opacity.toFixed(2);
            shadowOpacity -= 0.01;
            shadow.style.opacity = shadowOpacity.toFixed(2);

            if (opacity <= 0) {
                clearInterval(fadeOutInterval);
                clearInterval(shadowOpacityInterval);
                container.removeChild(star);
            }
        }, 100);
    }

    function updatePosition() {
        const left = parseFloat(star.style.left);
        const top = parseFloat(star.style.top);

        star.style.left = `${left + horizontalSpeed}px`;
        star.style.top = `${top + verticalSpeed}px`;

        if (left > window.innerWidth || top > window.innerHeight) {
            clearInterval(positionInterval);
        }
    }

    const positionInterval = setInterval(updatePosition, 50);
}

function spawnStar() {
    createStar();
    setTimeout(spawnStar, Math.random() * 900);
}

for (let i = 0; i < 30; i++) {
    createStar();
}

spawnStar();