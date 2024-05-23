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
