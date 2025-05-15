let generatedNumbers = [];

function chaoticRandom(min, max) {
  let raw = performance.now();
  let ms = Math.floor((raw % 1000));
  ms = (ms * 73 + 41) ^ (ms << 1);
  ms = Math.abs(ms);
  const range = max - min + 1;
  return min + (ms % range);
}

function generate() {
  const min = parseInt(document.getElementById("minValue").value, 10);
  const max = parseInt(document.getElementById("maxValue").value, 10);

  if (isNaN(min) || isNaN(max) || min >= max) {
    document.getElementById("numberBox").textContent = "Invalid bounds";
    return;
  }

  const result = chaoticRandom(min, max);
  generatedNumbers.push(result);
  document.getElementById("numberBox").textContent = result;
}
  
document.getElementById("printNumbersBtn").addEventListener("click", () => {
    if (generatedNumbers.length === 0) {
        alert("No numbers to copy yet!");
        return;
      }
    
      const textToCopy = JSON.stringify(generatedNumbers);
    
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Number list copied to clipboard!");
      }).catch(err => {
        console.error("Clipboard copy failed:", err);
        alert("Failed to copy to clipboard.");
      });
  });
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generateBtn").addEventListener("click", generate);
  });
