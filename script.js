const resumeCount = 10;
let remainingIndices = Array.from({ length: resumeCount }, (_, i) => i);
let currentResumeIndex = -1;

function getRandomIndex() {
    if (remainingIndices.length === 0) {
        remainingIndices = Array.from({ length: resumeCount }, (_, i) => i);
    }
    const randomIndex = Math.floor(Math.random() * remainingIndices.length);
    const index = remainingIndices.splice(randomIndex, 1)[0];
    return index;
}

document.getElementById('generateButton').addEventListener('click', () => {
    const resumeImage = document.getElementById('resumeImage');
    currentResumeIndex = getRandomIndex();
    resumeImage.src = `RandomResumes/${currentResumeIndex + 1}.svg`;
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const resumeImage = document.getElementById('resumeImage');
    const link = document.createElement('a');
    link.href = resumeImage.src;
    link.download = resumeImage.src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
