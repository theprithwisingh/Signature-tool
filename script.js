const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

const textColorPicker = document.getElementById('textColor');
const backgroundColorPicker = document.getElementById('backgroundColor');
const fontSizeSelector = document.getElementById('fontSize');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const retrieveBtn = document.getElementById('retrieveBtn');

// Set initial canvas background color
ctx.fillStyle = backgroundColorPicker.value;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Event listeners for touch events
canvas.addEventListener('touchstart', startDrawingTouch);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', drawTouch);

clearBtn.addEventListener('click', clearCanvas);
saveBtn.addEventListener('click', saveCanvas);
retrieveBtn.addEventListener('click', retrieveCanvas);
backgroundColorPicker.addEventListener('change', updateBackgroundColor);

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function startDrawingTouch(e) {
  e.preventDefault();
  drawing = true;
  drawTouch(e);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = fontSizeSelector.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = textColorPicker.value;

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function drawTouch(e) {
  e.preventDefault();
  if (!drawing) return;
  const touch = e.touches[0];
  ctx.lineWidth = fontSizeSelector.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = textColorPicker.value;

  ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const link = document.createElement('a');
  link.download = 'signature.png';
  link.href = canvas.toDataURL();
  link.click();
}

function retrieveCanvas() {
  // This functionality would require a backend to fetch saved signatures.
  // For now, you can manually load an image to the canvas.
  const savedImage = new Image();
  savedImage.src = 'path_to_saved_image.png'; // Replace with the actual path or URL
  savedImage.onload = () => {
    ctx.drawImage(savedImage, 0, 0, canvas.width, canvas.height);
  };
}

function updateBackgroundColor() {
  ctx.fillStyle = backgroundColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
