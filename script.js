const resumeCount = 10;
let remainingIndices = [...Array(resumeCount).keys()];

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
magnifier.appendChild(magnifierImage);

toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    if (toggleButton.classList.contains('active')) {
        magnifier.style.display = 'block';
    } else {
        magnifier.style.display = 'none';
    }
});

resumeContainer.addEventListener('mousemove', (e) => {
    if (toggleButton.classList.contains('active')) {
        const rect = resumeContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        magnifier.style.left = `${x - magnifier.offsetWidth / 2}px`;
        magnifier.style.top = `${y - magnifier.offsetHeight / 2}px`;

        magnifierImage.style.left = `-${x * 2 - magnifier.offsetWidth / 2}px`;
        magnifierImage.style.top = `-${y * 2 - magnifier.offsetHeight / 2}px`;
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

document.getElementById('generateButton').addEventListener('click', () => {
    const resumeImage = document.getElementById('resumeImage');
    const index = getRandomIndex();
    resumeImage.src = `RandomResumes/${index + 1}.svg`;
    magnifierImage.src = `RandomResumes/${index + 1}.svg`;
});
