const resumeCount = 10;
let remainingIndices = [...Array(resumeCount).keys()];

// Initialize magnifier image with the first resume
const initialResumeSrc = 'RandomResumes/1.svg';

function getRandomIndex() {
    if (!remainingIndices.length) {
        remainingIndices = [...Array(resumeCount).keys()];
    }
    const randomIndex = Math.floor(Math.random() * remainingIndices.length);
    return remainingIndices.splice(randomIndex, 1)[0];
}

document.getElementById('generateButton').addEventListener('click', () => {
    const resumeImage = document.getElementById('resumeImage');
    const index = getRandomIndex();
    resumeImage.src = `RandomResumes/${index + 1}.svg`;
    magnifierImage.src = `RandomResumes/${index + 1}.svg`;
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const resumeImage = document.getElementById('resumeImage');
    const link = document.createElement('a');
    link.href = resumeImage.src;
    link.download = resumeImage.src.split('/').pop();
    link.click();
});

const toggleButton = document.getElementById('toggleButton');
const resumeContainer = document.getElementById('resumeContainer');
const magnifier = document.createElement('div');
magnifier.classList.add('magnifier');
resumeContainer.appendChild(magnifier);

const magnifierImage = document.createElement('img');
magnifierImage.src = initialResumeSrc; // Set initial src for the magnifier image
magnifier.appendChild(magnifierImage);

toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    if (toggleButton.classList.contains('active')) {
        magnifier.style.display = 'block';
        document.body.classList.add('magnifying');
    } else {
        magnifier.style.display = 'none';
        document.body.classList.remove('magnifying');
    }
});

resumeContainer.addEventListener('mousemove', (e) => {
    if (toggleButton.classList.contains('active')) {
        const rect = resumeContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const magnifierWidth = magnifier.offsetWidth;
        const magnifierHeight = magnifier.offsetHeight;

        magnifier.style.left = `${x - magnifierWidth / 2}px`;
        magnifier.style.top = `${y - magnifierHeight / 2}px`;

        const offsetX = x / rect.width * magnifierImage.width - magnifierWidth / 2;
        const offsetY = y / rect.height * magnifierImage.height - magnifierHeight / 2;

        magnifierImage.style.left = `${-Math.max(0, Math.min(magnifierImage.width - magnifierWidth, offsetX))}px`;
        magnifierImage.style.top = `${-Math.max(0, Math.min(magnifierImage.height - magnifierHeight, offsetY))}px`;
    }
});

resumeContainer.addEventListener('mouseenter', () => {
    if (toggleButton.classList.contains('active')) {
        magnifier.style.display = 'block';
    }
});

resumeContainer.addEventListener('mouseleave', () => {
    magnifier.style.display = 'none';
});

// Ensure the magnifier works with the initial resume on page load
document.addEventListener('DOMContentLoaded', () => {
    const resumeImage = document.getElementById('resumeImage');
    resumeImage.src = initialResumeSrc;
    magnifierImage.src = initialResumeSrc;
});

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 106);
    const g = Math.floor(Math.random() * 156);
    const b = Math.floor(Math.random() * 156);
    return `rgb(${r},${g},${b})`;
}

// Apply random color to the ellipse mask on hover and revert to original color on mouseout
const ellipseMask = document.querySelector('.ellipse-mask');
const originalColor = getComputedStyle(ellipseMask).backgroundColor;

ellipseMask.addEventListener('mouseover', () => {
    const randomColor = getRandomColor();
    ellipseMask.style.backgroundColor = randomColor;
});

ellipseMask.addEventListener('mouseout', () => {
    ellipseMask.style.backgroundColor = originalColor;
});