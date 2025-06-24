document.addEventListener('DOMContentLoaded', function () {
    const stepsInput = document.getElementById('steps');
    const heightInput = document.getElementById('stepHeight');
    const depthInput = document.getElementById('stepDepth');
    const widthInput = document.getElementById('stairWidth');
    const preview = document.getElementById('previewContainer');

    function updatePreview() {
        const steps = parseInt(stepsInput.value, 10);
        const stepHeight = parseInt(heightInput.value, 10);
        const stepDepth = parseInt(depthInput.value, 10);
        const width = parseInt(widthInput.value, 10);

        preview.innerHTML = '';

        for (let i = 0; i < steps; i++) {
            const step = document.createElement('div');
            step.className = 'step';
            step.style.width = width + 'px';
            step.style.height = stepHeight + 'px';
            step.style.bottom = (i * stepHeight) + 'px';
            step.style.left = (i * stepDepth) + 'px';
            step.style.transform = 'translateZ(' + (i * -stepDepth) + 'px)';
            preview.appendChild(step);
        }

        preview.style.height = (steps * stepHeight + stepDepth) + 'px';
        preview.style.width = (steps * stepDepth + width) + 'px';
    }

    stepsInput.addEventListener('input', updatePreview);
    heightInput.addEventListener('input', updatePreview);
    depthInput.addEventListener('input', updatePreview);
    widthInput.addEventListener('input', updatePreview);

    updatePreview();
});
